import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsers com limite de 50MB para fotos de produtos em alta definição
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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

// Dados iniciais oficiais da Tomati
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
    { id: '1', title: 'Na Vitrini', url: '#produtos' },
    { id: '2', title: 'Sobre', url: '#sobre' },
    { id: '3', title: 'Onde comprar', url: '#onde' },
  ],
  regiao: 'Curitiba e Região',
  horario: 'Segunda a Sábado: 08h às 21h · Domingo: 09h às 18h',
  contato: '(41) 99999-8888 · contato@tomatibrasil.com.br',
  t: {
    hero_h: 'Comida que faz bem, a dois toques.',
    hero_p: 'Marcas de alimentação saudável que a gente seleciona, num só lugar. Escolha o canal e peça.',
    sobre_h: 'Menos complicação, mais comida boa.',
    sobre_p: 'A Tomati reúne em um só lugar marcas de alimentação saudável que a gente gosta de recomendar. A ideia é simples: facilitar a sua rotina, para o que faz bem chegar até você sem esforço.',
    sobre_x: 'Curadoria de produtos limpos, sem excessos, com sabor autêntico e entrega rápida em Curitiba.',
    fim_h: 'Bom pra você. Fácil de pedir.',
  },
  produtos: [
    {
      nome: 'Hey! Mu',
      texto: 'Doce de leite zero açúcar.',
      price: 'A partir de R$ 29,90',
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
      price: 'Barista & Original',
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
      price: 'Pura energia',
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
      price: 'Penne & Fusilli',
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
      price: 'Morango & Banana',
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
      texto: 'Combine doces sem açúcar, aveia e snacks saudáveis num só pedido em Curitiba.',
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

// Inicializar store-data.json se não existir ou for inválido
function getStoreData() {
  if (fs.existsSync(STORE_DATA_FILE)) {
    try {
      const raw = fs.readFileSync(STORE_DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.produtos) && parsed.produtos.length > 0) {
        return parsed;
      }
    } catch {
      // Ignora erro
    }
  }
  // Se não existir, salvar padrão
  fs.writeFileSync(STORE_DATA_FILE, JSON.stringify(DEFAULT_STORE_DATA, null, 2), 'utf-8');
  return DEFAULT_STORE_DATA;
}

// Inicializar admin-users.json se não existir
function getAdminUsers() {
  if (fs.existsSync(ADMIN_USERS_FILE)) {
    try {
      const raw = fs.readFileSync(ADMIN_USERS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Ignora erro
    }
  }
  const defaultAdmins = [
    { username: 'admin', password: 'tomati2026', name: 'Administrador Tomati' },
  ];
  fs.writeFileSync(ADMIN_USERS_FILE, JSON.stringify(defaultAdmins, null, 2), 'utf-8');
  return defaultAdmins;
}

// Endpoint: Obter dados persistidos da loja (online para todos os visitantes)
app.get('/api/store-data', (_req, res) => {
  try {
    const data = getStoreData();
    return res.json(data);
  } catch (error) {
    console.error('Erro ao ler store-data:', error);
    return res.status(500).json({ error: 'Erro ao carregar dados' });
  }
});

// Endpoint: Salvar dados da loja (visível imediatamente para todos online)
app.post('/api/store-data', (req, res) => {
  try {
    const payload = req.body;
    if (!payload || typeof payload !== 'object' || !Array.isArray(payload.produtos)) {
      return res.status(400).json({ error: 'Payload inválido: produtos são obrigatórios' });
    }

    // Fazer backup do anterior
    try {
      if (fs.existsSync(STORE_DATA_FILE)) {
        fs.copyFileSync(STORE_DATA_FILE, path.join(DATA_DIR, 'store-data.backup.json'));
      }
    } catch {}

    fs.writeFileSync(STORE_DATA_FILE, JSON.stringify(payload, null, 2), 'utf-8');
    console.log(`[Tomati Server] store-data.json salvo com sucesso! ${payload.produtos.length} produtos.`);
    return res.json({ success: true, timestamp: Date.now() });
  } catch (error) {
    console.error('Erro ao salvar store-data.json:', error);
    return res.status(500).json({ error: 'Erro ao salvar dados no servidor' });
  }
});

// Endpoint: Upload de imagem (salva como arquivo físico em /uploads e retorna a URL pública)
app.post('/api/upload', (req, res) => {
  try {
    const { data, filename, prefix } = req.body;
    if (!data || typeof data !== 'string') {
      return res.status(400).json({ error: 'Dados da imagem não fornecidos' });
    }

    const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let buffer: Buffer;
    let ext = 'webp';

    if (matches && matches.length === 3) {
      const mime = matches[1];
      if (mime.includes('png')) ext = 'png';
      else if (mime.includes('jpeg') || mime.includes('jpg')) ext = 'jpg';
      else if (mime.includes('svg')) ext = 'svg';
      else if (mime.includes('webp')) ext = 'webp';
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(data, 'base64');
    }

    const cleanPrefix = (prefix || 'img').replace(/[^a-z0-9_-]/gi, '');
    const safeName = filename
      ? `${cleanPrefix}-${Date.now()}-${filename.replace(/[^a-z0-9_.-]/gi, '')}`
      : `${cleanPrefix}-${Date.now()}.${ext}`;

    const filePath = path.join(UPLOADS_DIR, safeName);
    fs.writeFileSync(filePath, buffer);

    // Também espelhar para dist/uploads se existir
    const distUploadsDir = path.join(__dirname, 'dist', 'uploads');
    if (fs.existsSync(distUploadsDir)) {
      try {
        fs.copyFileSync(filePath, path.join(distUploadsDir, safeName));
      } catch {}
    }

    const publicUrl = `/uploads/${safeName}`;
    console.log(`[Tomati Server] Upload salvo: ${publicUrl}`);
    return res.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Erro ao processar upload:', error);
    return res.status(500).json({ error: 'Erro ao processar upload' });
  }
});

// Endpoint: Login de Administrador no Servidor
app.post('/api/admin/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Usuário e senha são obrigatórios' });
    }

    const admins = getAdminUsers();
    const cleanUser = String(username).trim().toLowerCase();
    const cleanPass = String(password).trim();

    const found = admins.find(
      (a) => a.username.toLowerCase() === cleanUser && a.password === cleanPass
    );

    if (found) {
      return res.json({
        success: true,
        user: { username: found.username, name: found.name },
      });
    }

    return res.status(401).json({ success: false, message: 'Usuário ou senha incorretos' });
  } catch (error) {
    console.error('Erro no login de admin:', error);
    return res.status(500).json({ success: false, message: 'Erro interno' });
  }
});

// Endpoint: Cadastro de Novo Administrador no Servidor
app.post('/api/admin/register', (req, res) => {
  try {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
      return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios' });
    }

    const cleanUser = String(username).trim().toLowerCase();
    const cleanPass = String(password).trim();
    const cleanName = String(name).trim();

    if (cleanPass.length < 4) {
      return res.status(400).json({ success: false, message: 'Senha deve ter no mínimo 4 caracteres' });
    }

    const admins = getAdminUsers();
    if (admins.some((a) => a.username.toLowerCase() === cleanUser)) {
      return res.status(400).json({ success: false, message: 'Este usuário já está cadastrado' });
    }

    const updated = [...admins, { username: cleanUser, password: cleanPass, name: cleanName }];
    fs.writeFileSync(ADMIN_USERS_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    console.log(`[Tomati Server] Novo administrador cadastrado: ${cleanUser}`);

    return res.json({
      success: true,
      user: { username: cleanUser, name: cleanName },
    });
  } catch (error) {
    console.error('Erro no registro de admin:', error);
    return res.status(500).json({ success: false, message: 'Erro interno' });
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
