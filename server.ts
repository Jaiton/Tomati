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

// Servir arquivos de upload estaticamente
app.use('/uploads', express.static(UPLOADS_DIR));

// Gerenciamento de Sessões em Memória (Tokens Criptográficos)
interface SessionData {
  username: string;
  name: string;
  expiresAt: number;
}
const activeSessions = new Map<string, SessionData>();
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias

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

// Middleware de Autenticação Obrigatória para rotas sensíveis
function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acesso negado. Token de autenticação não fornecido.' });
  }

  const token = authHeader.substring(7).trim();
  const session = activeSessions.get(token);

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
    portal: 'https://pedido.tomati.com.br',
    ifood: 'https://www.ifood.com.br/delivery/curitiba-pr/tomati-saudabilidade',
    instagram: 'https://instagram.com/tomatibrasil',
    tiktok: 'https://tiktok.com/@tomatibrasil',
  },
  handles: {
    instagram: '@tomatibrasil',
    tiktok: '@tomatibrasil',
  },
  img: {
    logo: '',
    favicon: '',
  },
  menu: [
    { id: '1', title: 'Na Vitrine', url: '#produtos' },
    { id: '2', title: 'Sobre', url: '#sobre' },
    { id: '3', title: 'Onde comprar', url: '#onde' },
  ],
  regiao: 'Curitiba e Região',
  horario: '',
  contato: '',
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
      price: '',
      link: 'portal',
      cta: 'Quero experimentar',
      bg: '#FFC93C',
      c: '#14201A',
      nivel: 3,
      img: '',
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
      img: '',
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
      img: '',
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
      img: '',
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
      img: '',
      art: { k: 'pouch', body: '#6B3A22', lab: '#FFE9CF', ink: '#3E2112' },
      r: 4,
    },
    {
      nome: 'Sua campanha aqui',
      texto: 'Combine marcas saudáveis e snacks num só pedido em Curitiba.',
      price: '',
      link: 'portal',
      cta: 'Ver no portal',
      camp: 1,
      nivel: 4,
      bg: '#14201A',
      c: '#FFC93C',
      img: '',
      r: 0,
    },
  ],
};

// Obter ou inicializar store-data.json
function getStoreData() {
  if (fs.existsSync(STORE_DATA_FILE)) {
    try {
      const raw = fs.readFileSync(STORE_DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.produtos) && parsed.produtos.length > 0) {
        return parsed;
      }
    } catch {
      // Ignora erro e usa padrão
    }
  }
  fs.writeFileSync(STORE_DATA_FILE, JSON.stringify(DEFAULT_STORE_DATA, null, 2), 'utf-8');
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
          fs.writeFileSync(ADMIN_USERS_FILE, JSON.stringify(normalized, null, 2), 'utf-8');
        }
        return normalized;
      }
    } catch {
      // Ignora erro
    }
  }

  // Senha inicial protegida com hash seguro
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || 'tomati2026';
  const defaultAdmins: StoredAdmin[] = [
    {
      username: 'admin',
      passwordHash: hashPassword(initialPassword),
      name: 'Administrador Tomati',
      createdAt: Date.now(),
    },
  ];
  fs.writeFileSync(ADMIN_USERS_FILE, JSON.stringify(defaultAdmins, null, 2), 'utf-8');
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

    fs.writeFileSync(STORE_DATA_FILE, JSON.stringify(payload, null, 2), 'utf-8');
    const user = (req as any).adminUser?.username || 'admin';
    console.log(`[Tomati Server] store-data.json atualizado por ${user}. ${payload.produtos.length} produtos.`);
    return res.json({ success: true, timestamp: Date.now() });
  } catch (error) {
    console.error('Erro ao salvar store-data.json:', error);
    return res.status(500).json({ error: 'Erro ao salvar dados no servidor' });
  }
});

// Endpoint PROTEGIDO: Upload seguro de imagem (WebP, PNG, JPG apenas; SVG é expressamente proibido)
app.post('/api/upload', requireAuth, (req, res) => {
  try {
    const { data, filename, prefix } = req.body;
    if (!data || typeof data !== 'string') {
      return res.status(400).json({ error: 'Dados da imagem não fornecidos' });
    }

    // Bloqueio rigoroso contra SVG (para impedir execução de scripts XSS)
    if (data.toLowerCase().includes('svg') || data.toLowerCase().includes('<script') || data.toLowerCase().includes('xml')) {
      return res.status(400).json({ error: 'Formato SVG ou scripts não são permitidos por segurança. Use WebP, PNG ou JPG.' });
    }

    const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let buffer: Buffer;
    let ext = 'webp';

    if (matches && matches.length === 3) {
      const mime = matches[1].toLowerCase();
      if (mime.includes('png')) ext = 'png';
      else if (mime.includes('jpeg') || mime.includes('jpg')) ext = 'jpg';
      else if (mime.includes('webp')) ext = 'webp';
      else {
        return res.status(400).json({ error: 'Apenas imagens PNG, JPG ou WebP são permitidas.' });
      }
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(data, 'base64');
    }

    // Limite de 5MB por arquivo
    if (buffer.length > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'Imagem muito pesada. O tamanho máximo permitido é 5MB.' });
    }

    const cleanPrefix = (prefix || 'img').replace(/[^a-z0-9_-]/gi, '').slice(0, 20);
    const uniqueId = crypto.randomBytes(8).toString('hex');
    const safeName = `${cleanPrefix}-${Date.now()}-${uniqueId}.${ext}`;

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
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.ip || '127.0.0.1';
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

      // Gera token criptográfico de sessão
      const token = crypto.randomBytes(32).toString('hex');
      activeSessions.set(token, {
        username: found.username,
        name: found.name,
        expiresAt: now + SESSION_DURATION_MS,
      });

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

    return res.json({ success: true, message: 'Senha alterada com sucesso!' });
  } catch (error) {
    console.error('Erro ao trocar senha:', error);
    return res.status(500).json({ success: false, message: 'Erro interno ao trocar senha.' });
  }
});

// Endpoint PROTEGIDO: Criar Novo Administrador (apenas administrador autenticado pode criar outro!)
app.post('/api/admin/register', requireAuth, (req, res) => {
  try {
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

    const admins = getAdminUsers();
    if (admins.some((a) => a.username.toLowerCase() === cleanUser)) {
      return res.status(400).json({ success: false, message: 'Este usuário já está cadastrado.' });
    }

    const updated: StoredAdmin[] = [
      ...admins,
      {
        username: cleanUser,
        passwordHash: hashPassword(cleanPass),
        name: cleanName,
        createdAt: Date.now(),
      },
    ];
    fs.writeFileSync(ADMIN_USERS_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    console.log(`[Tomati Server] Novo administrador cadastrado por ${(req as any).adminUser.username}: ${cleanUser}`);

    return res.json({
      success: true,
      user: { username: cleanUser, name: cleanName },
    });
  } catch (error) {
    console.error('Erro no registro de admin:', error);
    return res.status(500).json({ success: false, message: 'Erro interno ao registrar administrador.' });
  }
});

// Setup dev vs production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
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

