import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração segura de proxy reverso (Cloud Run / AI Studio / Vercel)
app.set('trust proxy', 1);

// Body parsers com limite seguro de 8MB (ideal para imagens WebP/PNG de alta resolução)
app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ extended: true, limit: '8mb' }));

// Diretórios de persistência
const DATA_DIR = path.join(__dirname, 'data');
const STORE_DATA_FILE = path.join(DATA_DIR, 'store-data.json');
const ADMIN_USERS_FILE = path.join(DATA_DIR, 'admin-users.json');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Servir arquivos de upload estaticamente (e retornar 404 se o arquivo não existir)
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/uploads', (_req, res) => {
  res.status(404).type('text/plain').send('Arquivo não encontrado em /uploads');
});

// Gerenciamento de Sessões com Tokens Assinados Criptograficamente (Sobrevive a reinícios do servidor)
interface SessionData {
  username: string;
  name: string;
  expiresAt: number;
}
const activeSessions = new Map<string, SessionData>();
const revokedTokens = new Set<string>();
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias

// Chave secreta de assinatura persistida no disco ou configurada via ENV
function getSessionSecret(): string {
  if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.trim().length >= 16) {
    return process.env.SESSION_SECRET.trim();
  }
  const secretPath = path.join(DATA_DIR, 'session-secret.txt');
  try {
    if (fs.existsSync(secretPath)) {
      const existing = fs.readFileSync(secretPath, 'utf-8').trim();
      if (existing.length >= 16) return existing;
    }
  } catch {}
  const generated = crypto.randomBytes(32).toString('hex');
  try {
    fs.writeFileSync(secretPath, generated, 'utf-8');
  } catch {}
  return generated;
}

const SESSION_SECRET = getSessionSecret();

function signSessionToken(data: SessionData): string {
  const payloadStr = JSON.stringify(data);
  const payloadBase64 = Buffer.from(payloadStr, 'utf-8').toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payloadBase64).digest('base64url');
  return `${payloadBase64}.${signature}`;
}

function verifySessionToken(token: string): SessionData | null {
  try {
    if (!token || revokedTokens.has(token)) return null;
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [payloadBase64, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(payloadBase64).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }
    const parsed = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf-8')) as SessionData;
    if (!parsed || !parsed.username || typeof parsed.expiresAt !== 'number') {
      return null;
    }
    if (parsed.expiresAt < Date.now()) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

// Proteção contra Força Bruta no Login (Rate Limiting simples por IP)
interface LoginAttempt {
  count: number;
  blockedUntil: number;
}
const loginAttempts = new Map<string, LoginAttempt>();
const MAX_LOGIN_ATTEMPTS = 5;
const BLOCK_DURATION_MS = 10 * 60 * 1000; // 10 minutos

// Utilitários de Hash Seguro usando node:crypto (scrypt com salt aleatório)
function hashPassword(password: string, salt = crypto.randomBytes(16).toString('hex')): string {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, key] = stored.split(':');
    if (!salt || !key) return false;
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(key, 'hex'));
  } catch {
    return false;
  }
}

// Validação binária rigorosa de imagens via Magic Bytes (evita arquivos falsos disfarçados)
function detectImageFormat(buf: Buffer): 'png' | 'jpg' | 'webp' | null {
  if (!buf || buf.length < 12) return null;
  // PNG: 89 50 4E 47
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) {
    return 'png';
  }
  // JPEG: FF D8 FF
  if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) {
    return 'jpg';
  }
  // WebP: RIFF (bytes 0-3) e WEBP (bytes 8-11)
  if (
    buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
    buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50
  ) {
    return 'webp';
  }
  return null;
}

// Middleware de Autenticação Obrigatória para rotas sensíveis (com suporte a restauração de token assinado)
function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acesso negado. Token de autenticação não fornecido.' });
  }

  const token = authHeader.substring(7).trim();
  let session = activeSessions.get(token);

  // Se o servidor reiniciou e o token não está no Map da RAM, verifica a assinatura criptográfica
  if (!session || session.expiresAt < Date.now()) {
    const verified = verifySessionToken(token);
    if (verified) {
      // Confirma que o administrador ainda existe no banco
      const admins = getAdminUsers();
      const userExists = admins.some((a) => a.username.toLowerCase() === verified.username.toLowerCase());
      if (userExists) {
        session = verified;
        activeSessions.set(token, session);
      }
    }
  }

  if (!session || session.expiresAt < Date.now()) {
    if (session) activeSessions.delete(token);
    return res.status(401).json({ error: 'Sessão expirada ou inválida. Por favor, faça login novamente.' });
  }

  // Renova a validade da sessão
  session.expiresAt = Date.now() + SESSION_DURATION_MS;
  (req as any).adminUser = session;
  next();
}

// Dados iniciais limpos e oficiais da Tomati
const DEFAULT_STORE_DATA = {
  links: {
    portal: 'https://loja.tomatibrasil.com.br/tomati',
    ifood: 'https://www.ifood.com.br/delivery/curitiba-pr/tomati-alto-da-xv/4f3220a4-83f6-46b2-87ef-8279d71c4901',
    instagram: 'https://instagram.com/tomatibrasil',
    tiktok: 'https://tiktok.com/@tomatibrasil',
  },
  handles: {
    instagram: '@tomatibrasil',
    tiktok: '@tomatibrasil',
  },
  img: {
    logo: '/brand-logo.png',
    favicon: '/favicon.ico',
  },
  menu: [
    { id: '1', title: 'na vitrine', url: '#produtos' },
    { id: '2', title: 'sobre', url: '#sobre' },
    { id: '3', title: 'pedir', url: '#onde' },
  ],
  regiao: 'Curitiba e Região',
  horario: 'Segunda a Sexta 09hs as 21hs. Sábado e Domingo 16hs as 21hs.',
  contato: '4199144-9050 oi@tomatibrasil.com.br',
  t: {
    hero_h: 'Comida que faz bem, a dois toques.',
    hero_p: 'Marcas de alimentação saudável que a gente seleciona, num só lugar. Escolha o canal e peça.',
    sobre_h: 'Menos complicação, mais comida boa.',
    sobre_p: 'A Tomati reúne em um só lugar marcas de alimentação saudável que a gente gosta de recomendar. A ideia é simples: facilitar a sua rotina, para o que faz bem chegar até você sem esforço.',
    sobre_x: 'Curadoria de produtos selecionados, com sabor autêntico e entrega rápida em Curitiba.',
    fim_h: 'Bom pra você. Fácil de pedir.',
  },
  produtos: [
    {
      nome: 'Hey! Mu',
      texto: 'Doce de leite zero açúcar.',
      price: '29,90',
      link: 'portal',
      cta: 'Quero experimentar',
      bg: '#FFC93C',
      c: '#14201A',
      nivel: 3,
      img: '/uploads/prod-0-1791487429247-7d7abddb3e541f76.webp',
      art: { k: 'jar', body: '#8A4A1C', lab: '#FFF3CF', ink: '#8A4A1C' },
      r: 6,
    },
    {
      nome: 'Naveia',
      texto: 'Bebidas de aveia.',
      price: '',
      link: 'portal',
      cta: 'Ver no portal',
      bg: '#1F5A3F',
      c: '#ffffff',
      nivel: 1,
      img: '/uploads/prod-1-1791487449958-5a425616d53b9020.webp',
      art: { k: 'carton', body: '#F4F0E4', lab: '#1F5A3F', ink: '#1F5A3F' },
      r: -5,
    },
    {
      nome: 'Tocca',
      texto: 'Pastas de amendoim.',
      price: '',
      link: 'ifood',
      cta: 'Pedir agora',
      bg: '#D9A066',
      c: '#14201A',
      nivel: 1,
      img: '/uploads/prod-2-1791489729222-e1e477df9b7369a1.webp',
      art: { k: 'jar', body: '#B5651D', lab: '#FFF3CF', ink: '#6B3A12' },
      r: 5,
    },
    {
      nome: 'Yok-k!',
      texto: 'Macarrão sem glúten.',
      price: '',
      link: 'portal',
      cta: 'Quero experimentar',
      bg: '#E63B1F',
      c: '#ffffff',
      nivel: 2,
      img: '/uploads/prod-3-1791487489811-86dc0248b2ad0237.webp',
      art: { k: 'box', body: '#FFF3CF', lab: '#E63B1F', ink: '#E63B1F' },
      r: -6,
    },
    {
      nome: 'Fruit-Titus',
      texto: 'Frutas com chocolate 70%.',
      price: '',
      link: 'ifood',
      cta: 'Pedir agora',
      bg: '#3E2112',
      c: '#FFE9CF',
      nivel: 2,
      img: '/uploads/prod-4-1791487499648-99ee1a843e164e7d.webp',
      art: { k: 'pouch', body: '#6B3A22', lab: '#FFE9CF', ink: '#3E2112' },
      r: 4,
    },
    {
      nome: 'Momentos inesquecíveis!',
      texto: 'Combine marcas saudáveis e snacks num só pedido em Curitiba.',
      price: '',
      link: 'portal',
      cta: 'Ver no portal',
      camp: 1,
      nivel: 4,
      bg: '#14201A',
      c: '#FFC93C',
      borderColor: '#E63B1F',
      img: '/uploads/prod-5-1791490811727-a8f97bba15148e5b.webp',
      r: 0,
    },
  ],
};

// Utilitário de Gravação Atômica de Arquivos (evita arquivos corrompidos em quedas ou falhas)
function atomicWriteJsonSync(filePath: string, data: any) {
  const tempPath = `${filePath}.tmp-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempPath, filePath);
}

// Sanitização rigorosa de URLs (bloqueia javascript:, data: e scripts maliciosos)
function sanitizeUrl(rawUrl: any): string {
  if (typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('#') || trimmed.startsWith('/')) {
    return trimmed;
  }
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) {
    return '#';
  }
  if (lower.startsWith('https://') || lower.startsWith('http://') || lower.startsWith('mailto:') || lower.startsWith('tel:')) {
    return trimmed;
  }
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return '#';
}

// Normalização de Schema: garante que campos essenciais nunca sejam nulos ou derrubem a interface
function normalizeStoreData(input: any) {
  if (!input || typeof input !== 'object') return { ...DEFAULT_STORE_DATA };

  const rawLinks = { ...DEFAULT_STORE_DATA.links, ...(input.links || {}) };
  const sanitizedLinks: Record<string, string> = {};
  for (const [k, v] of Object.entries(rawLinks)) {
    sanitizedLinks[k] = sanitizeUrl(v);
  }

  const rawMenu = Array.isArray(input.menu) ? input.menu : DEFAULT_STORE_DATA.menu;
  const sanitizedMenu = rawMenu.map((m: any) => ({
    id: String(m?.id || Date.now()),
    title: String(m?.title || 'Menu'),
    url: sanitizeUrl(m?.url || '#'),
  }));

  const rawProducts = Array.isArray(input.produtos) ? input.produtos : DEFAULT_STORE_DATA.produtos;
  const sanitizedProducts = rawProducts.map((p: any) => ({
    ...p,
    nome: String(p?.nome || 'Produto'),
    texto: String(p?.texto || ''),
    price: String(p?.price || ''),
    link: typeof p?.link === 'string' ? p.link : 'portal',
    cta: String(p?.cta || 'Pedir agora'),
    img: typeof p?.img === 'string' && (p.img.startsWith('/uploads') || p.img.startsWith('http') || p.img.startsWith('data:image/')) ? p.img : '',
  }));

  return {
    ...DEFAULT_STORE_DATA,
    ...input,
    links: sanitizedLinks,
    handles: { ...DEFAULT_STORE_DATA.handles, ...(input.handles || {}) },
    img: {
      logo: typeof input.img?.logo === 'string' && input.img.logo ? input.img.logo : DEFAULT_STORE_DATA.img.logo,
      favicon: typeof input.img?.favicon === 'string' && input.img.favicon ? input.img.favicon : DEFAULT_STORE_DATA.img.favicon,
      hero_banner: typeof input.img?.hero_banner === 'string' ? input.img.hero_banner : '',
    },
    t: { ...DEFAULT_STORE_DATA.t, ...(input.t || {}) },
    menu: sanitizedMenu,
    // Permite explicitamente vitrine vazia (produtos: []) sem forçar restauração!
    produtos: sanitizedProducts,
  };
}

// Obter ou inicializar store-data.json com proteção contra corrupção
function getStoreData() {
  if (fs.existsSync(STORE_DATA_FILE)) {
    try {
      const raw = fs.readFileSync(STORE_DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.produtos)) {
        return normalizeStoreData(parsed);
      }
    } catch (err) {
      console.warn('[Tomati Server] store-data.json com erro. Tentando recuperar do backup...', err);
      // Preserva o arquivo corrompido para não perder nada
      try {
        fs.copyFileSync(STORE_DATA_FILE, path.join(DATA_DIR, `store-data.corrupted-${Date.now()}.json`));
      } catch {}

      // Tenta recuperar do backup mais recente
      const backupFile = path.join(DATA_DIR, 'store-data.backup.json');
      if (fs.existsSync(backupFile)) {
        try {
          const rawBackup = fs.readFileSync(backupFile, 'utf-8');
          const parsedBackup = JSON.parse(rawBackup);
          if (parsedBackup && typeof parsedBackup === 'object' && Array.isArray(parsedBackup.produtos)) {
            console.log('[Tomati Server] Dados recuperados com sucesso do backup!');
            return normalizeStoreData(parsedBackup);
          }
        } catch {}
      }
    }
  }
  atomicWriteJsonSync(STORE_DATA_FILE, DEFAULT_STORE_DATA);
  return DEFAULT_STORE_DATA;
}

// Obter administradores com senhas protegidas por hash
interface StoredAdmin {
  username: string;
  passwordHash: string;
  name: string;
  createdAt: number;
}

function getAdminUsers(): StoredAdmin[] {
  if (fs.existsSync(ADMIN_USERS_FILE)) {
    try {
      const raw = fs.readFileSync(ADMIN_USERS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Se houver formato legado com senha em texto puro, migra para hash imediatamente
        let migrated = false;
        const normalized = parsed.map((admin: any) => {
          if (admin.password && !admin.passwordHash) {
            admin.passwordHash = hashPassword(admin.password);
            delete admin.password;
            migrated = true;
          }
          return admin;
        });
        if (migrated) {
          atomicWriteJsonSync(ADMIN_USERS_FILE, normalized);
        }
        return normalized;
      }
    } catch {
      // Ignora erro
    }
  }

  // Senha inicial protegida com hash seguro (configurada via env ou padrão 'tomati@2026')
  const defaultUser = (process.env.ADMIN_USER || 'admin').trim().toLowerCase();
  const initialPassword = (process.env.ADMIN_PASSWORD || process.env.ADMIN_INITIAL_PASSWORD || 'tomati@2026').trim();
  const defaultName = (process.env.ADMIN_NAME || 'Administrador Tomati').trim();

  const defaultAdmins: StoredAdmin[] = [
    {
      username: defaultUser,
      passwordHash: hashPassword(initialPassword),
      name: defaultName,
      createdAt: Date.now(),
    },
  ];
  atomicWriteJsonSync(ADMIN_USERS_FILE, defaultAdmins);
  const isCustomEnv = Boolean(process.env.ADMIN_PASSWORD || process.env.ADMIN_INITIAL_PASSWORD);
  console.log(`[Tomati Security] Administrador inicial configurado: usuário '${defaultUser}' (senha: ${isCustomEnv ? '[configurada via ENV]' : 'tomati@2026'})`);
  return defaultAdmins;
}

// Endpoint Público: Obter dados da vitrine para visitantes
app.get('/api/store-data', (_req, res) => {
  try {
    const data = getStoreData();
    return res.json(data);
  } catch (error) {
    console.error('Erro ao ler store-data:', error);
    return res.status(500).json({ error: 'Erro ao carregar dados' });
  }
});

// Endpoint PROTEGIDO: Salvar dados da loja (somente administrador autenticado com Bearer Token)
app.post('/api/store-data', requireAuth, (req, res) => {
  try {
    const payload = req.body;
    if (!payload || typeof payload !== 'object' || !Array.isArray(payload.produtos)) {
      return res.status(400).json({ error: 'Payload inválido: produtos são obrigatórios' });
    }

    // Fazer backup seguro antes de sobrescrever
    try {
      if (fs.existsSync(STORE_DATA_FILE)) {
        fs.copyFileSync(STORE_DATA_FILE, path.join(DATA_DIR, 'store-data.backup.json'));
      }
    } catch {}

    const normalized = normalizeStoreData(payload);
    atomicWriteJsonSync(STORE_DATA_FILE, normalized);

    // Espelha para public/store-data.json e dist/store-data.json para sincronização estática e hosts como Vercel
    const publicStoreData = path.join(__dirname, 'public', 'store-data.json');
    try {
      atomicWriteJsonSync(publicStoreData, normalized);
    } catch {}

    const distStoreData = path.join(__dirname, 'dist', 'store-data.json');
    if (fs.existsSync(path.join(__dirname, 'dist'))) {
      try {
        atomicWriteJsonSync(distStoreData, normalized);
      } catch {}
    }

    const user = (req as any).adminUser?.username || 'admin';
    console.log(`[Tomati Server] store-data.json atualizado por ${user}. ${normalized.produtos.length} produtos.`);
    return res.json({ success: true, timestamp: Date.now() });
  } catch (error) {
    console.error('Erro ao salvar store-data.json:', error);
    return res.status(500).json({ error: 'Erro ao salvar dados no servidor' });
  }
});

// Endpoint PROTEGIDO: Upload seguro de imagem com validação real de Magic Bytes
app.post('/api/upload', requireAuth, (req, res) => {
  try {
    const { data, prefix } = req.body;
    if (!data || typeof data !== 'string') {
      return res.status(400).json({ error: 'Dados da imagem não fornecidos' });
    }

    const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let buffer: Buffer;

    if (matches && matches.length === 3) {
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(data, 'base64');
    }

    // Validação real de cabeçalho binário (Magic Bytes)
    const detectedExt = detectImageFormat(buffer);
    if (!detectedExt) {
      return res.status(400).json({
        error: 'Arquivo inválido. O arquivo enviado deve ser uma imagem válida (PNG, JPG ou WebP).',
      });
    }

    // Limite de 5MB por arquivo
    if (buffer.length > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'Imagem muito pesada. O tamanho máximo permitido é 5MB.' });
    }

    const cleanPrefix = (prefix || 'img').replace(/[^a-z0-9_-]/gi, '').slice(0, 20);
    const uniqueId = crypto.randomBytes(8).toString('hex');
    const safeName = `${cleanPrefix}-${Date.now()}-${uniqueId}.${detectedExt}`;

    const filePath = path.join(UPLOADS_DIR, safeName);
    fs.writeFileSync(filePath, buffer);

    // Também espelhar para dist/uploads se a pasta existir
    const distUploadsDir = path.join(__dirname, 'dist', 'uploads');
    if (fs.existsSync(distUploadsDir)) {
      try {
        fs.copyFileSync(filePath, path.join(distUploadsDir, safeName));
      } catch {}
    }

    const publicUrl = `/uploads/${safeName}`;
    return res.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Erro ao processar upload:', error);
    return res.status(500).json({ error: 'Erro ao processar upload de imagem' });
  }
});

// Endpoint: Login com Proteção contra Força Bruta e Hash Seguro
app.post('/api/admin/login', (req, res) => {
  try {
    // Com app.set('trust proxy', 1), req.ip lê confiavelmente o IP do cliente real
    const clientIp = req.ip || (req.socket && req.socket.remoteAddress) || '127.0.0.1';
    const now = Date.now();

    // Checar bloqueio temporário
    const attempt = loginAttempts.get(clientIp);
    if (attempt && attempt.blockedUntil > now) {
      const remainingMin = Math.ceil((attempt.blockedUntil - now) / 60000);
      return res.status(429).json({
        success: false,
        message: `Muitas tentativas incorretas. Tente novamente em ${remainingMin} minuto(s).`,
      });
    }

    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Usuário e senha são obrigatórios.' });
    }

    const admins = getAdminUsers();
    const cleanUser = String(username).trim().toLowerCase();
    const cleanPass = String(password).trim();

    const found = admins.find((a) => a.username.toLowerCase() === cleanUser);

    if (found && verifyPassword(cleanPass, found.passwordHash)) {
      // Sucesso: limpa tentativas falhas
      loginAttempts.delete(clientIp);

      // Gera token criptográfico assinado de sessão (sobrevive a reinício do servidor)
      const sessionData: SessionData = {
        username: found.username,
        name: found.name,
        expiresAt: now + SESSION_DURATION_MS,
      };
      const token = signSessionToken(sessionData);
      activeSessions.set(token, sessionData);

      return res.json({
        success: true,
        token,
        user: { username: found.username, name: found.name },
      });
    }

    // Falha: incrementa contador de tentativas
    const currentCount = (attempt ? attempt.count : 0) + 1;
    if (currentCount >= MAX_LOGIN_ATTEMPTS) {
      loginAttempts.set(clientIp, { count: currentCount, blockedUntil: now + BLOCK_DURATION_MS });
      return res.status(429).json({
        success: false,
        message: 'Muitas tentativas incorretas. Acesso bloqueado temporariamente por 10 minutos.',
      });
    } else {
      loginAttempts.set(clientIp, { count: currentCount, blockedUntil: 0 });
    }

    return res.status(401).json({ success: false, message: 'Usuário ou senha incorretos.' });
  } catch (error) {
    console.error('Erro no login de admin:', error);
    return res.status(500).json({ success: false, message: 'Erro interno ao processar login.' });
  }
});

// Endpoint PROTEGIDO: Verificar Sessão Atual
app.get('/api/admin/me', requireAuth, (req, res) => {
  const session = (req as any).adminUser;
  return res.json({
    authenticated: true,
    user: { username: session.username, name: session.name },
  });
});

// Endpoint PROTEGIDO: Logout
app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    activeSessions.delete(token);
    revokedTokens.add(token);
  }
  return res.json({ success: true });
});

// Endpoint PROTEGIDO: Alterar Senha do Administrador Atual
app.post('/api/admin/change-password', requireAuth, (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const session = (req as any).adminUser;

    if (!currentPassword || !newPassword || String(newPassword).trim().length < 6) {
      return res.status(400).json({ success: false, message: 'A nova senha deve ter no mínimo 6 caracteres.' });
    }

    const admins = getAdminUsers();
    const adminIndex = admins.findIndex((a) => a.username.toLowerCase() === session.username.toLowerCase());

    if (adminIndex === -1) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    if (!verifyPassword(String(currentPassword).trim(), admins[adminIndex].passwordHash)) {
      return res.status(400).json({ success: false, message: 'Senha atual incorreta.' });
    }

    admins[adminIndex].passwordHash = hashPassword(String(newPassword).trim());
    fs.writeFileSync(ADMIN_USERS_FILE, JSON.stringify(admins, null, 2), 'utf-8');

    // Invalida todas as sessões anteriores deste administrador
    for (const [t, s] of activeSessions.entries()) {
      if (s.username.toLowerCase() === session.username.toLowerCase()) {
        activeSessions.delete(t);
        revokedTokens.add(t);
      }
    }

    // Emite novo token assinado exclusivo para a sessão atual
    const sessionData: SessionData = {
      username: session.username,
      name: session.name,
      expiresAt: Date.now() + SESSION_DURATION_MS,
    };
    const newToken = signSessionToken(sessionData);
    activeSessions.set(newToken, sessionData);

    return res.json({ success: true, message: 'Senha alterada com sucesso!', token: newToken });
  } catch (error) {
    console.error('Erro ao trocar senha:', error);
    return res.status(500).json({ success: false, message: 'Erro interno ao trocar senha.' });
  }
});

// Endpoint Público: Verificar se o cadastro inicial do proprietário está disponível
app.get('/api/admin/setup-status', (_req, res) => {
  try {
    const admins = getAdminUsers();
    const canRegister = admins.length === 0;
    return res.json({ canRegister, hasCustomAdmin: admins.length > 0 });
  } catch {
    return res.json({ canRegister: false, hasCustomAdmin: true });
  }
});

// Endpoint: Criar Administrador (requer autenticação de administrador existente se já houver contas)
app.post('/api/admin/register', (req, res) => {
  try {
    const admins = getAdminUsers();

    // Se já existem administradores cadastrados, exige autenticação obrigatória
    const authHeader = req.headers.authorization;
    let isAuthenticated = false;
    let requestingUser = 'setup-inicial';

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      let session = activeSessions.get(token);
      if (!session) {
        const verified = verifySessionToken(token);
        if (verified) {
          const userExists = admins.some((a) => a.username.toLowerCase() === verified.username.toLowerCase());
          if (userExists) {
            session = verified;
            activeSessions.set(token, session);
          }
        }
      }
      if (session && session.expiresAt >= Date.now()) {
        isAuthenticated = true;
        requestingUser = session.username;
      }
    }

    if (admins.length > 0 && !isAuthenticated) {
      return res.status(401).json({
        success: false,
        message: 'Acesso restrito. Novos administradores só podem ser cadastrados por um administrador conectado.',
      });
    }

    const { username, password, name } = req.body;
    if (!username || !password || !name) {
      return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    const cleanUser = String(username).trim().toLowerCase();
    const cleanPass = String(password).trim();
    const cleanName = String(name).trim();

    if (cleanPass.length < 6) {
      return res.status(400).json({ success: false, message: 'A senha deve ter no mínimo 6 caracteres.' });
    }

    if (admins.some((a) => a.username.toLowerCase() === cleanUser)) {
      return res.status(400).json({ success: false, message: 'Este usuário já está cadastrado. Faça login na aba Login.' });
    }

    const newAdmin: StoredAdmin = {
      username: cleanUser,
      passwordHash: hashPassword(cleanPass),
      name: cleanName,
      createdAt: Date.now(),
    };

    const updated: StoredAdmin[] = [...admins, newAdmin];
    atomicWriteJsonSync(ADMIN_USERS_FILE, updated);
    console.log(`[Tomati Server] Administrador cadastrado (${requestingUser}): ${cleanUser}`);

    // Cria e retorna sessão ativa com token assinado para autenticação imediata
    const sessionData: SessionData = {
      username: cleanUser,
      name: cleanName,
      expiresAt: Date.now() + SESSION_DURATION_MS,
    };
    const token = signSessionToken(sessionData);
    activeSessions.set(token, sessionData);

    return res.json({
      success: true,
      token,
      user: { username: cleanUser, name: cleanName },
      message: 'Administrador cadastrado com sucesso!',
    });
  } catch (error) {
    console.error('Erro no registro de admin:', error);
    return res.status(500).json({ success: false, message: 'Erro interno ao registrar administrador.' });
  }
});

// Endpoint PROTEGIDO: Listar Administradores Cadastrados
app.get('/api/admin/users', requireAuth, (_req, res) => {
  try {
    const admins = getAdminUsers();
    const sanitized = admins.map((a) => ({
      username: a.username,
      name: a.name,
      createdAt: a.createdAt,
    }));
    return res.json({ success: true, users: sanitized });
  } catch (error) {
    console.error('Erro ao listar administradores:', error);
    return res.status(500).json({ success: false, message: 'Erro ao listar administradores.' });
  }
});

// Endpoint PROTEGIDO: Excluir Administrador
app.delete('/api/admin/users/:username', requireAuth, (req, res) => {
  try {
    const targetUser = String(req.params.username).trim().toLowerCase();
    const currentUser = (req as any).adminUser.username.toLowerCase();

    if (targetUser === currentUser) {
      return res.status(400).json({ success: false, message: 'Você não pode excluir sua própria conta de administrador enquanto estiver conectado.' });
    }

    const admins = getAdminUsers();
    if (admins.length <= 1) {
      return res.status(400).json({ success: false, message: 'Não é possível excluir o único administrador do sistema.' });
    }

    const exists = admins.some((a) => a.username.toLowerCase() === targetUser);
    if (!exists) {
      return res.status(404).json({ success: false, message: 'Administrador não encontrado.' });
    }

    const filtered = admins.filter((a) => a.username.toLowerCase() !== targetUser);
    atomicWriteJsonSync(ADMIN_USERS_FILE, filtered);

    // Invalida sessões ativas do usuário excluído
    for (const [token, session] of activeSessions.entries()) {
      if (session.username.toLowerCase() === targetUser) {
        activeSessions.delete(token);
      }
    }

    console.log(`[Tomati Server] Administrador '${targetUser}' excluído por '${currentUser}'.`);
    return res.json({ success: true, message: `Administrador ${targetUser} excluído com sucesso.` });
  } catch (error) {
    console.error('Erro ao excluir administrador:', error);
    return res.status(500).json({ success: false, message: 'Erro interno ao excluir administrador.' });
  }
});

// Setup dev vs production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[Tomati Server] Rodando na porta ${PORT} (modo ${isProd ? 'produção' : 'desenvolvimento'})`);
  });
}

startServer();

