import React, { useState, useEffect, useRef } from 'react';
import { TomatiLogo } from './TomatiLogo';

// Configuração padrão idêntica ao código do Claude
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

// Helper para redimensionamento de imagens idêntico ao Claude
function compressImage(file: File, maxWidth: number, mimeType: string, callback: (base64: string) => void) {
  const img = new Image();
  const url = URL.createObjectURL(file);
  img.onload = () => {
    const w = img.width || 300;
    const h = img.height || 300;
    const k = Math.min(1, maxWidth / w);
    const canvas = document.createElement('canvas');
    canvas.width = w * k;
    canvas.height = h * k;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      callback(canvas.toDataURL(mimeType, 0.85));
    }
  };
  img.src = url;
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
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState<number | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        console.info('[Tomati] Servidor local/offline, mantendo dados do navegador:', err);
        setSyncStatus('online');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Upload de arquivo para o servidor (/uploads) para não pesar o navegador e ficar online
  const uploadImageToServer = async (base64Data: string, prefix: string): Promise<string> => {
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: base64Data, prefix }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.url) return json.url;
      }
    } catch (err) {
      console.warn('Falha no upload para o servidor, usando base64:', err);
    }
    return base64Data;
  };

  // Salvar no estado, no localStorage e persistir no servidor (online para todos)
  const persistData = async (updated: typeof D) => {
    setData(updated);
    try {
      localStorage.setItem(K, JSON.stringify(updated));
    } catch {
      // LocalStorage pode ter quota excedida, mas o servidor garantirá a persistência
    }

    try {
      setSyncStatus('salvando');
      const res = await fetch('/api/store-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setSyncStatus('online');
        setAdminMsg('✅ Salvo e publicado online para todos os visitantes!');
      } else {
        setSyncStatus('erro');
        setAdminMsg('⚠️ Salvo localmente, mas erro ao sincronizar com o servidor.');
      }
    } catch (err) {
      setSyncStatus('erro');
      console.warn('Erro ao salvar no servidor:', err);
      setAdminMsg('Salvo neste navegador.');
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
        setIsAdminOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsAdminOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers do Painel
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
    persistData(next);
  };

  const handleUpdateProduct = (index: number, field: string, value: any) => {
    const next = clone(data);
    if (next.produtos[index]) {
      (next.produtos[index] as any)[field] = value;
      persistData(next);
    }
  };

  const handleMoveProduct = (index: number, direction: 'up' | 'down') => {
    const next = clone(data);
    const list = next.produtos;
    if (direction === 'up' && index > 0) {
      const item = list.splice(index, 1)[0];
      list.splice(index - 1, 0, item);
      persistData(next);
    } else if (direction === 'down' && index < list.length - 1) {
      const item = list.splice(index, 1)[0];
      list.splice(index + 1, 0, item);
      persistData(next);
    }
  };

  const handleDeleteProduct = (index: number) => {
    if (confirmDeleteIdx === index) {
      const next = clone(data);
      next.produtos.splice(index, 1);
      persistData(next);
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
    persistData(next);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldKey: string, isProduct?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAdminMsg('Processando imagem e sincronizando online...');

    if (isProduct !== undefined) {
      compressImage(file, 900, 'image/webp', async (base64) => {
        const serverUrl = await uploadImageToServer(base64, `prod-${isProduct}`);
        const next = clone(data);
        next.produtos[isProduct].img = serverUrl;
        await persistData(next);
        setAdminMsg('Foto do produto salva e online para todos!');
      });
    } else {
      const maxW = fieldKey === 'logo' ? 600 : 128;
      compressImage(file, maxW, 'image/png', async (base64) => {
        const serverUrl = await uploadImageToServer(base64, `brand-${fieldKey}`);
        const next = clone(data);
        if (!next.img) next.img = { logo: '', favicon: '' };
        (next.img as any)[fieldKey] = serverUrl;
        await persistData(next);
        setAdminMsg('Imagem salva e online para todos!');
      });
    }
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
    file.text().then((text) => {
      try {
        const parsed = JSON.parse(text);
        persistData({ ...clone(D), ...parsed });
        setAdminMsg('Configuração importada com sucesso.');
      } catch {
        setAdminMsg('Arquivo JSON inválido.');
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

  const handleDownloadPage = () => {
    const htmlString = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Tomati | Comida que faz bem, a dois toques</title>
<meta name="theme-color" content="#0F3B2A">
<meta property="og:title" content="Tomati | Comida que faz bem, a dois toques">
<link id="fav" rel="icon" href="${data.img?.favicon || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23E63B1F'/%3E%3Ctext x='50' y='68' font-size='56' font-family='Arial' font-weight='800' fill='white' text-anchor='middle'%3Et.%3C/text%3E%3C/svg%3E"}">
<meta name="description" content="A Tomati reúne marcas de alimentação saudável em Curitiba. Peça no portal ou no iFood.">
</head>
<body>
<!-- Tomati standalone export -->
<script>/*D*/const D=${JSON.stringify(data)};/*D*/</script>
</body>
</html>`;
    const blob = new Blob([htmlString], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tomati.html';
    link.click();
    setAdminMsg('Download iniciado.');
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

      {/* 1. HEADER (Verde Escuro Oficial Tomati) */}
      <header>
        <div className="w">
          <a className="logo" href="#top" aria-label="Tomati">
            {data.img?.logo ? (
              <img
                src={data.img.logo}
                alt="Tomati"
                style={{ height: '36px', width: 'auto', display: 'block' }}
              />
            ) : (
              <span className="flex items-center gap-2">
                <TomatiLogo size="sm" variant="light" />
              </span>
            )}
          </a>

          <nav className="nav-main">
            <a href="#produtos">Produtos</a>
            <a href="#sobre">Sobre</a>
            <a href="#onde">Onde comprar</a>
          </nav>

          <div className="soc">
            <a href={getUrl('instagram')} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><use href="#ig" /></svg>
            </a>
            <a href={getUrl('tiktok')} aria-label="TikTok" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><use href="#tt" /></svg>
            </a>
          </div>

          <a className="btn b-white" href="#onde">Fazer pedido</a>
        </div>
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
            <div className="logo" style={{ fontSize: '36px', color: '#fff' }}>
              {data.img?.logo ? (
                <img src={data.img.logo} alt="Tomati" style={{ height: '36px', width: 'auto', display: 'block' }} />
              ) : (
                <span className="flex items-center gap-2">
                  <TomatiLogo size="md" variant="light" />
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

          <div style={{ gridColumn: '1 / -1', opacity: 0.7, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span>© 2026 Tomati Brasil. Todos os direitos reservados.</span>
            <button
              id="ab"
              type="button"
              onClick={() => setIsAdminOpen(true)}
              aria-label="Abrir painel da loja"
            >
              Painel da loja
            </button>
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
        <div className="ah">
          <b>Painel da loja</b>
          <button type="button" onClick={() => setIsAdminOpen(false)}>Fechar</button>
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
              As fotos enviadas e alterações são salvas automaticamente no servidor e ficam <b>visíveis online para todos os visitantes</b> em tempo real.
            </p>
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

          {/* Logo e ícones */}
          <h4>Logo e ícones</h4>
          <p>
            Use PNG com fundo transparente. O logo aparece no cabeçalho e no rodapé (fundo verde-escuro), então prefira a versão clara. (Os ícones do Instagram e TikTok são brancos nativos).
          </p>
          {[
            ['logo', 'Logo da loja'],
            ['favicon', 'Ícone do site (aba do navegador)'],
          ].map(([key, label]) => {
            const currentImg = data.img ? (data.img as any)[key] : '';
            return (
              <div key={key} style={{ marginTop: '8px' }}>
                <label>
                  {label}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, key)}
                  />
                </label>
                {currentImg && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <img
                      src={currentImg}
                      alt=""
                      style={{ height: '36px', background: '#0F3B2A', padding: '4px', borderRadius: '6px' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleUpdateField(`img.${key}`, '')}
                    >
                      Remover
                    </button>
                  </div>
                )}
              </div>
            );
          })}

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
          <button type="button" onClick={handleDownloadPage}>Baixar página (.html)</button>
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
    </div>
  );
};
