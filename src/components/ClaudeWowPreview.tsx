import React, { useState, useEffect, useRef } from 'react';
import { TomatiLogo } from './TomatiLogo';
import { AdminAuthModal } from './AdminAuthModal';
import { PWAInstallModal } from './PWAInstallModal';
import { Smartphone } from 'lucide-react';

// Configuração padrão idêntica ao código da Tomati
const D = {
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
    { id: '3', title: 'Onde encontrar', url: '#onde' },
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

const K = 'tomati_site_v1';
const clone = <T,>(o: T): T => JSON.parse(JSON.stringify(o));
const CL: Record<number, string> = { 4: 's6', 3: 's4', 2: 's3', 1: 's2' };

// Gerador de ilustrações vetoriais idêntico ao código do Claude
function renderArt(artObj: any, nome: string) {
  if (!artObj) return null;
  const k = artObj.k;
  const fontSize = nome.length > 6 ? (nome.length > 8 ? 20 : 24) : 30;

  if (k === 'jar') {
    return (
      <svg viewBox="0 0 200 250">
        <rect x="30" y="8" width="140" height="42" rx="10" fill={artObj.ink} />
        <rect x="20" y="40" width="160" height="200" rx="26" fill={artObj.body} />
        <rect x="34" y="92" width="132" height="92" rx="12" fill={artObj.lab} />
        <text
          x="100"
          y="146"
          textAnchor="middle"
          fontFamily="Bricolage Grotesque, Arial Black, sans-serif"
          fontWeight="800"
          fontSize={fontSize}
          fill={artObj.ink}
        >
          {nome}
        </text>
      </svg>
    );
  }

  if (k === 'carton') {
    return (
      <svg viewBox="0 0 200 300">
        <path d="M40 70 L100 8 L160 70Z" fill={artObj.lab} />
        <rect x="40" y="62" width="120" height="232" rx="8" fill={artObj.body} />
        <rect x="40" y="110" width="120" height="110" fill={artObj.lab} />
        <text
          x="100"
          y="176"
          textAnchor="middle"
          fontFamily="Bricolage Grotesque, Arial Black, sans-serif"
          fontWeight="800"
          fontSize="26"
          fill="#fff"
        >
          {nome}
        </text>
      </svg>
    );
  }

  if (k === 'box') {
    return (
      <svg viewBox="0 0 200 260">
        <rect x="24" y="14" width="152" height="232" rx="10" fill={artObj.body} />
        <rect x="24" y="14" width="152" height="52" rx="10" fill={artObj.lab} />
        <circle cx="100" cy="150" r="48" fill={artObj.lab} />
        <text
          x="100"
          y="158"
          textAnchor="middle"
          fontFamily="Bricolage Grotesque, Arial Black, sans-serif"
          fontWeight="800"
          fontSize="26"
          fill="#fff"
        >
          {nome}
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 260">
      <path d="M30 20 H170 L184 236 Q100 256 16 236Z" fill={artObj.body} />
      <rect x="30" y="14" width="140" height="14" fill={artObj.ink} opacity="0.5" />
      <ellipse cx="100" cy="140" rx="64" ry="50" fill={artObj.lab} />
      <text
        x="100"
        y="146"
        textAnchor="middle"
        fontFamily="Bricolage Grotesque, Arial Black, sans-serif"
        fontWeight="800"
        fontSize={fontSize}
        fill={artObj.ink}
      >
        {nome}
      </text>
    </svg>
  );
}

// Helper para redimensionamento de imagens resiliente com fallback
function compressImage(file: File, maxWidth: number, mimeType: string, callback: (base64: string) => void) {
  const fallback = () => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  try {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      try {
        const w = img.width || 300;
        const h = img.height || 300;
        const k = Math.min(1, maxWidth / w);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(w * k);
        canvas.height = Math.round(h * k);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          URL.revokeObjectURL(url);
          callback(canvas.toDataURL(mimeType, 0.88));
          return;
        }
      } catch {
        // Fallback
      }
      fallback();
    };
    img.onerror = () => {
      fallback();
    };
    img.src = url;
  } catch {
    fallback();
  }
}

// Obter token de autenticação seguro da sessão
function getAdminAuthToken(): string {
  try {
    const raw = localStorage.getItem('tomati_admin_session_v1') || sessionStorage.getItem('tomati_admin_session_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.token || '';
    }
  } catch {}
  return '';
}

export const ClaudeWowPreview: React.FC<any> = () => {
  // Estado local sincronizado com localStorage
  const [data, setData] = useState<typeof D>(() => {
    try {
      const saved = localStorage.getItem(K);
      if (saved) {
        return { ...clone(D), ...JSON.parse(saved) };
      }
    } catch {
      // Ignore
    }
    return clone(D);
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminMsg, setAdminMsg] = useState('');
  const [syncStatus, setSyncStatus] = useState<'online' | 'salvando' | 'erro' | 'carregando'>('carregando');
  const [lastSavedTime, setLastSavedTime] = useState<string>('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return Boolean(getAdminAuthToken());
    } catch {
      return false;
    }
  });
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState<number | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [isPWAInstallModalOpen, setIsPWAInstallModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados de Gerenciamento de Administradores e Troca de Senha
  const [currAdminUser, setCurrAdminUser] = useState<string>('');
  const [adminUsersList, setAdminUsersList] = useState<Array<{ username: string; name: string; createdAt: number }>>([]);
  const [curPass, setCurPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPassConfirm, setNewPassConfirm] = useState('');
  const [passChangeLoading, setPassChangeLoading] = useState(false);
  const [passChangeMsg, setPassChangeMsg] = useState('');

  // Referência sempre atualizada do estado para evitar condições de corrida assíncronas em uploads
  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // Atualizar dinamicamente o favicon na aba do navegador quando o usuário envia um novo
  useEffect(() => {
    if (data.img?.favicon) {
      const links = document.querySelectorAll("link[rel*='icon']");
      links.forEach((l) => ((l as HTMLLinkElement).href = data.img.favicon));
    }
  }, [data.img?.favicon]);

  const loadAdminUsers = async () => {
    const token = getAdminAuthToken();
    if (!token) return;
    try {
      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const d = await res.json();
        if (d.users) setAdminUsersList(d.users);
      }
    } catch {}
  };

  const handleOpenAdmin = async () => {
    const token = getAdminAuthToken();
    if (!token) {
      setIsAdminAuthenticated(false);
      setIsAuthModalOpen(true);
      return;
    }

    // Consulta ativa em /api/admin/me para garantir que o token é válido antes de abrir
    try {
      const res = await fetch('/api/admin/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const me = await res.json();
        if (me.user?.username) setCurrAdminUser(me.user.username);
        setIsAdminAuthenticated(true);
        setIsAdminOpen(true);
        loadAdminUsers();
      } else {
        localStorage.removeItem('tomati_admin_session_v1');
        sessionStorage.removeItem('tomati_admin_session_v1');
        setIsAdminAuthenticated(false);
        setIsAuthModalOpen(true);
      }
    } catch {
      // Em modo de falha de rede temporária
      setIsAdminOpen(true);
    }
  };

  const handleLogout = () => {
    try {
      const token = getAdminAuthToken();
      if (token) {
        fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => {});
      }
      localStorage.removeItem('tomati_admin_session_v1');
      sessionStorage.removeItem('tomati_admin_session_v1');
    } catch {}
    setIsAdminAuthenticated(false);
    setIsAdminOpen(false);
    setAdminMsg('Sessão de administrador finalizada.');
  };

  // Carregar dados salvos no servidor (para aparecer online para todos os visitantes)
  useEffect(() => {
    let isMounted = true;
    fetch('/api/store-data')
      .then((res) => {
        if (!res.ok) throw new Error('Status ' + res.status);
        return res.json();
      })
      .then((serverData) => {
        if (!isMounted) return;
        if (serverData && serverData.produtos && Array.isArray(serverData.produtos)) {
          setData(serverData);
          setSyncStatus('online');
          try {
            localStorage.setItem(K, JSON.stringify(serverData));
          } catch {}
        } else {
          setSyncStatus('online');
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.info('[Tomati] Servidor inacessível, mantendo cache local:', err);
        setSyncStatus('erro');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Upload de arquivo para o servidor (/uploads) com autenticação Bearer
  const uploadImageToServer = async (base64Data: string, prefix: string): Promise<string> => {
    try {
      const token = getAdminAuthToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers,
        body: JSON.stringify({ data: base64Data, prefix }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.url) return json.url;
      } else if (res.status === 401) {
        setAdminMsg('⚠️ Sessão de administrador expirada. Faça login novamente.');
        setIsAdminAuthenticated(false);
        setIsAuthModalOpen(true);
      } else {
        const errJson = await res.json().catch(() => null);
        if (errJson?.error) setAdminMsg(`⚠️ ${errJson.error}`);
      }
    } catch (err) {
      console.warn('Falha no upload para o servidor:', err);
    }
    return base64Data;
  };

  // Salvar no estado, no localStorage e persistir no servidor (retorna Promise<boolean> para confirmação real)
  const persistData = async (updated: typeof D): Promise<boolean> => {
    setData(updated);
    try {
      localStorage.setItem(K, JSON.stringify(updated));
    } catch {}

    const token = getAdminAuthToken();
    if (!token) {
      setSyncStatus('erro');
      setAdminMsg('⚠️ Faça login como administrador para salvar no servidor.');
      setIsAdminAuthenticated(false);
      setIsAuthModalOpen(true);
      return false;
    }

    try {
      setSyncStatus('salvando');
      const res = await fetch('/api/store-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setSyncStatus('online');
        setHasUnsavedChanges(false);
        const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        setLastSavedTime(now);
        setAdminMsg(`✅ Salvo com sucesso no servidor às ${now}! Online para todos.`);
        return true;
      } else if (res.status === 401) {
        setSyncStatus('erro');
        setAdminMsg('⚠️ Sessão de administrador expirada. Faça login novamente.');
        setIsAdminAuthenticated(false);
        setIsAuthModalOpen(true);
        return false;
      } else {
        setSyncStatus('erro');
        setAdminMsg('⚠️ Erro ao salvar alterações no servidor.');
        return false;
      }
    } catch (err) {
      setSyncStatus('erro');
      console.warn('Erro ao salvar no servidor:', err);
      setAdminMsg('❌ Falha na conexão com o servidor.');
      return false;
    }
  };

  const getUrl = (key: string) => {
    if (key === 'portal') return data.links.portal || 'https://pedido.tomati.com.br';
    if (key === 'ifood') return data.links.ifood || 'https://www.ifood.com.br';
    return data.links[key as keyof typeof data.links] || key;
  };

  // Atalho do teclado Ctrl + Shift + A ou Cmd + Shift + A para abrir o painel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        handleOpenAdmin();
      }
      if (e.key === 'Escape') {
        setIsAdminOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminAuthenticated]);

  // Handlers do Painel (Salvam no estado local para não sobrecarregar o servidor a cada tecla)
  const handleUpdateField = (path: string, value: any) => {
    const next = clone(data);
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    let target: any = next;
    for (const k of keys) {
      if (!target[k]) target[k] = {};
      target = target[k];
    }
    target[lastKey] = value;
    setData(next);
    setHasUnsavedChanges(true);
  };

  const handleUpdateProduct = (index: number, field: string, value: any) => {
    const next = clone(data);
    if (next.produtos[index]) {
      (next.produtos[index] as any)[field] = value;
      setData(next);
      setHasUnsavedChanges(true);
    }
  };

  const handleMoveProduct = (index: number, direction: 'up' | 'down') => {
    const next = clone(data);
    const list = next.produtos;
    if (direction === 'up' && index > 0) {
      const item = list.splice(index, 1)[0];
      list.splice(index - 1, 0, item);
      setData(next);
      setHasUnsavedChanges(true);
    } else if (direction === 'down' && index < list.length - 1) {
      const item = list.splice(index, 1)[0];
      list.splice(index + 1, 0, item);
      setData(next);
      setHasUnsavedChanges(true);
    }
  };

  const handleDeleteProduct = (index: number) => {
    if (confirmDeleteIdx === index) {
      const next = clone(data);
      next.produtos.splice(index, 1);
      setData(next);
      setHasUnsavedChanges(true);
      setConfirmDeleteIdx(null);
    } else {
      setConfirmDeleteIdx(index);
    }
  };

  const handleAddProduct = () => {
    const next = clone(data);
    const campIndex = next.produtos.findIndex((p: any) => p.camp);
    const insertIdx = campIndex >= 0 ? campIndex : next.produtos.length;
    next.produtos.splice(insertIdx, 0, {
      nome: 'Novo produto',
      texto: '',
      price: '',
      link: 'portal',
      cta: 'Quero experimentar',
      bg: '#FFC93C',
      c: '#14201A',
      nivel: 2,
      img: '',
      art: { k: 'jar', body: '#8A4A1C', lab: '#FFF3CF', ink: '#8A4A1C' },
      r: 5,
    });
    setData(next);
    setHasUnsavedChanges(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldKey: string, isProduct?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAdminMsg('Processando imagem e enviando ao servidor...');

    if (isProduct !== undefined) {
      compressImage(file, 900, 'image/webp', async (base64) => {
        const serverUrl = await uploadImageToServer(base64, `prod-${isProduct}`);
        const current = dataRef.current || data;
        const next = clone(current);
        if (next.produtos && next.produtos[isProduct]) {
          next.produtos[isProduct].img = serverUrl;
          const ok = await persistData(next);
          if (ok) {
            setAdminMsg('Foto do produto salva e publicada com sucesso!');
          } else {
            setAdminMsg('⚠️ Foto carregada, mas houve erro ao salvar no servidor.');
          }
        }
      });
    } else {
      const maxW = fieldKey === 'logo' ? 600 : 128;
      compressImage(file, maxW, 'image/png', async (base64) => {
        const serverUrl = await uploadImageToServer(base64, `brand-${fieldKey}`);
        const current = dataRef.current || data;
        const next = clone(current);
        if (!next.img) next.img = { logo: '', favicon: '' };
        (next.img as any)[fieldKey] = serverUrl;
        const ok = await persistData(next);
        if (ok) {
          setAdminMsg('Imagem da marca salva e publicada com sucesso!');
        } else {
          setAdminMsg('⚠️ Imagem carregada, mas houve erro ao salvar no servidor.');
        }
      });
    }
  };

  const handleUpdateMenuItem = (index: number, field: 'title' | 'url', value: string) => {
    const next = clone(data);
    if (!next.menu) {
      next.menu = [
        { id: '1', title: 'Na Vitrine', url: '#produtos' },
        { id: '2', title: 'Sobre', url: '#sobre' },
        { id: '3', title: 'Onde encontrar', url: '#onde' },
      ];
    }
    if (next.menu[index]) {
      next.menu[index][field] = value;
      setData(next);
      setHasUnsavedChanges(true);
    }
  };

  const handleAddMenuItem = () => {
    const next = clone(data);
    if (!next.menu) {
      next.menu = [
        { id: '1', title: 'Na Vitrine', url: '#produtos' },
        { id: '2', title: 'Sobre', url: '#sobre' },
        { id: '3', title: 'Onde encontrar', url: '#onde' },
      ];
    }
    const newId = String(Date.now());
    next.menu.push({ id: newId, title: 'Novo Item', url: '#produtos' });
    setData(next);
    setHasUnsavedChanges(true);
    setAdminMsg('Novo item adicionado ao menu! Clique em Salvar para publicar.');
  };

  const handleRemoveMenuItem = (index: number) => {
    const next = clone(data);
    if (next.menu && next.menu[index]) {
      next.menu.splice(index, 1);
      setData(next);
      setHasUnsavedChanges(true);
      setAdminMsg('Item de menu removido. Clique em Salvar para publicar.');
    }
  };

  const handleUpdateLogoUrl = (url: string) => {
    const next = clone(data);
    if (!next.img) next.img = { logo: '', favicon: '' };
    next.img.logo = url;
    setData(next);
    setHasUnsavedChanges(true);
    setAdminMsg('Logo atualizada. Clique em Salvar para confirmar no servidor.');
  };

  const handleRemoveLogo = () => {
    const next = clone(data);
    if (!next.img) next.img = { logo: '', favicon: '' };
    next.img.logo = '';
    setData(next);
    setHasUnsavedChanges(true);
    setAdminMsg('Logo removida. Clique em Salvar para confirmar no servidor.');
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(
      () => setAdminMsg('Configuração copiada para a área de transferência.'),
      () => setAdminMsg('Não foi possível copiar.')
    );
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then(async (text) => {
      try {
        const parsed = JSON.parse(text);
        if (!parsed || typeof parsed !== 'object') {
          setAdminMsg('Arquivo JSON inválido.');
          return;
        }
        const normalized = {
          ...clone(D),
          ...parsed,
          links: { ...clone(D.links), ...(parsed.links || {}) },
          handles: { ...clone(D.handles), ...(parsed.handles || {}) },
          img: { ...clone(D.img), ...(parsed.img || {}) },
          t: { ...clone(D.t), ...(parsed.t || {}) },
          menu: Array.isArray(parsed.menu) ? parsed.menu : clone(D.menu),
          produtos: Array.isArray(parsed.produtos) ? parsed.produtos : clone(D.produtos),
        };
        const ok = await persistData(normalized);
        if (ok) {
          setAdminMsg('Configuração importada e salva com sucesso.');
        } else {
          setAdminMsg('Configuração carregada localmente. Clique em Salvar para gravar.');
        }
      } catch {
        setAdminMsg('Erro ao ler arquivo JSON.');
      }
    });
  };

  const handleResetDefaults = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    try {
      localStorage.removeItem(K);
    } catch {
      // Ignore
    }
    setData(clone(D));
    setConfirmReset(false);
    setAdminMsg('Valores padrão restaurados.');
  };

  const handleExportBackup = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.href = URL.createObjectURL(blob);
    link.download = `tomati-backup-${dateStr}.json`;
    link.click();
    setAdminMsg('Backup (.json) exportado com sucesso.');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassChangeMsg('');
    if (!curPass || !newPass) {
      setPassChangeMsg('⚠️ Preencha a senha atual e a nova senha.');
      return;
    }
    if (newPass.length < 6) {
      setPassChangeMsg('⚠️ A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (newPass !== newPassConfirm) {
      setPassChangeMsg('⚠️ A confirmação da nova senha não confere.');
      return;
    }
    const token = getAdminAuthToken();
    if (!token) return;
    setPassChangeLoading(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword: curPass, newPassword: newPass }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setPassChangeMsg('✅ Senha alterada com sucesso!');
        setCurPass('');
        setNewPass('');
        setNewPassConfirm('');
        if (result.token) {
          try {
            const raw = localStorage.getItem('tomati_admin_session_v1') || sessionStorage.getItem('tomati_admin_session_v1');
            if (raw) {
              const parsed = JSON.parse(raw);
              parsed.token = result.token;
              if (localStorage.getItem('tomati_admin_session_v1')) {
                localStorage.setItem('tomati_admin_session_v1', JSON.stringify(parsed));
              } else {
                sessionStorage.setItem('tomati_admin_session_v1', JSON.stringify(parsed));
              }
            }
          } catch {}
        }
      } else {
        setPassChangeMsg(`⚠️ ${result.message || 'Erro ao alterar senha.'}`);
      }
    } catch {
      setPassChangeMsg('❌ Erro de conexão ao alterar senha.');
    } finally {
      setPassChangeLoading(false);
    }
  };

  const handleDeleteAdmin = async (targetUsername: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir o administrador @${targetUsername}?`)) return;
    const token = getAdminAuthToken();
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/users/${encodeURIComponent(targetUsername)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setAdminMsg(`✅ Administrador @${targetUsername} excluído.`);
        loadAdminUsers();
      } else {
        setAdminMsg(`⚠️ ${result.message || 'Erro ao excluir administrador.'}`);
      }
    } catch {
      setAdminMsg('❌ Falha na conexão ao excluir administrador.');
    }
  };

  const activeProducts = data.produtos.filter((p: any) => !p.camp);
  const tickerItems = activeProducts.map((p: any) => p.nome);

  return (
    <div>
      {/* Símbolos SVG para Redes Sociais */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <symbol id="ig" viewBox="0 0 24 24">
          <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM17.2 5.8a1 1 0 110 2 1 1 0 010-2z" />
        </symbol>
        <symbol id="tt" viewBox="0 0 24 24">
          <path d="M16.5 2h-3.2v13.2a2.8 2.8 0 11-2.8-2.8c.3 0 .6 0 .8.1V9.2a6 6 0 105.2 5.9V8.6a7 7 0 004 1.3V6.7a4 4 0 01-4-4.7z" />
        </symbol>
      </svg>

      {/* 1. HEADER (Verde Escuro Oficial Tomati com Suporte a iOS & Mobile Completo) */}
      <header>
        <div className="w">
          <a
            className="logo shrink-0"
            href="#top"
            aria-label="Tomati"
            style={{ flexShrink: 0, minWidth: 'max-content' }}
          >
            {data.img?.logo ? (
              <img
                src={data.img.logo}
                alt="Tomati"
                style={{ height: '34px', width: 'auto', display: 'block', flexShrink: 0 }}
              />
            ) : (
              <span className="text-white font-extrabold tracking-tight text-2xl font-serif inline-flex items-center">
                tomati<span className="text-[#FFC93C]">.</span>
              </span>
            )}
          </a>

          {/* Navegação Desktop */}
          <nav className="nav-main">
            {(data.menu && data.menu.length > 0
              ? data.menu
              : [
                  { id: '1', title: 'Na Vitrine', url: '#produtos' },
                  { id: '2', title: 'Sobre', url: '#sobre' },
                  { id: '3', title: 'Onde encontrar', url: '#onde' },
                ]
            ).map((mItem: any) => (
              <a key={mItem.id || mItem.url} href={mItem.url}>
                {mItem.title}
              </a>
            ))}
          </nav>

          {/* Redes Sociais Desktop */}
          <div className="soc">
            <a href={getUrl('instagram')} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><use href="#ig" /></svg>
            </a>
            <a href={getUrl('tiktok')} aria-label="TikTok" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><use href="#tt" /></svg>
            </a>
          </div>

          <div className="flex items-center gap-2">
            {/* Botão de Pedido */}
            <a className="btn b-white shrink-0" href="#onde">Fazer pedido</a>
          </div>
        </div>

        {/* Sub-barra de Navegação Rápida no Mobile com Redes Sociais */}
        <nav className="nav-sub-mobile" aria-label="Navegação rápida">
          <div className="nav-sub-links">
            {(data.menu && data.menu.length > 0
              ? data.menu
              : [
                  { id: '1', title: 'Na Vitrine', url: '#produtos' },
                  { id: '2', title: 'Sobre', url: '#sobre' },
                  { id: '3', title: 'Onde encontrar', url: '#onde' },
                ]
            ).map((mItem: any, idx: number, arr: any[]) => (
              <React.Fragment key={mItem.id || mItem.url || idx}>
                <a href={mItem.url}>{mItem.title}</a>
                {idx < arr.length - 1 && <span className="dot-sep">·</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Redes Sociais no Mobile Integradas na Barra */}
          <div className="nav-sub-soc">
            <a href={getUrl('instagram')} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><use href="#ig" /></svg>
            </a>
            <a href={getUrl('tiktok')} aria-label="TikTok" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><use href="#tt" /></svg>
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* 2. HERO SECTION (Vermelho Tomati #E63B1F) */}
        <div className="hero">
          <div className="w">
            <h1>{data.t.hero_h}</h1>
            <p>{data.t.hero_p}</p>
            <div className="cta">
              <a className="btn b-leaf" href={getUrl('portal')} target="_blank" rel="noopener noreferrer">
                Comprar no portal
              </a>
              <a className="btn b-white" href={getUrl('ifood')} target="_blank" rel="noopener noreferrer">
                Pedir no iFood
              </a>
            </div>
          </div>
        </div>

        {/* 3. MARQUEE LETREIRO INFINITO (Verde #0F3B2A + Letras #FFC93C) */}
        <div className="mq" aria-hidden="true">
          <div>
            {Array.from({ length: 6 }).map((_, i) => (
              <React.Fragment key={i}>
                {tickerItems.map((name: string, idx: number) => (
                  <span key={idx}>
                    <span>{name}</span>
                    <b>●</b>
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 4. NA VITRINE (Bento Grid com Fundo Preto / Escuro #0B0E0C) */}
        <section id="produtos" style={{ background: '#0B0E0C', color: '#fff' }}>
          <div className="w">
            <div className="head">
              <h2 style={{ color: '#fff' }}>Na vitrine</h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                Cada marca com o seu jeito. Toque e peça pelo canal que preferir.
              </p>
            </div>

            <div className="grid" id="grid">
              {data.produtos.map((p: any, idx: number) => {
                const spanClass = CL[p.nivel] || 's3';
                const isCamp = Boolean(p.camp);
                const blockStyle: React.CSSProperties = isCamp
                  ? ({ '--c': '#FFC93C', '--bg2': '#14201A' } as any)
                  : ({ background: p.bg, '--c': p.c, '--bg2': p.bg } as any);

                return (
                  <div
                    key={idx}
                    className={`blk ${spanClass}${isCamp ? ' camp' : ''}`}
                    style={blockStyle}
                  >
                    <div className="big">{p.nome}</div>

                    {!isCamp && (
                      <div
                        className="prod"
                        style={{ '--r': `${p.r || 5}deg` } as any}
                      >
                        {p.img ? (
                          <img src={p.img} alt={p.nome} />
                        ) : (
                          renderArt(p.art, p.nome)
                        )}
                      </div>
                    )}

                    <div className="txt">
                      <small>{p.texto}</small>
                      <div className="row">
                        {p.price && <span className="price">{p.price}</span>}
                        <a
                          className="btn"
                          href={getUrl(p.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {p.cta}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. SOBRE (Fundo Mint #EEF4E6 + Stamp Amarelo Manteiga) */}
        <section className="about" id="sobre">
          <div className="w">
            <div>
              <h2>{data.t.sobre_h}</h2>
              <p style={{ marginTop: '26px' }}>{data.t.sobre_p}</p>
              {data.t.sobre_x && (
                <p style={{ marginTop: '14px' }} className="todo">
                  {data.t.sobre_x}
                </p>
              )}
            </div>
            <div className="stamp" aria-hidden="true">
              mais perto, mais fácil.
            </div>
          </div>
        </section>

        {/* 6. ONDE COMPRAR (LADO A LADO COMO NA IMAGEM 2 - FUNDO ESCURO #0B0E0C) */}
        <section id="onde" style={{ background: '#0B0E0C', color: '#fff', paddingBottom: '36px' }}>
          <div className="w">
            <div className="head">
              <h2 style={{ color: '#fff' }}>Seu pedido, do seu jeito</h2>
            </div>
            <div className="two">
              <div className="opt p">
                <div>
                  <span className="tag">Portal de pedidos Tomati</span>
                  <h3 style={{ marginTop: '10px' }}>
                    Explorar produtos
                    <br />
                    e fazer meu pedido
                  </h3>
                  <p>Veja tudo o que a Tomati tem e monte o seu pedido.</p>
                </div>
                <div>
                  <a className="btn b-white" href={getUrl('portal')} target="_blank" rel="noopener noreferrer">
                    Ir para o portal
                  </a>
                </div>
              </div>

              <div className="opt f">
                <div>
                  <span className="tag">iFood</span>
                  <h3 style={{ marginTop: '10px' }}>
                    Ver nossa
                    <br />
                    loja no iFood
                  </h3>
                  <p>Prefere o app? A gente também está lá.</p>
                </div>
                <div>
                  <a className="btn b-white" href={getUrl('ifood')} target="_blank" rel="noopener noreferrer">
                    Abrir no iFood
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. REDES SOCIAIS (Acompanhe a gente - FUNDO PRETO #0B0E0C) */}
        <section
          id="sociais"
          className="soc-section"
          style={{ background: '#0B0E0C', color: '#fff', paddingTop: '20px', paddingBottom: '84px' }}
        >
          <div className="w">
            <div className="head">
              <h2 style={{ color: '#fff' }}>Acompanhe a gente</h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                Novidades, produtos e bastidores nas redes.
              </p>
            </div>
            <div className="soc2">
              <a className="sb ig" href={getUrl('instagram')} target="_blank" rel="noopener noreferrer">
                <h3>Instagram</h3>
                <span className="h">{data.handles.instagram}</span>
              </a>
              <a className="sb tt" href={getUrl('tiktok')} target="_blank" rel="noopener noreferrer">
                <h3>TikTok</h3>
                <span className="h">{data.handles.tiktok}</span>
              </a>
            </div>
          </div>
        </section>

        {/* 8. FIM / CTA FINAL (Vermelho Tomati) */}
        <div className="end">
          <div className="w">
            <h2>{data.t.fim_h}</h2>
            <div className="cta">
              <a className="btn b-leaf" href={getUrl('portal')} target="_blank" rel="noopener noreferrer">
                Comprar no portal
              </a>
              <a className="btn b-white" href={getUrl('ifood')} target="_blank" rel="noopener noreferrer">
                Pedir no iFood
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* 9. RODAPÉ (Verde Escuro + 4 Colunas + Painel da Loja) */}
      <footer>
        <div className="w">
          <div>
            <div className="logo" style={{ color: '#fff' }}>
              {data.img?.logo ? (
                <img
                  src={data.img.logo}
                  alt="Tomati"
                  style={{ height: '36px', width: 'auto', display: 'block', flexShrink: 0 }}
                />
              ) : (
                <span className="text-white font-extrabold tracking-tight text-2xl font-serif inline-flex items-center">
                  tomati<span className="text-[#FFC93C]">.</span>
                </span>
              )}
            </div>
            <p style={{ marginTop: '8px' }}>mais perto, mais fácil.</p>
          </div>

          <div>
            <h4>Região atendida</h4>
            <span>{data.regiao}</span>
          </div>

          <div>
            <h4>Horário</h4>
            <span>{data.horario}</span>
          </div>

          <div>
            <h4>Contato</h4>
            <span>{data.contato}</span>
            <div className="soc" style={{ marginTop: '10px' }}>
              <a href={getUrl('instagram')} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><use href="#ig" /></svg>
              </a>
              <a href={getUrl('tiktok')} aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><use href="#tt" /></svg>
              </a>
            </div>
          </div>

          <div style={{ gridColumn: '1 / -1', opacity: 0.8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span>© 2026 Tomati Brasil. Todos os direitos reservados.</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                type="button"
                onClick={() => setIsPWAInstallModalOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.85)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: 0,
                }}
              >
                <Smartphone size={14} className="text-[#FFC93C]" />
                <span>Instalar App</span>
              </button>
              <button
                id="ab"
                type="button"
                onClick={handleOpenAdmin}
                aria-label="Acesso restrito ao painel da loja"
                style={{ textDecoration: 'none', border: 'none', outline: 'none', background: 'transparent' }}
              >
                Painel da loja
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 10. PAINEL DA LOJA (Drawer Lateral Idêntico ao Código do Claude) */}
      <div
        id="adm"
        className={isAdminOpen ? 'on' : ''}
        role="dialog"
        aria-label="Painel da loja"
      >
        <div className="ah" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <b>Painel da loja</b>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                fontSize: '12px',
                padding: '4px 9px',
                borderRadius: '8px',
                background: 'rgba(230, 59, 31, 0.12)',
                color: '#E63B1F',
                border: '1px solid rgba(230, 59, 31, 0.25)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title="Encerrar sessão de administrador"
            >
              Sair
            </button>
            <button type="button" onClick={() => setIsAdminOpen(false)}>Fechar</button>
          </div>
        </div>

        <div className="ab">
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFC93C', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Status do Servidor
              </span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: syncStatus === 'online' ? '#52c41a' : syncStatus === 'salvando' ? '#faad14' : '#ff4d4f',
                fontWeight: 600
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: syncStatus === 'online' ? '#52c41a' : syncStatus === 'salvando' ? '#faad14' : '#ff4d4f',
                  boxShadow: syncStatus === 'online' ? '0 0 8px #52c41a' : 'none'
                }} />
                {syncStatus === 'online' ? 'Online para todos' : syncStatus === 'salvando' ? 'Sincronizando...' : 'Aviso de conexão'}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', opacity: 0.9, lineHeight: 1.4 }}>
              As fotos enviadas e alterações são salvas com segurança no servidor e ficam <b>visíveis online para todos os visitantes</b>.
            </p>

            {hasUnsavedChanges && (
              <div style={{
                background: 'rgba(255, 201, 60, 0.15)',
                border: '1px solid rgba(255, 201, 60, 0.4)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                color: '#FFC93C',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 600,
              }}>
                <span>⚠️ Você possui alterações não salvas. Clique abaixo para salvar no servidor.</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => persistData(data)}
              disabled={syncStatus === 'salvando'}
              style={{
                marginTop: '6px',
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                background: '#FFC93C',
                color: '#14201A',
                fontWeight: 700,
                fontSize: '13.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: 'none',
                cursor: syncStatus === 'salvando' ? 'not-allowed' : 'pointer',
                boxShadow: hasUnsavedChanges ? '0 0 16px rgba(255,201,60,0.5)' : '0 4px 12px rgba(0,0,0,0.2)',
                opacity: syncStatus === 'salvando' ? 0.7 : 1,
                transition: 'all 0.2s',
              }}
            >
              {syncStatus === 'salvando' ? (
                <span>Salvando no Servidor...</span>
              ) : hasUnsavedChanges ? (
                <span>💾 Salvar Alterações Pendentes</span>
              ) : (
                <span>💾 Salvar Alterações no Servidor</span>
              )}
            </button>

            {lastSavedTime && (
              <span style={{ fontSize: '11px', opacity: 0.75, textAlign: 'center', display: 'block', marginTop: '2px' }}>
                Última gravação confirmada no servidor: às {lastSavedTime}
              </span>
            )}
          </div>

          {/* Textos, links e contato */}
          <h4>Textos, links e contato</h4>
          <label>
            Link do portal
            <input
              value={data.links.portal}
              onChange={(e) => handleUpdateField('links.portal', e.target.value)}
            />
          </label>
          <label>
            Link do iFood
            <input
              value={data.links.ifood}
              onChange={(e) => handleUpdateField('links.ifood', e.target.value)}
            />
          </label>
          <label>
            Link do Instagram
            <input
              value={data.links.instagram}
              onChange={(e) => handleUpdateField('links.instagram', e.target.value)}
            />
          </label>
          <label>
            Link do TikTok
            <input
              value={data.links.tiktok}
              onChange={(e) => handleUpdateField('links.tiktok', e.target.value)}
            />
          </label>
          <label>
            @ do Instagram
            <input
              value={data.handles.instagram}
              onChange={(e) => handleUpdateField('handles.instagram', e.target.value)}
            />
          </label>
          <label>
            @ do TikTok
            <input
              value={data.handles.tiktok}
              onChange={(e) => handleUpdateField('handles.tiktok', e.target.value)}
            />
          </label>
          <label>
            Região atendida
            <input
              value={data.regiao}
              onChange={(e) => handleUpdateField('regiao', e.target.value)}
            />
          </label>
          <label>
            Horário de atendimento
            <input
              value={data.horario}
              onChange={(e) => handleUpdateField('horario', e.target.value)}
            />
          </label>
          <label>
            Contato
            <input
              value={data.contato}
              onChange={(e) => handleUpdateField('contato', e.target.value)}
            />
          </label>
          <label>
            Título principal
            <input
              value={data.t.hero_h}
              onChange={(e) => handleUpdateField('t.hero_h', e.target.value)}
            />
          </label>
          <label>
            Frase de apoio
            <textarea
              rows={3}
              value={data.t.hero_p}
              onChange={(e) => handleUpdateField('t.hero_p', e.target.value)}
            />
          </label>
          <label>
            Título do Sobre
            <input
              value={data.t.sobre_h}
              onChange={(e) => handleUpdateField('t.sobre_h', e.target.value)}
            />
          </label>
          <label>
            Texto do Sobre
            <textarea
              rows={3}
              value={data.t.sobre_p}
              onChange={(e) => handleUpdateField('t.sobre_p', e.target.value)}
            />
          </label>
          <label>
            Diferenciais reais (vazio = esconde)
            <textarea
              rows={3}
              value={data.t.sobre_x}
              onChange={(e) => handleUpdateField('t.sobre_x', e.target.value)}
            />
          </label>
          <label>
            Frase final
            <input
              value={data.t.fim_h}
              onChange={(e) => handleUpdateField('t.fim_h', e.target.value)}
            />
          </label>

          {/* Gerenciamento do Menu de Navegação */}
          <h4>Menu e Navegação do Cabeçalho</h4>
          <p>
            Altere os títulos e links dos menus exibidos no cabeçalho e na versão mobile do site. Você pode escrever o título que desejar para cada item.
          </p>

          <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(data.menu && data.menu.length > 0
              ? data.menu
              : [
                  { id: '1', title: 'Na Vitrine', url: '#produtos' },
                  { id: '2', title: 'Sobre', url: '#sobre' },
                  { id: '3', title: 'Onde encontrar', url: '#onde' },
                ]
            ).map((mItem: any, mIdx: number) => (
              <div
                key={mItem.id || mIdx}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFC93C' }}>
                    Item #{mIdx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMenuItem(mIdx)}
                    style={{
                      background: 'rgba(230, 59, 31, 0.15)',
                      border: '1px solid rgba(230, 59, 31, 0.3)',
                      color: '#ff7875',
                      borderRadius: '6px',
                      padding: '2px 8px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Excluir Item
                  </button>
                </div>

                <label style={{ margin: 0 }}>
                  Título do Menu (como aparece no cabeçalho)
                  <input
                    type="text"
                    placeholder="Ex: Na Vitrine, Nossos Produtos, Ofertas..."
                    value={mItem.title}
                    onChange={(e) => handleUpdateMenuItem(mIdx, 'title', e.target.value)}
                    style={{ marginTop: '4px' }}
                  />
                </label>

                <label style={{ margin: 0 }}>
                  Link / Âncora de Destino
                  <input
                    type="text"
                    placeholder="Ex: #produtos, #sobre, #onde ou link externo"
                    value={mItem.url}
                    onChange={(e) => handleUpdateMenuItem(mIdx, 'url', e.target.value)}
                    style={{ marginTop: '4px' }}
                  />
                </label>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddMenuItem}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px dashed rgba(255, 255, 255, 0.3)',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              + Adicionar Novo Item ao Menu
            </button>
          </div>

          {/* Gerenciamento do Logotipo Oficial */}
          <h4>Logotipo da Loja</h4>
          <p>
            Altere ou envie sua nova logo oficial. A nova imagem substitui permanentemente qualquer logo anterior em todo o site (cabeçalho, rodapé e modais) e é salva na base de dados.
          </p>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              padding: '14px',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFC93C' }}>
                Logo Ativa na Base de Dados
              </span>
              {data.img?.logo && (
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  style={{
                    background: 'rgba(230, 59, 31, 0.15)',
                    border: '1px solid rgba(230, 59, 31, 0.3)',
                    color: '#ff7875',
                    borderRadius: '6px',
                    padding: '3px 9px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                  title="Remove a logo atual da base de dados e não volta com logos antigas"
                >
                  Remover Logo Atual
                </button>
              )}
            </div>

            {/* Preview da Logo no fundo do cabeçalho */}
            <div
              style={{
                background: '#14201A',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                padding: '14px',
                minHeight: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {data.img?.logo ? (
                <img
                  src={data.img.logo}
                  alt="Logo Ativa"
                  style={{ maxHeight: '42px', maxWidth: '100%', objectFit: 'contain' }}
                />
              ) : (
                <span style={{ fontSize: '13px', opacity: 0.65, fontStyle: 'italic' }}>
                  Nenhuma imagem definida — exibindo texto: <strong>tomati.</strong>
                </span>
              )}
            </div>

            {/* Opção 1: Upload pelo computador / celular */}
            <label style={{ margin: 0 }}>
              Opção 1: Enviar arquivo de imagem (PNG transparente, SVG ou JPG)
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'logo')}
                style={{ marginTop: '6px' }}
              />
            </label>

            {/* Opção 2: URL direta da logo */}
            <label style={{ margin: 0 }}>
              Opção 2: Ou cole o link direto da imagem (URL)
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                <input
                  type="text"
                  placeholder="https://... ou /uploads/..."
                  value={data.img?.logo || ''}
                  onChange={(e) => handleUpdateLogoUrl(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => persistData(data)}
                  style={{
                    padding: '6px 12px',
                    background: '#FFC93C',
                    color: '#14201A',
                    fontWeight: 700,
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '12px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Salvar
                </button>
              </div>
            </label>
          </div>

          {/* Favicon */}
          <div style={{ marginBottom: '16px' }}>
            <label>
              Ícone do site / Favicon (aba do navegador)
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'favicon')}
              />
            </label>
            {data.img?.favicon && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <img
                  src={data.img.favicon}
                  alt=""
                  style={{ height: '32px', background: '#0F3B2A', padding: '4px', borderRadius: '6px' }}
                />
                <button
                  type="button"
                  onClick={() => handleUpdateField('img.favicon', '')}
                >
                  Remover Favicon
                </button>
              </div>
            )}
          </div>

          {/* Vitrine (do primeiro ao último) */}
          <h4>Vitrine (do primeiro ao último)</h4>
          {data.produtos.map((p: any, i: number) => (
            <div key={i} className="pc">
              <h4>{p.nome}</h4>
              <label>
                Nome
                <input
                  value={p.nome}
                  onChange={(e) => handleUpdateProduct(i, 'nome', e.target.value)}
                />
              </label>
              <label>
                Texto curto
                <input
                  value={p.texto}
                  onChange={(e) => handleUpdateProduct(i, 'texto', e.target.value)}
                />
              </label>
              <label>
                Preço (vazio = não mostra)
                <input
                  value={p.price || ''}
                  onChange={(e) => handleUpdateProduct(i, 'price', e.target.value)}
                />
              </label>
              <label>
                Texto do botão
                <input
                  value={p.cta}
                  onChange={(e) => handleUpdateProduct(i, 'cta', e.target.value)}
                />
              </label>
              <label>
                Destino: portal, ifood ou URL
                <input
                  value={p.link}
                  onChange={(e) => handleUpdateProduct(i, 'link', e.target.value)}
                />
              </label>

              <label>
                Tamanho do destaque
                <select
                  value={p.nivel}
                  onChange={(e) => handleUpdateProduct(i, 'nivel', Number(e.target.value))}
                >
                  <option value={3}>Grande</option>
                  <option value={2}>Médio</option>
                  <option value={1}>Pequeno</option>
                  <option value={4}>Faixa inteira</option>
                </select>
              </label>

              {!p.camp && (
                <>
                  <div className="r">
                    <label>
                      Cor do bloco
                      <input
                        type="color"
                        value={p.bg}
                        onChange={(e) => handleUpdateProduct(i, 'bg', e.target.value)}
                      />
                    </label>
                    <label>
                      Cor do texto
                      <input
                        type="color"
                        value={p.c}
                        onChange={(e) => handleUpdateProduct(i, 'c', e.target.value)}
                      />
                    </label>
                  </div>

                  <label>
                    Foto do produto (upload ou link URL)
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, '', i)}
                    />
                  </label>
                  <label style={{ marginTop: '4px' }}>
                    Ou link direto da imagem
                    <input
                      placeholder="https://... ou /uploads/..."
                      value={p.img || ''}
                      onChange={(e) => handleUpdateProduct(i, 'img', e.target.value)}
                    />
                  </label>

                  {p.img && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', background: 'rgba(255,255,255,0.06)', padding: '6px 10px', borderRadius: '8px' }}>
                      <img src={p.img} alt="" style={{ height: '40px', maxWidth: '60px', objectFit: 'contain' }} />
                      <span style={{ fontSize: '11px', opacity: 0.8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                        {p.img.startsWith('/uploads') ? 'Salvo no servidor' : p.img.startsWith('data:') ? 'Imagem carregada' : 'URL externa'}
                      </span>
                      <button type="button" onClick={() => handleUpdateProduct(i, 'img', '')} style={{ marginLeft: 'auto' }}>
                        Remover
                      </button>
                    </div>
                  )}
                </>
              )}

              <div style={{ marginTop: '10px' }}>
                <button type="button" onClick={() => handleMoveProduct(i, 'up')}>↑ Subir</button>
                <button type="button" onClick={() => handleMoveProduct(i, 'down')}>↓ Descer</button>
                <button type="button" onClick={() => handleDeleteProduct(i)}>
                  {confirmDeleteIdx === i ? 'Clique de novo para excluir' : 'Excluir'}
                </button>
              </div>
            </div>
          ))}

          <button type="button" onClick={handleAddProduct}>+ Novo produto</button>

          {/* Segurança & Contas de Acesso */}
          <h4>Segurança & Contas de Acesso</h4>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '10px', marginBottom: '12px' }}>
            <h5 style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#FFC93C', fontWeight: 700 }}>
              Alterar Minha Senha
            </h5>
            <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', margin: 0 }}>
                Senha atual
                <input
                  type="password"
                  placeholder="Sua senha atual"
                  value={curPass}
                  onChange={(e) => setCurPass(e.target.value)}
                  style={{ width: '100%', marginTop: '3px' }}
                />
              </label>
              <label style={{ fontSize: '12px', margin: 0 }}>
                Nova senha
                <input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  style={{ width: '100%', marginTop: '3px' }}
                />
              </label>
              <label style={{ fontSize: '12px', margin: 0 }}>
                Confirmar nova senha
                <input
                  type="password"
                  placeholder="Repita a nova senha"
                  value={newPassConfirm}
                  onChange={(e) => setNewPassConfirm(e.target.value)}
                  style={{ width: '100%', marginTop: '3px' }}
                />
              </label>
              {passChangeMsg && (
                <div style={{ fontSize: '12px', padding: '6px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.1)' }}>
                  {passChangeMsg}
                </div>
              )}
              <button
                type="submit"
                disabled={passChangeLoading}
                style={{
                  marginTop: '4px',
                  background: '#1F5A3F',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '12px',
                  padding: '7px 12px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: passChangeLoading ? 'wait' : 'pointer'
                }}
              >
                {passChangeLoading ? 'Alterando...' : 'Salvar Nova Senha'}
              </button>
            </form>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '10px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h5 style={{ margin: 0, fontSize: '13px', color: '#FFC93C', fontWeight: 700 }}>
                Administradores Cadastrados
              </h5>
              <button
                type="button"
                onClick={loadAdminUsers}
                style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
              >
                Atualizar
              </button>
            </div>
            {adminUsersList.length === 0 ? (
              <p style={{ fontSize: '12px', opacity: 0.7, margin: 0 }}>Carregando lista...</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {adminUsersList.map((adm) => {
                  const isCurrent = adm.username.toLowerCase() === currAdminUser.toLowerCase();
                  return (
                    <div
                      key={adm.username}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255,255,255,0.04)',
                        fontSize: '12px',
                      }}
                    >
                      <div>
                        <b>@{adm.username}</b>
                        <span style={{ opacity: 0.7, marginLeft: '6px' }}>({adm.name})</span>
                        {isCurrent && (
                          <span style={{ marginLeft: '6px', fontSize: '10px', background: '#FFC93C', color: '#14201A', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>
                            Você
                          </span>
                        )}
                      </div>
                      {!isCurrent && (
                        <button
                          type="button"
                          onClick={() => handleDeleteAdmin(adm.username)}
                          style={{
                            fontSize: '11px',
                            color: '#ff4d4f',
                            border: '1px solid rgba(255,77,79,0.3)',
                            background: 'transparent',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Publicar e sincronizar */}
          <h4>Sincronização e backup</h4>
          <button
            className="p"
            type="button"
            onClick={() => persistData(data)}
            style={{ marginBottom: '8px', background: '#FFC93C', color: '#14201A', fontWeight: 700 }}
          >
            Salvar tudo online agora
          </button>
          <button type="button" onClick={handleExportBackup}>Exportar backup da loja (.json)</button>
          <button type="button" onClick={handleCopyConfig}>Copiar configuração</button>

          <label>
            Importar configuração (.json)
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleImportJson}
            />
          </label>

          <button type="button" onClick={handleResetDefaults}>
            {confirmReset ? 'Clique de novo para restaurar' : 'Restaurar padrão'}
          </button>

          {adminMsg && <div className="msg" role="status">{adminMsg}</div>}
        </div>
      </div>

      {/* Modal de Acesso Restrito ao Administrador (Login e Cadastrar Discreto) */}
      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => {
          setIsAdminAuthenticated(true);
          setIsAuthModalOpen(false);
          setIsAdminOpen(true);
        }}
        logoUrl={data.img?.logo || ''}
      />

      {/* Modal de Instalação do PWA (Suporte Especial a iOS Safari e Android/Chrome) */}
      <PWAInstallModal
        isOpen={isPWAInstallModalOpen}
        onClose={() => setIsPWAInstallModalOpen(false)}
      />
    </div>
  );
};
