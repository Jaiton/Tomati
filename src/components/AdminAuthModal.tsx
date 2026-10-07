import React, { useState, useEffect } from 'react';
import { Lock, UserPlus, LogIn, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

interface StoredAdmin {
  username: string;
  password: string;
  name: string;
}

const ADMIN_STORAGE_KEY = 'tomati_admin_users_v1';
const AUTH_TOKEN_KEY = 'tomati_admin_session_v1';

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  
  // Estados de Login
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  
  // Estados de Cadastro
  const [regName, setRegName] = useState('');
  const [regUser, setRegUser] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regPassConfirm, setRegPassConfirm] = useState('');
  
  // Feedback
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fechar com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Limpar mensagens ao alternar aba
  useEffect(() => {
    setErrorMsg('');
    setSuccessMsg('');
  }, [tab, isOpen]);

  if (!isOpen) return null;

  const getStoredAdmins = (): StoredAdmin[] => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignora erro
    }
    // Administrador padrão para acesso inicial seguro
    return [
      { username: 'admin', password: 'tomati2026', name: 'Administrador Tomati' },
      { username: 'admin@tomati.com.br', password: 'tomati2026', name: 'Administrador Tomati' },
      { username: 'admin', password: 'admin', name: 'Administrador Padrão' },
    ];
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanUser = loginUser.trim().toLowerCase();
    const cleanPass = loginPass.trim();

    if (!cleanUser || !cleanPass) {
      setErrorMsg('Preencha seu usuário e senha.');
      return;
    }

    const admins = getStoredAdmins();
    const found = admins.find(
      (a) => a.username.toLowerCase() === cleanUser && a.password === cleanPass
    );

    if (found) {
      if (rememberMe) {
        localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify({ user: found.username, loggedAt: Date.now() }));
      } else {
        sessionStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify({ user: found.username, loggedAt: Date.now() }));
      }
      setSuccessMsg('Autenticado com sucesso! Entrando...');
      setTimeout(() => {
        onLoginSuccess();
      }, 400);
    } else {
      setErrorMsg('Usuário ou senha incorretos. Verifique e tente novamente.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanName = regName.trim();
    const cleanUser = regUser.trim().toLowerCase();
    const cleanPass = regPass.trim();

    if (!cleanName || !cleanUser || !cleanPass) {
      setErrorMsg('Todos os campos são obrigatórios.');
      return;
    }

    if (cleanPass.length < 4) {
      setErrorMsg('A senha precisa ter pelo menos 4 dígitos.');
      return;
    }

    if (cleanPass !== regPassConfirm.trim()) {
      setErrorMsg('As senhas digitadas não coincidem.');
      return;
    }

    const admins = getStoredAdmins();
    if (admins.some((a) => a.username.toLowerCase() === cleanUser)) {
      setErrorMsg('Este usuário ou e-mail já está cadastrado.');
      return;
    }

    const updatedAdmins = [...admins, { username: cleanUser, password: cleanPass, name: cleanName }];
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updatedAdmins));
    } catch {
      // Falha silenciosa
    }

    localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify({ user: cleanUser, loggedAt: Date.now() }));
    setSuccessMsg('Novo administrador cadastrado com sucesso! Acessando...');
    setTimeout(() => {
      onLoginSuccess();
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-[#14201A] text-white rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Cabeçalho do Modal */}
        <div className="p-6 pb-4 border-b border-white/10 bg-[#0F3B2A]/70 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFC93C]/15 border border-[#FFC93C]/30 flex items-center justify-center shrink-0">
              <Lock size={19} className="text-[#FFC93C]" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white tracking-tight">
                Acesso Restrito ao Administrador
              </h3>
              <p className="text-xs text-white/60">
                Painel exclusivo para gerenciamento da loja
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Abas Discretas: Login x Cadastrar */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 p-1 bg-white/5 rounded-2xl border border-white/5">
            <button
              type="button"
              onClick={() => setTab('login')}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                tab === 'login'
                  ? 'bg-[#FFC93C] text-[#14201A] shadow-md'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <LogIn size={14} />
              Login
            </button>
            <button
              type="button"
              onClick={() => setTab('register')}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                tab === 'register'
                  ? 'bg-[#FFC93C] text-[#14201A] shadow-md'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserPlus size={14} />
              Cadastrar
            </button>
          </div>
        </div>

        {/* Formulários */}
        <div className="p-6 pt-4">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex items-center gap-2 animate-in fade-in">
              <ShieldAlert size={16} className="text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">
                  Usuário ou E-mail
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="admin"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#FFC93C] focus:ring-1 focus:ring-[#FFC93C] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#FFC93C] focus:ring-1 focus:ring-[#FFC93C] transition-all"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-white/60 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-white/20 bg-white/5 text-[#FFC93C] focus:ring-0"
                  />
                  <span>Lembrar neste aparelho</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[#FFC93C] hover:bg-[#ffcf53] text-[#14201A] font-bold text-sm transition-all shadow-lg hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <LogIn size={16} />
                Login
              </button>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-white/45">
                  Dica padrão: usuário <strong className="text-white/70">admin</strong> e senha <strong className="text-white/70">tomati2026</strong>
                </span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">
                  Nome do Administrador
                </label>
                <input
                  type="text"
                  required
                  placeholder="Seu Nome"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#FFC93C] focus:ring-1 focus:ring-[#FFC93C] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">
                  Usuário ou E-mail
                </label>
                <input
                  type="text"
                  required
                  placeholder="admin@tomati.com.br"
                  value={regUser}
                  onChange={(e) => setRegUser(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#FFC93C] focus:ring-1 focus:ring-[#FFC93C] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Criar Senha
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#FFC93C] focus:ring-1 focus:ring-[#FFC93C] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={regPassConfirm}
                    onChange={(e) => setRegPassConfirm(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#FFC93C] focus:ring-1 focus:ring-[#FFC93C] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-2.5 px-4 rounded-xl bg-[#FFC93C] hover:bg-[#ffcf53] text-[#14201A] font-bold text-sm transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <UserPlus size={16} />
                Cadastrar e Acessar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
