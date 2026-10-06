import React, { useState } from 'react';
import { StoreConfig, BrandPartner, Product, CommunityPost } from '../types';
import { DEFAULT_STORE_CONFIG, PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import { TomatiLogo, TomatiIcon } from './TomatiLogo';
import { IfoodIcon } from './IfoodIcon';
import {
  X,
  Save,
  Plus,
  Trash2,
  Edit2,
  Check,
  Sparkles,
  Building2,
  Link2,
  Upload,
  RefreshCw,
  Tag,
  Image as ImageIcon,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  Globe,
  Clock,
  Phone,
  Instagram,
  Play,
  HelpCircle,
  ExternalLink,
  MapPin,
  UserPlus,
  UserCheck,
  Mail,
  User,
  ShieldCheck,
  Copy,
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: StoreConfig;
  products: Product[];
  onSaveConfig: (newConfig: StoreConfig) => void;
  onSaveProducts: (newProducts: Product[]) => void;
  onResetAll: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  config,
  products,
  onSaveConfig,
  onSaveProducts,
  onResetAll,
}) => {
  // Autenticação do painel administrativo
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('tomati_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Modo da tela de acesso: 'register' (Cadastro/Primeiro Acesso) ou 'login' (Entrar)
  const [authMode, setAuthMode] = useState<'register' | 'login'>(() => {
    // Se o usuário ainda não cadastrou email, abre direto em Cadastro
    return config.adminEmail ? 'login' : 'register';
  });

  // Campos de Cadastro
  const [regName, setRegName] = useState(config.adminName || '');
  const [regEmail, setRegEmail] = useState(config.adminEmail || 'dugui2225@gmail.com');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState('');

  // Campos de Login
  const [loginInput, setLoginInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Abas do painel administrativo
  const [activeTab, setActiveTab] = useState<
    'logos' | 'brands' | 'products' | 'hours-contact' | 'social-videos' | 'online' | 'security'
  >('logos');

  const [formData, setFormData] = useState<StoreConfig>({ ...config });
  const [productList, setProductList] = useState<Product[]>([...products]);
  const [savedNotice, setSavedNotice] = useState(false);
  const [domainCopied, setDomainCopied] = useState(false);

  // Edição de senha/dados na aba de Segurança
  const [newAdminPassword, setNewAdminPassword] = useState(config.adminPassword || 'admin');
  const [editAdminEmail, setEditAdminEmail] = useState(config.adminEmail || '');
  const [editAdminName, setEditAdminName] = useState(config.adminName || '');
  const [customDomainInput, setCustomDomainInput] = useState(config.customDomain || 'tomati.com.br');

  // Estado do formulário de produto (criar ou editar)
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [prodName, setProdName] = useState('');
  const [prodBrand, setProdBrand] = useState('Hey! Mu');
  const [prodCategory, setProdCategory] = useState<Product['category']>('pastas-spreads');
  const [prodCategoryLabel, setProdCategoryLabel] = useState('Doces & Pastas');
  const [prodPrice, setProdPrice] = useState('R$ 38,90');
  const [prodWeight, setProdWeight] = useState('350g');
  const [prodTagline, setProdTagline] = useState('');
  const [prodDescription, setProdDescription] = useState('');
  const [prodBenefits, setProdBenefits] = useState('Zero açúcar, Rico em proteínas, Adoçado naturalmente');
  const [prodBadge, setProdBadge] = useState('Destaque');
  const [prodPortalLink, setProdPortalLink] = useState('');
  const [prodIfoodLink, setProdIfoodLink] = useState('');
  const [prodImageUrl, setProdImageUrl] = useState('');

  // Upload rápido de marca parceira (Apenas Logo, sem necessidade de escrita)
  const [quickBrandLogoUrl, setQuickBrandLogoUrl] = useState('');
  const [quickBrandName, setQuickBrandName] = useState('');

  // Criação/edição de Vídeos / Reels
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoTag, setVideoTag] = useState('Receita Saudável');
  const [videoLink, setVideoLink] = useState('');
  const [videoCoverUrl, setVideoCoverUrl] = useState('');
  const [videoPlatform, setVideoPlatform] = useState<'instagram' | 'tiktok'>('instagram');

  if (!isOpen) return null;

  // HANDLER: Cadastro de Administrador (Primeiro Acesso)
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (regPassword.length < 4) {
      setRegError('A senha deve ter no mínimo 4 caracteres.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError('As senhas digitadas não coincidem.');
      return;
    }

    const updatedConfig: StoreConfig = {
      ...formData,
      adminName: regName.trim() || 'Administrador',
      adminEmail: regEmail.trim(),
      adminPassword: regPassword.trim(),
    };

    setFormData(updatedConfig);
    onSaveConfig(updatedConfig);
    setNewAdminPassword(regPassword.trim());
    setEditAdminEmail(regEmail.trim());
    setEditAdminName(regName.trim() || 'Administrador');

    // Autentica com sucesso
    setIsAuthenticated(true);
    try {
      sessionStorage.setItem('tomati_admin_auth', 'true');
    } catch {
      // Ignore
    }
  };

  // HANDLER: Login de Administrador
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = formData.adminPassword || config.adminPassword || 'admin';
    if (loginPassword.trim() === correctPassword) {
      setIsAuthenticated(true);
      setLoginError(false);
      try {
        sessionStorage.setItem('tomati_admin_auth', 'true');
      } catch {
        // Ignore
      }
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginPassword('');
    try {
      sessionStorage.removeItem('tomati_admin_auth');
    } catch {
      // Ignore
    }
  };

  // Upload genérico de arquivo para Base64 (Data URI)
  const handleGenericFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onComplete(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Formulário de produto
  const handleStartCreateProduct = () => {
    setEditingProductId(null);
    setProdName('');
    setProdBrand('Tomati');
    setProdCategory('pastas-spreads');
    setProdCategoryLabel('Doces & Pastas');
    setProdPrice('R$ 38,90');
    setProdWeight('350g');
    setProdTagline('');
    setProdDescription('');
    setProdBenefits('Zero açúcar, Rico em proteínas, Saudabilidade');
    setProdBadge('Destaque');
    setProdPortalLink(formData.portalUrl || 'https://pedido.tomati.com.br');
    setProdIfoodLink(formData.ifoodUrl || 'https://www.ifood.com.br');
    setProdImageUrl('');
    setIsEditingProduct(true);
  };

  const handleStartEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProdName(prod.name);
    setProdBrand(prod.brand);
    setProdCategory(prod.category);
    setProdCategoryLabel(prod.categoryLabel);
    setProdPrice(prod.priceFormatted);
    setProdWeight(prod.weight);
    setProdTagline(prod.tagline);
    setProdDescription(prod.description);
    setProdBenefits(prod.benefits.join(', '));
    setProdBadge(prod.badge || '');
    setProdPortalLink(prod.portalLink);
    setProdIfoodLink(prod.ifoodLink);
    setProdImageUrl(prod.imageUrl || '');
    setIsEditingProduct(true);
  };

  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) return;

    const benefitsArray = prodBenefits
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);

    const updatedProduct: Product = {
      id: editingProductId || `prod-${Date.now()}`,
      name: prodName.trim(),
      brand: prodBrand.trim() || 'Tomati',
      category: prodCategory,
      categoryLabel: prodCategoryLabel || 'Saudabilidade',
      tagline: prodTagline.trim() || 'Produto selecionado pela curadoria Tomati',
      description: prodDescription.trim() || prodTagline.trim(),
      weight: prodWeight.trim() || 'Unidade',
      nutritionHighlight: 'Curadoria Limpa · Saudabilidade',
      benefits: benefitsArray.length > 0 ? benefitsArray : ['Alta qualidade', 'Sabor incomparável'],
      priceFormatted: prodPrice.trim() || 'Sob consulta',
      badge: prodBadge.trim() || undefined,
      portalLink: prodPortalLink.trim() || formData.portalUrl,
      ifoodLink: prodIfoodLink.trim() || formData.ifoodUrl,
      accentColor: '#1F3E29',
      imageUrl: prodImageUrl.trim() || undefined,
    };

    let newProducts: Product[];
    if (editingProductId) {
      newProducts = productList.map((p) => (p.id === editingProductId ? updatedProduct : p));
    } else {
      newProducts = [updatedProduct, ...productList];
    }

    setProductList(newProducts);
    onSaveProducts(newProducts);
    setIsEditingProduct(false);
    setEditingProductId(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta oferta da vitrine?')) {
      const newProducts = productList.filter((p) => p.id !== id);
      setProductList(newProducts);
      onSaveProducts(newProducts);
    }
  };

  // Marcas Parceiras (Apenas Logo)
  const handleAddBrandLogo = (logoUrl: string, name?: string) => {
    if (!logoUrl) return;
    const newBrand: BrandPartner = {
      id: `brand-${Date.now()}`,
      name: name?.trim() || `Marca ${formData.brands.length + 1}`,
      category: 'Parceiro',
      logoUrl: logoUrl,
      accentColor: '#1F3E29',
    };

    const updatedBrands = [...(formData.brands || []), newBrand];
    const newConf = { ...formData, brands: updatedBrands };
    setFormData(newConf);
    onSaveConfig(newConf);
    setQuickBrandLogoUrl('');
    setQuickBrandName('');
  };

  const handleRemoveBrand = (id: string) => {
    const updatedBrands = formData.brands.filter((b) => b.id !== id);
    const newConf = { ...formData, brands: updatedBrands };
    setFormData(newConf);
    onSaveConfig(newConf);
  };

  // Vídeos / Reels
  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoLink.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      title: videoTitle.trim() || 'Receita & Dica de Saudabilidade Tomati',
      tag: videoTag.trim() || 'Saudabilidade',
      platform: videoPlatform,
      link: videoLink.trim(),
      coverImageUrl: videoCoverUrl.trim() || undefined,
    };

    const currentPosts = formData.communityPosts || [];
    const updatedPosts = [newPost, ...currentPosts];
    const newConf = { ...formData, communityPosts: updatedPosts };
    setFormData(newConf);
    onSaveConfig(newConf);

    setVideoTitle('');
    setVideoLink('');
    setVideoCoverUrl('');
    setIsAddingVideo(false);
  };

  const handleDeleteVideo = (id: string) => {
    const currentPosts = formData.communityPosts || [];
    const updatedPosts = currentPosts.filter((p) => p.id !== id);
    const newConf = { ...formData, communityPosts: updatedPosts };
    setFormData(newConf);
    onSaveConfig(newConf);
  };

  // Salvar tudo
  const handleSaveAll = () => {
    const updatedConf: StoreConfig = {
      ...formData,
      adminName: editAdminName.trim() || formData.adminName,
      adminEmail: editAdminEmail.trim() || formData.adminEmail,
      adminPassword: newAdminPassword.trim() || 'admin',
      customDomain: customDomainInput.trim() || formData.customDomain,
    };
    setFormData(updatedConf);
    onSaveConfig(updatedConf);
    onSaveProducts(productList);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  // ============================================================
  // TELA DE CADASTRO OU LOGIN (QUANDO NÃO AUTENTICADO)
  // ============================================================
  if (!isAuthenticated) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fade-in overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header do Modal com Botão X */}
          <div className="p-4 sm:p-5 pb-3 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#1F3E29]/10 text-[#1F3E29] flex items-center justify-center shrink-0">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[#1F3E29] leading-tight">
                  Painel Administrativo Tomati
                </h3>
                <span className="text-[11px] text-stone-500 font-mono">
                  Área de Gestão da Loja & Vitrine
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-200/80 hover:bg-stone-300 flex items-center justify-center text-stone-700 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X size={16} />
            </button>
          </div>

          {/* Abas: Cadastrar (Primeiro Acesso) vs Entrar */}
          <div className="px-5 pt-3 bg-stone-50 border-b border-stone-200 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setRegError('');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 border-b-2 font-bold text-xs transition-all cursor-pointer ${
                authMode === 'register'
                  ? 'border-[#1F3E29] text-[#1F3E29] bg-white rounded-t-xl shadow-2xs'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <UserPlus size={14} className="text-[#D44A22]" />
              <span>1. Criar Cadastro (Primeiro Acesso)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setLoginError(false);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 border-b-2 font-bold text-xs transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'border-[#1F3E29] text-[#1F3E29] bg-white rounded-t-xl shadow-2xs'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <KeyRound size={14} className="text-[#2D583B]" />
              <span>2. Já Tenho Senha (Entrar)</span>
            </button>
          </div>

          {/* Conteúdo do Formulário */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
            {/* ========================================= */}
            {/* MODO 1: CADASTRO / PRIMEIRO ACESSO        */}
            {/* ========================================= */}
            {authMode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-0.5">
                  <span className="font-bold block flex items-center gap-1.5">
                    <Sparkles size={14} className="text-emerald-700" />
                    <span>Crie suas credenciais de administrador:</span>
                  </span>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    Cadastre seu nome, e-mail e defina a senha que você usará para acessar o painel sempre que quiser editar o site.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                    <User size={13} className="text-[#1F3E29]" />
                    <span>Seu Nome / Identificação</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Eduardo"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#1F3E29] bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                    <Mail size={13} className="text-[#1F3E29]" />
                    <span>Seu E-mail Oficial</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#1F3E29] bg-stone-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Crie sua Senha
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Mínimo 4 caracteres"
                      value={regPassword}
                      onChange={(e) => {
                        setRegPassword(e.target.value);
                        setRegError('');
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#1F3E29] bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Confirme a Senha
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Repita a senha"
                      value={regConfirmPassword}
                      onChange={(e) => {
                        setRegConfirmPassword(e.target.value);
                        setRegError('');
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#1F3E29] bg-stone-50"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-500 pt-0.5">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="inline-flex items-center gap-1 text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                    <span>{showPassword ? 'Ocultar senhas' : 'Ver senhas digitadas'}</span>
                  </button>
                </div>

                {regError && (
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                    {regError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <UserCheck size={16} />
                  <span>Cadastrar Acesso e Entrar no Painel</span>
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-stone-500 hover:text-stone-800 text-xs underline cursor-pointer"
                  >
                    Já cadastrou anteriormente? Clique aqui para entrar
                  </button>
                </div>
              </form>
            )}

            {/* ========================================= */}
            {/* MODO 2: JÁ TENHO CADASTRO / LOGIN         */}
            {/* ========================================= */}
            {authMode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-3.5">
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-0.5">
                  <span className="font-bold text-[#1F3E29] block">
                    Entrar com Senha Cadastrada
                  </span>
                  <p className="text-[11px] text-stone-600">
                    Digite a senha que você cadastrou para acessar a gestão do site.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center justify-between">
                    <span>Sua Senha de Acesso:</span>
                    <span className="text-[10px] text-stone-400">Padrão inicial: admin</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoFocus
                      placeholder="Digite a senha..."
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        setLoginError(false);
                      }}
                      className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl border text-xs focus:outline-none bg-stone-50 transition-all ${
                        loginError
                          ? 'border-red-500 ring-2 ring-red-200'
                          : 'border-stone-300 focus:border-[#1F3E29] focus:bg-white'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>

                  {loginError && (
                    <span className="block text-red-600 text-[11px] font-semibold mt-1.5">
                      Senha incorreta. Se você ainda não cadastrou sua própria senha, use <strong>admin</strong> ou clique na aba <em>1. Criar Cadastro</em> acima.
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <KeyRound size={15} />
                  <span>Entrar no Painel</span>
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="text-stone-500 hover:text-stone-800 text-xs underline cursor-pointer"
                  >
                    Primeiro acesso? Crie seu cadastro agora
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // PAINEL ADMINISTRATIVO AUTENTICADO
  // ============================================================
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[92vh] sm:max-h-[640px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Painel Fixo */}
        <div className="p-3.5 sm:p-4 pb-2.5 border-b border-stone-200 flex items-center justify-between bg-stone-50/95 shrink-0">
          <div className="flex items-center gap-3">
            <TomatiIcon
              size={32}
              variant="dark"
              customLightUrl={formData.iconLightBgUrl}
              customDarkUrl={formData.iconDarkBgUrl}
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#1F3E29]">
                  Painel Administrativo Tomati
                </h3>
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  <Unlock size={10} /> Conectado ({formData.adminName || 'Admin'})
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-stone-500 font-mono hidden sm:block">
                Logos, Marcas, Ofertas, Horários, Redes e Publicação com Domínio Próprio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="px-2.5 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-200 text-stone-600 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              title="Sair do painel"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Sair</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-700 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="px-3 sm:px-4 pt-2 bg-stone-50/95 border-b border-stone-200 flex items-center gap-1 overflow-x-auto shrink-0 scrollbar-none">
          {/* ABA 1: Identidade Visual & Logos */}
          <button
            onClick={() => setActiveTab('logos')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'logos'
                ? 'border-[#1F3E29] text-[#1F3E29] bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <ImageIcon size={14} className="text-[#D44A22]" />
            <span>1. Logos & Ícones</span>
          </button>

          {/* ABA 2: Marcas do Carrossel (Apenas Logos) */}
          <button
            onClick={() => setActiveTab('brands')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'brands'
                ? 'border-[#1F3E29] text-[#1F3E29] bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Building2 size={14} className="text-[#2D583B]" />
            <span>2. Marcas do Carrossel ({formData.brands?.length || 0})</span>
          </button>

          {/* ABA 3: Vitrine & Ofertas */}
          <button
            onClick={() => {
              setActiveTab('products');
              setIsEditingProduct(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'border-[#1F3E29] text-[#1F3E29] bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Tag size={14} className="text-[#1F3E29]" />
            <span>3. Vitrine & Ofertas ({productList.length})</span>
          </button>

          {/* ABA 4: Horários & Contato Curitiba */}
          <button
            onClick={() => setActiveTab('hours-contact')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'hours-contact'
                ? 'border-[#1F3E29] text-[#1F3E29] bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Clock size={14} className="text-[#CF7A23]" />
            <span>4. Horários & Fone</span>
          </button>

          {/* ABA 5: Redes Sociais & Vídeos Instagram */}
          <button
            onClick={() => setActiveTab('social-videos')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'social-videos'
                ? 'border-[#1F3E29] text-[#1F3E29] bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Instagram size={14} className="text-pink-600" />
            <span>5. Redes & Vídeos</span>
          </button>

          {/* ABA 6: Publicar com Domínio Próprio */}
          <button
            onClick={() => setActiveTab('online')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'online'
                ? 'border-[#1F3E29] text-[#1F3E29] bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Globe size={14} className="text-emerald-700" />
            <span>6. Domínio Próprio & Online</span>
          </button>

          {/* ABA 7: Senha e Segurança */}
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'border-[#1F3E29] text-[#1F3E29] bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <KeyRound size={14} className="text-stone-600" />
            <span>7. Minha Conta & Senha</span>
          </button>
        </div>

        {/* Conteúdo com Scroll interno */}
        <div className="p-3.5 sm:p-5 overflow-y-auto flex-1 space-y-5">
          {/* ========================================================= */}
          {/* ABA 1: IDENTIDADE VISUAL (LOGOS, ÍCONES E IFOOD)          */}
          {/* ========================================================= */}
          {activeTab === 'logos' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-stone-200 space-y-1">
                <h4 className="font-bold text-xs sm:text-sm text-[#1F3E29] flex items-center gap-2">
                  <Sparkles size={16} className="text-[#D44A22]" />
                  <span>Upload das Logomarcas Oficiais da Tomati e iFood</span>
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Envie a imagem da sua logo ou ícone pelo computador (PNG transparente, SVG ou JPG). Ao fazer o upload, ela substitui automaticamente a marca em todo o site.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* 1. Logo Tomati - Fundo Claro */}
                <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-stone-900 block">
                        Logomarca - Fundo Claro
                      </span>
                      <span className="text-[10px] text-stone-500">Usada no cabeçalho e fundos claros</span>
                    </div>
                    {formData.logoLightBgUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, logoLightBgUrl: undefined })}
                        className="text-[11px] text-red-600 hover:underline cursor-pointer"
                      >
                        Restaurar padrão
                      </button>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-[#FBF9F5] border border-stone-200 flex items-center justify-center min-h-[64px]">
                    <TomatiLogo
                      size="md"
                      customLightBgUrl={formData.logoLightBgUrl}
                      customDarkBgUrl={formData.logoDarkBgUrl}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                      <Upload size={13} />
                      <span>Upload do Arquivo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleGenericFileUpload(e, (url) =>
                            setFormData({ ...formData, logoLightBgUrl: url })
                          )
                        }
                      />
                    </label>

                    <input
                      type="url"
                      placeholder="Ou cole o link da imagem (https://...)"
                      value={formData.logoLightBgUrl || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, logoLightBgUrl: e.target.value || undefined })
                      }
                      className="flex-1 px-2.5 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none bg-stone-50"
                    />
                  </div>
                </div>

                {/* 2. Logo Tomati - Fundo Escuro */}
                <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-stone-900 block">
                        Logomarca - Fundo Escuro
                      </span>
                      <span className="text-[10px] text-stone-500">Usada no rodapé escuro</span>
                    </div>
                    {formData.logoDarkBgUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, logoDarkBgUrl: undefined })}
                        className="text-[11px] text-red-600 hover:underline cursor-pointer"
                      >
                        Restaurar padrão
                      </button>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-[#14281B] border border-stone-900 flex items-center justify-center min-h-[64px]">
                    <TomatiLogo
                      variant="light"
                      size="md"
                      customLightBgUrl={formData.logoLightBgUrl}
                      customDarkBgUrl={formData.logoDarkBgUrl}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                      <Upload size={13} />
                      <span>Upload do Arquivo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleGenericFileUpload(e, (url) =>
                            setFormData({ ...formData, logoDarkBgUrl: url })
                          )
                        }
                      />
                    </label>

                    <input
                      type="url"
                      placeholder="Ou cole o link da imagem (https://...)"
                      value={formData.logoDarkBgUrl || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, logoDarkBgUrl: e.target.value || undefined })
                      }
                      className="flex-1 px-2.5 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none bg-stone-50"
                    />
                  </div>
                </div>

                {/* 3. Ícone Tomati (Badge "t.") - Fundo Claro */}
                <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-stone-900 block">
                        Ícone / Badge - Fundo Claro
                      </span>
                      <span className="text-[10px] text-stone-500">Usado em botões e selos claros</span>
                    </div>
                    {formData.iconLightBgUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, iconLightBgUrl: undefined })}
                        className="text-[11px] text-red-600 hover:underline cursor-pointer"
                      >
                        Restaurar padrão
                      </button>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-[#FBF9F5] border border-stone-200 flex items-center justify-center min-h-[64px]">
                    <TomatiIcon
                      size={36}
                      variant="dark"
                      customLightUrl={formData.iconLightBgUrl}
                      customDarkUrl={formData.iconDarkBgUrl}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-black text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                      <Upload size={13} />
                      <span>Upload Ícone</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleGenericFileUpload(e, (url) =>
                            setFormData({ ...formData, iconLightBgUrl: url })
                          )
                        }
                      />
                    </label>

                    <input
                      type="url"
                      placeholder="Ou cole URL..."
                      value={formData.iconLightBgUrl || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, iconLightBgUrl: e.target.value || undefined })
                      }
                      className="flex-1 px-2.5 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none bg-stone-50"
                    />
                  </div>
                </div>

                {/* 4. Ícone Tomati (Badge "t.") - Fundo Escuro */}
                <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-stone-900 block">
                        Ícone / Badge - Fundo Escuro
                      </span>
                      <span className="text-[10px] text-stone-500">Usado em botões verdes e rodapé</span>
                    </div>
                    {formData.iconDarkBgUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, iconDarkBgUrl: undefined })}
                        className="text-[11px] text-red-600 hover:underline cursor-pointer"
                      >
                        Restaurar padrão
                      </button>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-[#14281B] border border-stone-900 flex items-center justify-center min-h-[64px]">
                    <TomatiIcon
                      size={36}
                      variant="light"
                      customLightUrl={formData.iconLightBgUrl}
                      customDarkUrl={formData.iconDarkBgUrl}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-black text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                      <Upload size={13} />
                      <span>Upload Ícone</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleGenericFileUpload(e, (url) =>
                            setFormData({ ...formData, iconDarkBgUrl: url })
                          )
                        }
                      />
                    </label>

                    <input
                      type="url"
                      placeholder="Ou cole URL..."
                      value={formData.iconDarkBgUrl || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, iconDarkBgUrl: e.target.value || undefined })
                      }
                      className="flex-1 px-2.5 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none bg-stone-50"
                    />
                  </div>
                </div>

                {/* 5. Upload para Marca iFood */}
                <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-2.5 shadow-2xs md:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-stone-900 block">
                        Marca Oficial do iFood (Upload Customizado)
                      </span>
                      <span className="text-[10px] text-stone-500">
                        Substitua a marca do iFood por qualquer versão ou logo oficial desejada
                      </span>
                    </div>
                    {formData.ifoodLogoUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, ifoodLogoUrl: undefined })}
                        className="text-[11px] text-red-600 hover:underline cursor-pointer"
                      >
                        Restaurar ícone oficial vetorizado
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-red-50/50 border border-red-100">
                    <div className="w-12 h-12 rounded-xl bg-white border border-red-200 flex items-center justify-center shrink-0 shadow-xs">
                      <IfoodIcon size={26} customLogoUrl={formData.ifoodLogoUrl} />
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EA1D2C] hover:bg-red-700 text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                          <Upload size={13} />
                          <span>Upload Logo iFood</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleGenericFileUpload(e, (url) =>
                                setFormData({ ...formData, ifoodLogoUrl: url })
                              )
                            }
                          />
                        </label>

                        <input
                          type="url"
                          placeholder="Ou cole o link da logo iFood (https://...)"
                          value={formData.ifoodLogoUrl || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, ifoodLogoUrl: e.target.value || undefined })
                          }
                          className="flex-1 px-2.5 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 2: MARCAS DO CARROSSEL (APENAS LOGOS, SEM ESCRITA)    */}
          {/* ========================================================= */}
          {activeTab === 'brands' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-stone-200 space-y-1">
                <h4 className="font-bold text-xs sm:text-sm text-[#1F3E29] flex items-center gap-2">
                  <Building2 size={16} className="text-[#2D583B]" />
                  <span>Gerenciar Logos das Marcas do Carrossel</span>
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Adicione apenas a imagem da logo de cada marca. No carrossel do site aparecerá somente a imagem da logo, sem texto ou descrições adicionais.
                </p>
              </div>

              {/* Upload direto e rápido da Logo */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-2xs">
                <span className="font-bold text-xs text-[#1F3E29] uppercase tracking-wider block">
                  Adicionar Nova Marca (Apenas Imagem)
                </span>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0 overflow-hidden">
                    {quickBrandLogoUrl ? (
                      <img
                        src={quickBrandLogoUrl}
                        alt="Preview da marca"
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <span className="text-[10px] text-stone-400 text-center px-1">Sem logo</span>
                    )}
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                        <Upload size={14} />
                        <span>Upload do Computador</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleGenericFileUpload(e, (url) => {
                              setQuickBrandLogoUrl(url);
                              handleAddBrandLogo(url, quickBrandName);
                            })
                          }
                        />
                      </label>

                      <input
                        type="url"
                        placeholder="Ou cole a URL da imagem da marca (https://...)"
                        value={quickBrandLogoUrl}
                        onChange={(e) => setQuickBrandLogoUrl(e.target.value)}
                        className="flex-1 min-w-[200px] px-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none bg-stone-50"
                      />

                      {quickBrandLogoUrl && (
                        <button
                          type="button"
                          onClick={() => handleAddBrandLogo(quickBrandLogoUrl, quickBrandName)}
                          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <Plus size={14} />
                          <span>Adicionar</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-stone-500">Nome identificador interno (opcional):</span>
                      <input
                        type="text"
                        placeholder="Ex: Hey! Mu"
                        value={quickBrandName}
                        onChange={(e) => setQuickBrandName(e.target.value)}
                        className="px-2.5 py-1 text-xs rounded-lg border border-stone-200 bg-stone-50 w-44"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Lista de Marcas Cadastradas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-stone-700 uppercase tracking-wider">
                    Logos Ativas no Carrossel ({formData.brands?.length || 0})
                  </span>
                  <span className="text-[11px] text-stone-500">Aparecem deslizando no carrossel</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {formData.brands?.map((brand) => (
                    <div
                      key={brand.id}
                      className="group relative flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-stone-200 shadow-2xs hover:shadow-xs transition-all min-h-[80px]"
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveBrand(brand.id)}
                        className="absolute top-1.5 right-1.5 text-stone-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Excluir marca"
                      >
                        <Trash2 size={13} />
                      </button>

                      {brand.logoUrl ? (
                        <img
                          src={brand.logoUrl}
                          alt={brand.name || 'Marca'}
                          className="h-8 max-w-[90px] object-contain my-auto"
                        />
                      ) : (
                        <div
                          className="font-bold text-xs px-2.5 py-1 rounded-lg text-white"
                          style={{ backgroundColor: brand.accentColor || '#1F3E29' }}
                        >
                          {brand.name}
                        </div>
                      )}

                      <span className="text-[10px] text-stone-400 font-mono mt-1 text-center truncate max-w-[100px]">
                        {brand.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 3: VITRINE DE PRODUTOS & OFERTAS                      */}
          {/* ========================================================= */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              {!isEditingProduct ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-[#FBF9F5] border border-stone-200">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1F3E29]">
                        Ofertas Cadastradas na Vitrine ({productList.length})
                      </h4>
                      <p className="text-xs text-stone-600">
                        Cada produto tem sua própria foto e links de pedido para a Loja Tomati e iFood.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleStartCreateProduct}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
                    >
                      <Plus size={14} />
                      <span>Cadastrar Nova Oferta</span>
                    </button>
                  </div>

                  {/* Grid de Produtos */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {productList.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-2.5"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-14 h-14 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0 overflow-hidden">
                            {prod.imageUrl ? (
                              <img
                                src={prod.imageUrl}
                                alt={prod.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-[10px] text-stone-400 text-center px-1">Sem foto</span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-[#D44A22] uppercase tracking-wider block">
                              {prod.brand} · {prod.weight}
                            </span>
                            <h5 className="font-display font-bold text-xs sm:text-sm text-[#1F3E29] leading-tight truncate">
                              {prod.name}
                            </h5>
                            <span className="font-bold text-xs text-stone-900 block mt-0.5">
                              {prod.priceFormatted}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleStartEditProduct(prod)}
                              className="text-stone-600 hover:text-[#1F3E29] font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <Edit2 size={12} />
                              <span>Editar</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="text-red-600 hover:text-red-800 font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 size={12} />
                              <span>Excluir</span>
                            </button>
                          </div>

                          <span className="text-[10px] text-stone-400 font-mono">
                            {prod.badge || 'Vitrine'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Formulário de Produto */
                <form
                  onSubmit={handleSaveProductForm}
                  className="p-4 sm:p-5 rounded-2xl bg-[#FBF9F5] border border-stone-200 space-y-3.5"
                >
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#1F3E29]">
                      {editingProductId ? 'Editar Oferta da Vitrine' : 'Cadastrar Nova Oferta'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingProduct(false)}
                      className="text-xs text-stone-500 hover:underline cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Nome do Produto *
                      </label>
                      <input
                        type="text"
                        required
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        placeholder="Ex: Doce de Leite Zero Açúcar"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#1F3E29] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Marca do Produto
                      </label>
                      <input
                        type="text"
                        value={prodBrand}
                        onChange={(e) => setProdBrand(e.target.value)}
                        placeholder="Ex: Hey! Mu, Naveia, Tocca..."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#1F3E29] bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Preço Formatado *
                      </label>
                      <input
                        type="text"
                        required
                        value={prodPrice}
                        onChange={(e) => setProdPrice(e.target.value)}
                        placeholder="R$ 38,90"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#1F3E29] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Peso / Volume
                      </label>
                      <input
                        type="text"
                        value={prodWeight}
                        onChange={(e) => setProdWeight(e.target.value)}
                        placeholder="350g ou 1 Litro"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#1F3E29] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Selo de Destaque
                      </label>
                      <input
                        type="text"
                        value={prodBadge}
                        onChange={(e) => setProdBadge(e.target.value)}
                        placeholder="Mais Desejado, Zero Açúcar..."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#1F3E29] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Frase de Destaque / Tagline
                    </label>
                    <input
                      type="text"
                      value={prodTagline}
                      onChange={(e) => setProdTagline(e.target.value)}
                      placeholder="Cremoso, saudável e rico em proteínas..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#1F3E29] bg-white"
                    />
                  </div>

                  {/* FOTO DO ITEM COM UPLOAD DIRETO */}
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#1F3E29] flex items-center gap-1.5">
                        <ImageIcon size={14} />
                        <span>Foto do Produto para a Vitrine</span>
                      </span>
                      {prodImageUrl && (
                        <button
                          type="button"
                          onClick={() => setProdImageUrl('')}
                          className="text-[11px] text-red-600 hover:underline cursor-pointer"
                        >
                          Remover foto
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {prodImageUrl ? (
                        <img
                          src={prodImageUrl}
                          alt="Preview do produto"
                          className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400 shrink-0 text-[10px] text-center px-1">
                          Sem foto
                        </div>
                      )}

                      <div className="flex-1 space-y-1.5">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold cursor-pointer transition-colors border border-stone-200">
                          <Upload size={13} />
                          <span>Enviar Foto do Computador</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleGenericFileUpload(e, (url) => setProdImageUrl(url))
                            }
                          />
                        </label>

                        <div>
                          <input
                            type="url"
                            value={prodImageUrl}
                            onChange={(e) => setProdImageUrl(e.target.value)}
                            placeholder="Ou cole a URL direta da foto (https://...)"
                            className="w-full px-2.5 py-1 text-[11px] rounded-lg border border-stone-300 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LINKS DE PEDIDO */}
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-2.5">
                    <span className="font-bold text-xs text-[#1F3E29] block">
                      Links de Pedido Deste Item por Plataforma:
                    </span>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                        <TomatiIcon size={14} variant="dark" />
                        <span>Link de Pedido na Loja Tomati</span>
                      </label>
                      <input
                        type="url"
                        value={prodPortalLink}
                        onChange={(e) => setProdPortalLink(e.target.value)}
                        placeholder="https://pedido.tomati.com.br/produto/..."
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#1F3E29]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                        <IfoodIcon size={14} />
                        <span>Link de Pedido no iFood</span>
                      </label>
                      <input
                        type="url"
                        value={prodIfoodLink}
                        onChange={(e) => setProdIfoodLink(e.target.value)}
                        placeholder="https://www.ifood.com.br/delivery/..."
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsEditingProduct(false)}
                      className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-200 rounded-xl cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Check size={14} />
                      <span>{editingProductId ? 'Salvar Alterações' : 'Adicionar à Vitrine'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 4: HORÁRIOS, FONE & ATENDIMENTO CURITIBA               */}
          {/* ========================================================= */}
          {activeTab === 'hours-contact' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-stone-200 space-y-1">
                <h4 className="font-bold text-xs sm:text-sm text-[#1F3E29] flex items-center gap-2">
                  <Clock size={16} className="text-[#CF7A23]" />
                  <span>Horários de Funcionamento, Telefone e Entregas</span>
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Atualize os horários da loja e entregas, telefone de atendimento em Curitiba e links de pedido.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3.5 shadow-2xs">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                    <Clock size={14} className="text-[#D44A22]" />
                    <span>Horário de Funcionamento da Loja</span>
                  </label>
                  <input
                    type="text"
                    value={formData.workingHours}
                    onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                    placeholder="Segunda a Sábado: 08h às 21h · Domingo: 09h às 18h"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#1F3E29] bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                    <Clock size={14} className="text-[#2D583B]" />
                    <span>Horário das Entregas</span>
                  </label>
                  <input
                    type="text"
                    value={formData.deliveryHours || 'Segunda a Sábado: 08h30 às 20h30 · Domingo: 09h às 17h30'}
                    onChange={(e) => setFormData({ ...formData, deliveryHours: e.target.value })}
                    placeholder="Segunda a Sábado: 08h30 às 20h30 · Domingo: 09h às 17h30"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#1F3E29] bg-stone-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                      <Phone size={14} className="text-[#1F3E29]" />
                      <span>Telefone Oficial / SAC</span>
                    </label>
                    <input
                      type="text"
                      value={formData.phone || formData.whatsappNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                          whatsappNumber: e.target.value,
                        })
                      }
                      placeholder="(41) 99999-8888"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#D44A22]" />
                      <span>Cidade / Localização</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Curitiba - PR · Entrega Expressa via iFood e Loja Tomati"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none bg-stone-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                    <MapPin size={14} className="text-[#2D583B]" />
                    <span>Resumo das Regiões Atendidas em Curitiba</span>
                  </label>
                  <input
                    type="text"
                    value={formData.deliveryRegions}
                    onChange={(e) => setFormData({ ...formData, deliveryRegions: e.target.value })}
                    placeholder="Curitiba (Batel, Bigorrilho, Ecoville, Cabral, Juvevê, Água Verde, Mercês e Região)"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none bg-stone-50"
                  />
                </div>
              </div>

              {/* Links Gerais dos Canais */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-2xs">
                <span className="font-bold text-xs text-[#1F3E29] uppercase tracking-wider block">
                  Links Globais das Plataformas
                </span>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                    <TomatiIcon size={14} variant="dark" />
                    <span>Link Geral da Loja Tomati</span>
                  </label>
                  <input
                    type="url"
                    value={formData.portalUrl}
                    onChange={(e) => setFormData({ ...formData, portalUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                    <IfoodIcon size={14} />
                    <span>Link Geral no iFood</span>
                  </label>
                  <input
                    type="url"
                    value={formData.ifoodUrl}
                    onChange={(e) => setFormData({ ...formData, ifoodUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none bg-stone-50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 5: REDES SOCIAIS & VÍDEOS / REELS DO INSTAGRAM        */}
          {/* ========================================================= */}
          {activeTab === 'social-videos' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-pink-50/60 border border-pink-200 space-y-1">
                <h4 className="font-bold text-xs sm:text-sm text-pink-950 flex items-center gap-2">
                  <Instagram size={16} className="text-pink-600" />
                  <span>Links das Redes Sociais & Como Funcionam os Vídeos</span>
                </h4>
                <p className="text-xs text-pink-900 leading-relaxed">
                  No site, as redes sociais aparecem com <strong>apenas os ícones oficiais</strong> no cabeçalho e rodapé.
                </p>
              </div>

              {/* Links de Redes Sociais */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-2xs">
                <span className="font-bold text-xs text-stone-700 uppercase tracking-wider block">
                  Links Oficiais dos Perfis
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Link do Instagram (URL)
                    </label>
                    <input
                      type="url"
                      value={formData.instagramUrl}
                      onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                      placeholder="https://instagram.com/tomati.oficial"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Link do TikTok (URL)
                    </label>
                    <input
                      type="url"
                      value={formData.tiktokUrl}
                      onChange={(e) => setFormData({ ...formData, tiktokUrl: e.target.value })}
                      placeholder="https://tiktok.com/@tomati.br"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none bg-stone-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Link Direto do WhatsApp (com mensagem pronta)
                  </label>
                  <input
                    type="url"
                    value={formData.whatsappUrl}
                    onChange={(e) => setFormData({ ...formData, whatsappUrl: e.target.value })}
                    placeholder="https://wa.me/5541999998888?text=..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none bg-stone-50"
                  />
                </div>
              </div>

              {/* Explicação e Gerenciador de Vídeos/Reels */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-bold text-xs text-[#1F3E29] uppercase tracking-wider flex items-center gap-1.5">
                    <Play size={14} className="text-[#D44A22]" />
                    <span>Vídeos e Reels em Destaque na Comunidade</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setIsAddingVideo(!isAddingVideo)}
                    className="px-3 py-1.5 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={13} />
                    <span>{isAddingVideo ? 'Fechar' : 'Novo Vídeo / Reel'}</span>
                  </button>
                </div>

                {/* Ajuda sobre a busca dos vídeos do Instagram */}
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-950">
                    <HelpCircle size={14} />
                    <span>Como funcionam os vídeos do Instagram no site?</span>
                  </div>
                  <p className="leading-relaxed text-[11px]">
                    O Instagram (Meta) não fornece uma API pública para exibir feeds sem um cadastro complexo de desenvolvedor do Facebook que exige renovação a cada 60 dias. Por isso, a forma profissional e recomendada é:
                    <br />
                    1. <strong>Cole o link do seu Reel</strong> (ex: <code className="bg-white/80 px-1 py-0.5 rounded">https://instagram.com/reel/...</code>)
                    <br />
                    2. <strong>Envie a foto de capa (thumbnail)</strong> do vídeo ou receita.
                    <br />
                    Ao clicar no card, o visitante assiste diretamente ao vídeo com engajamento total no seu perfil!
                  </p>
                </div>

                {/* Formulário para Adicionar Vídeo */}
                {isAddingVideo && (
                  <form onSubmit={handleAddVideo} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Título ou Dica do Vídeo
                      </label>
                      <input
                        type="text"
                        required
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                        placeholder="Ex: Como fazer panqueca proteica com Hey! Mu em 5 minutos"
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Link do Reel ou Vídeo *
                        </label>
                        <input
                          type="url"
                          required
                          value={videoLink}
                          onChange={(e) => setVideoLink(e.target.value)}
                          placeholder="https://instagram.com/reel/..."
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Etiqueta / Tag
                        </label>
                        <input
                          type="text"
                          value={videoTag}
                          onChange={(e) => setVideoTag(e.target.value)}
                          placeholder="Receita, Café, Dica..."
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Foto de Capa do Vídeo (Thumbnail)
                      </label>
                      <div className="flex items-center gap-2">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold cursor-pointer border border-stone-300">
                          <Upload size={13} />
                          <span>Upload da Capa</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleGenericFileUpload(e, (url) => setVideoCoverUrl(url))
                            }
                          />
                        </label>

                        <input
                          type="url"
                          placeholder="Ou link da imagem da capa..."
                          value={videoCoverUrl}
                          onChange={(e) => setVideoCoverUrl(e.target.value)}
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <Check size={14} />
                        <span>Salvar Vídeo</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Lista de Vídeos Cadastrados */}
                <div className="space-y-2 pt-1">
                  {(formData.communityPosts || []).map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-[#1F3E29] text-white flex items-center justify-center shrink-0">
                          <Play size={15} />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-xs text-stone-800 block truncate">
                            {video.title}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono block truncate">
                            {video.link}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteVideo(video.id)}
                        className="text-stone-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
                        title="Excluir vídeo"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 6: COMO PUBLICAR COM DOMÍNIO PRÓPRIO (EX: JUSTGO)      */}
          {/* ========================================================= */}
          {activeTab === 'online' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <h4 className="font-bold text-xs sm:text-sm text-emerald-950 flex items-center gap-2">
                  <Globe size={16} className="text-emerald-700" />
                  <span>Publicação Online com Domínio Próprio (Como no JustGo)</span>
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Veja exatamente como apontar seu domínio próprio (ex: <strong>tomati.com.br</strong> ou <strong>seudominio.com.br</strong>) e colocar o site no ar 100% gratuito.
                </p>
              </div>

              {/* Configuração do Seu Domínio */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-2xs">
                <span className="font-bold text-xs text-[#1F3E29] uppercase tracking-wider block">
                  Definir Seu Domínio Próprio
                </span>

                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <div className="relative flex-1 w-full">
                    <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Ex: tomati.com.br ou www.tomati.com.br"
                      value={customDomainInput}
                      onChange={(e) => setCustomDomainInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#1F3E29] bg-stone-50 font-mono font-semibold"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, customDomain: customDomainInput.trim() });
                      onSaveConfig({ ...formData, customDomain: customDomainInput.trim() });
                      setSavedNotice(true);
                      setTimeout(() => setSavedNotice(false), 2500);
                    }}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Save size={13} />
                    <span>Salvar Domínio</span>
                  </button>
                </div>
              </div>

              {/* Tabela de Apontamento DNS no Registro.br / Provedor */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1F3E29] uppercase tracking-wider block">
                    Apontamento DNS no seu Provedor (Registro.br / Hostinger / GoDaddy)
                  </span>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    SSL Grátis Automático
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  No painel onde você comprou seu domínio (ex: Registro.br), clique em <strong>Editar Zona DNS</strong> e adicione estes dois registros:
                </p>

                <div className="overflow-x-auto rounded-xl border border-stone-200">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                      <tr>
                        <th className="p-2.5">Tipo</th>
                        <th className="p-2.5">Nome / Host</th>
                        <th className="p-2.5">Destino / Valor</th>
                        <th className="p-2.5">TTL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 font-mono text-[11px]">
                      <tr className="bg-white">
                        <td className="p-2.5 font-bold text-[#D44A22]">A</td>
                        <td className="p-2.5 font-bold text-stone-800">@</td>
                        <td className="p-2.5 text-stone-900 font-bold flex items-center justify-between gap-2">
                          <span>76.76.21.21</span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText('76.76.21.21');
                              setDomainCopied(true);
                              setTimeout(() => setDomainCopied(false), 2000);
                            }}
                            className="text-stone-400 hover:text-stone-700 cursor-pointer"
                            title="Copiar IP"
                          >
                            <Copy size={12} />
                          </button>
                        </td>
                        <td className="p-2.5 text-stone-500">Padrão</td>
                      </tr>
                      <tr className="bg-stone-50/50">
                        <td className="p-2.5 font-bold text-[#1F3E29]">CNAME</td>
                        <td className="p-2.5 font-bold text-stone-800">www</td>
                        <td className="p-2.5 text-stone-900 font-bold flex items-center justify-between gap-2">
                          <span>cname.vercel-dns.com</span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText('cname.vercel-dns.com');
                              setDomainCopied(true);
                              setTimeout(() => setDomainCopied(false), 2000);
                            }}
                            className="text-stone-400 hover:text-stone-700 cursor-pointer"
                            title="Copiar CNAME"
                          >
                            <Copy size={12} />
                          </button>
                        </td>
                        <td className="p-2.5 text-stone-500">Padrão</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {domainCopied && (
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <Check size={12} /> Valor copiado para a área de transferência!
                  </span>
                )}
              </div>

              {/* Passo a Passo Exato como no JustGo */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-2xs">
                <span className="font-bold text-xs text-[#1F3E29] uppercase tracking-wider block">
                  Como fazer a publicação (Igual ao JustGo):
                </span>

                <div className="space-y-2.5 text-xs text-stone-700 leading-relaxed">
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="w-5 h-5 rounded-full bg-[#1F3E29] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                      1
                    </span>
                    <div>
                      <strong className="block text-stone-900">Conecte o projeto na Vercel (100% Gratuito):</strong>
                      <span>Acesse <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold underline">vercel.com</a>, clique em <strong>Add New &gt; Project</strong> e conecte o repositório deste projeto. A Vercel compila o React automaticamente via <code className="bg-white px-1 rounded text-[10px]">npm run build</code>.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="w-5 h-5 rounded-full bg-[#1F3E29] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                      2
                    </span>
                    <div>
                      <strong className="block text-stone-900">Adicione seu Domínio Próprio na Vercel:</strong>
                      <span>Dentro do projeto na Vercel, vá em <strong>Settings &gt; Domains</strong> e digite seu domínio (ex: <code className="bg-white px-1 rounded text-[10px]">{customDomainInput || 'tomati.com.br'}</code>).</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="w-5 h-5 rounded-full bg-[#1F3E29] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                      3
                    </span>
                    <div>
                      <strong className="block text-stone-900">Apontamento no Registro.br e Liberação do SSL:</strong>
                      <span>Assim que você salvar os registros DNS acima no Registro.br, o certificado HTTPS (cadeado verde) é emitido automaticamente em até alguns minutos e seu site fica disponível publicamente no seu domínio próprio!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 7: MINHA CONTA, SENHA E SEGURANÇA                     */}
          {/* ========================================================= */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3.5 shadow-2xs">
                <span className="font-bold text-xs text-[#1F3E29] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#2D583B]" />
                  <span>Dados da Minha Conta de Administrador</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nome do Administrador
                    </label>
                    <input
                      type="text"
                      value={editAdminName}
                      onChange={(e) => setEditAdminName(e.target.value)}
                      placeholder="Seu Nome"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      E-mail Cadastrado
                    </label>
                    <input
                      type="email"
                      value={editAdminEmail}
                      onChange={(e) => setEditAdminEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none bg-stone-50"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Alterar Senha do Painel:
                  </label>
                  <input
                    type="text"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="Digite a nova senha..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 focus:outline-none focus:border-amber-600 bg-white font-mono"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    Ao alterar, você usará essa nova senha na próxima vez que fizer login.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé Fixo do Modal com Botões de Ação */}
        <div className="p-3 px-4 sm:px-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Deseja restaurar as marcas e vitrine originais da Tomati?')) {
                onResetAll();
                setFormData(DEFAULT_STORE_CONFIG);
                setProductList(DEFAULT_PRODUCTS);
                onClose();
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            <span className="hidden sm:inline">Restaurar Originais</span>
          </button>

          <div className="flex items-center gap-3">
            {savedNotice && (
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 animate-fade-in">
                <Check size={14} /> Salvo com sucesso!
              </span>
            )}
            <button
              onClick={handleSaveAll}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer"
            >
              <Save size={14} />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
