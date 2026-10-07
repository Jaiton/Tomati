import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsers com limite de 50MB para suportar uploads de fotos de produtos em alta definição
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Diretórios de persistência
const DATA_DIR = path.join(__dirname, 'data');
const STORE_DATA_FILE = path.join(DATA_DIR, 'store-data.json');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

// Garantir que as pastas existem
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Servir arquivos de upload estaticamente
app.use('/uploads', express.static(UPLOADS_DIR));

// Endpoint: Obter dados persistidos da loja (online para todos os visitantes)
app.get('/api/store-data', (_req, res) => {
  try {
    if (fs.existsSync(STORE_DATA_FILE)) {
      const content = fs.readFileSync(STORE_DATA_FILE, 'utf-8');
      const data = JSON.parse(content);
      return res.json(data);
    }
    return res.json(null);
  } catch (error) {
    console.error('Erro ao ler store-data.json:', error);
    return res.status(500).json({ error: 'Erro ao carregar dados' });
  }
});

// Endpoint: Salvar dados da loja (visível imediatamente para todos online)
app.post('/api/store-data', (req, res) => {
  try {
    const payload = req.body;
    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Payload inválido' });
    }
    fs.writeFileSync(STORE_DATA_FILE, JSON.stringify(payload, null, 2), 'utf-8');
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

    // Identificar formato base64
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
      } catch {
        // Ignora
      }
    }

    const publicUrl = `/uploads/${safeName}`;
    return res.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Erro ao processar upload:', error);
    return res.status(500).json({ error: 'Erro ao processar upload' });
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
