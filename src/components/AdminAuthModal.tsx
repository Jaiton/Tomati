import React, { useState, useEffect } from 'react';
import { TomatiLogo } from './TomatiLogo';
import { X, Lock, LogIn, UserPlus, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  logoUrl?: string;
}

export const AUTH_TOKEN_KEY = 'tomati_admin_session_v1';

const memoryAuthStore = new Map<string, string>();
export const safeAuthStorage = {
  getItem: (key: string): string | null => {
    try {
      const v = window.localStorage.getItem(key);
      if (v !== null) return v;
    } catch {}
    try {
      const v = window.sessionStorage.getItem(key);
      if (v !== null) return v;
    } catch {}
    return memoryAuthStore.get(key) ?? null;
  },
  setItem: (key: string, value: string) => {
    memoryAuthStore.set(key, value);
    try {
      window.localStorage.setItem(key, value);
    } catch {}
    try {
      window.sessionStorage.setItem(key, value);
    } catch {}
  },
  removeItem: (key: string) => {
    memoryAuthStore.delete(key);
    try {
      window.localStorage.removeItem(key);
    } catch {}
    try {
      window.sessionStorage.removeItem(key);
    } catch {}
  },
};

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  logoUrl,
}) => {
  const [tab, setTab] = useState<'login' | 'register' | 'reset'>('login');
  const [canRegister, setCanRegister] = useState(true);

  // Estados de Login
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Estados de Cadastro
  const [regName, setRegName] = useState('');
  const [regUser, setRegUser] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regPassConfirm, setRegPassConfirm] = useState('');

  // Estados de Redefinição
  const [resetUser, setResetUser] = useState('admin');
  const [resetPass, setResetPass] = useState('');
  const [resetPassConfirm, setResetPassConfirm] = useState('');

  // Estados de Carregamento e Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Verificar se o cadastro inicial está liberado
  useEffect(() => {
    if (isOpen) {
      fetch('/api/admin/setup-status')
        .then((r) => r.json())
        .then((d) => {
          if (typeof d?.canRegister === 'boolean') {
            setCanRegister(d.canRegister);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  // Fechar com a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Limpar formulário e mensagens ao alternar aba
  useEffect(() => {
    setErrorMsg('');
    setSuccessMsg('');
  }, [tab, isOpen]);

  if (!isOpen) return null;

  // Acesso Direto de Emergência / Mestre (garante que o proprietário NUNCA fique bloqueado)
  const handleMasterAccess = async () => {
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/admin/master-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const sessionPayload = JSON.stringify({
          token: data.token,
          user: data.user?.username || 'admin',
          name: data.user?.name || 'Administrador Tomati',
          loggedAt: Date.now(),
        });
        safeAuthStorage.removeItem(AUTH_TOKEN_KEY);
        safeAuthStorage.setItem(AUTH_TOKEN_KEY, sessionPayload);
        setSuccessMsg('✅ Acesso autorizado! Abrindo o painel da loja...');
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess();
        }, 300);
        return;
      }
      setErrorMsg(data.message || 'Falha ao acessar.');
    } catch {
      setErrorMsg('Não foi possível conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanUser = resetUser.trim().toLowerCase();
    const cleanPass = resetPass.trim();

    if (!cleanUser || !cleanPass) {
      setErrorMsg('Informe o usuário e a nova senha.');
      return;
    }

    if (cleanPass.length < 4) {
      setErrorMsg('A nova senha deve ter no mínimo 4 caracteres.');
      return;
    }

    if (cleanPass !== resetPassConfirm.trim()) {
      setErrorMsg('As senhas digitadas não conferem.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/reset-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, newPassword: cleanPass }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const sessionPayload = JSON.stringify({
          token: data.token,
          user: data.user?.username || cleanUser,
          name: data.user?.name || cleanUser,
          loggedAt: Date.now(),
        });
        safeAuthStorage.removeItem(AUTH_TOKEN_KEY);
        safeAuthStorage.setItem(AUTH_TOKEN_KEY, sessionPayload);
        setSuccessMsg('✅ Nova senha salva! Entrando no painel...');
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess();
        }, 350);
        return;
      }
      setErrorMsg(data.message || 'Falha ao atualizar senha.');
    } catch {
      setErrorMsg('Erro de conexão ao redefinir senha.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanUser = loginUser.trim().toLowerCase();
    const cleanPass = loginPass.trim();

    if (!cleanUser || !cleanPass) {
      setErrorMsg('Por favor, preencha seu usuário e senha.');
      return;
    }

    setIsLoading(true);
    try {
      // 1. Tentar autenticação no Servidor
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, password: cleanPass }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const sessionPayload = JSON.stringify({
          token: data.token,
          user: data.user?.username || cleanUser,
          name: data.user?.name,
          loggedAt: Date.now(),
        });

        // Grava sessão de forma segura (funciona mesmo com restrições de iframe/cookies)
        safeAuthStorage.removeItem(AUTH_TOKEN_KEY);
        safeAuthStorage.setItem(AUTH_TOKEN_KEY, sessionPayload);

        setSuccessMsg('Autenticado com sucesso! Entrando no painel...');
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess();
        }, 300);
        return;
      }

      setErrorMsg(data.message || 'Usuário ou senha incorretos.');
    } catch {
      setErrorMsg('Não foi possível conectar ao servidor. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanName = regName.trim();
    const cleanUser = regUser.trim().toLowerCase();
    const cleanPass = regPass.trim();

    if (!cleanName || !cleanUser || !cleanPass) {
      setErrorMsg('Preencha todos os campos obrigatórios.');
      return;
    }

    if (cleanPass.length < 6) {
      setErrorMsg('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (cleanPass !== regPassConfirm.trim()) {
      setErrorMsg('As senhas digitadas não conferem.');
      return;
    }

    setIsLoading(true);
    try {
      // Obter token de sessão ativa (apenas admins logados podem criar outros admins)
      let activeToken = '';
      try {
        const raw = safeAuthStorage.getItem(AUTH_TOKEN_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          activeToken = parsed.token || '';
        }
      } catch {}

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (activeToken) {
        headers['Authorization'] = `Bearer ${activeToken}`;
      }

      const res = await fetch('/api/admin/register', {
        method: 'POST',
        headers,
        body: JSON.stringify({ username: cleanUser, password: cleanPass, name: cleanName }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.token) {
          const sessionPayload = JSON.stringify({
            token: data.token,
            user: data.user?.username || cleanUser,
            name: data.user?.name || cleanName,
            loggedAt: Date.now(),
          });
          safeAuthStorage.setItem(AUTH_TOKEN_KEY, sessionPayload);
          setSuccessMsg('✅ Administrador cadastrado com sucesso! Entrando no painel...');
          setTimeout(() => {
            setIsLoading(false);
            onLoginSuccess();
          }, 350);
          return;
        }

        setSuccessMsg('Novo administrador cadastrado com sucesso! Agora você pode fazer login.');
        setTimeout(() => {
          setIsLoading(false);
          setTab('login');
          setLoginUser(cleanUser);
          setLoginPass('');
        }, 1200);
        return;
      }

      setErrorMsg(data.message || data.error || 'Apenas administradores autenticados podem cadastrar novos usuários.');
    } catch {
      setErrorMsg('Erro ao conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Oficial Padrão do Sistema (Verde Escuro #14201A) */}
        <div className="py-3.5 px-4 sm:px-5 bg-[#14201A] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="logo shrink-0" style={{ flexShrink: 0, minWidth: 'max-content' }}>
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Tomati Oficial"
                  style={{ height: '32px', width: 'auto', display: 'block', flexShrink: 0 }}
                />
              ) : (
                <span className="text-white font-extrabold tracking-tight text-xl font-serif inline-flex items-center">
                  tomati<span className="text-[#FFC93C]">.</span>
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 border-l border-white/20 pl-2.5">
              Painel Seguro
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:rotate-90"
            title="Fechar (ESC)"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Corpo do Modal no Padrão Visual do Portal */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100/90 border border-red-200 text-[#D44A22] text-[11px] font-bold tracking-wide uppercase">
              <Lock size={12} className="shrink-0" />
              <span>Acesso Restrito ao Administrador</span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-[#1F3E29] pt-1">
              {tab === 'login' ? 'Identificação do Administrador' : 'Cadastrar Novo Administrador'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Área restrita para edição de vitrine, fotos e configurações da loja.
            </p>
          </div>

          {/* Abas Discretas de Navegação */}
          <div className="grid grid-cols-3 p-1 bg-stone-200/70 rounded-2xl border border-stone-200/80 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTab('login')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl transition-all ${
                tab === 'login'
                  ? 'bg-[#1F3E29] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
              }`}
            >
              <LogIn size={13} />
              <span>Login</span>
            </button>
            <button
              type="button"
              onClick={() => setTab('register')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl transition-all ${
                tab === 'register'
                  ? 'bg-[#1F3E29] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
              }`}
            >
              <UserPlus size={13} />
              <span>Cadastrar</span>
            </button>
            <button
              type="button"
              onClick={() => setTab('reset')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl transition-all ${
                tab === 'reset'
                  ? 'bg-[#1F3E29] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
              }`}
            >
              <Lock size={13} />
              <span>Nova Senha</span>
            </button>
          </div>

          {/* Feedback de Erro ou Sucesso */}
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5 animate-in fade-in">
              <ShieldAlert size={16} className="text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {/* Botão de 1 Clique Mestre - Garante acesso imediato */}
              <button
                type="button"
                onClick={handleMasterAccess}
                disabled={isLoading}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer border border-emerald-500"
              >
                <span>⚡ Entrar Direto (Acesso Mestre 1-Clique)</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-stone-300"></div>
                <span className="flex-shrink mx-3 text-[11px] text-stone-500 uppercase font-semibold">ou digite seus dados</span>
                <div className="flex-grow border-t border-stone-300"></div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Usuário ou E-mail
                </label>
                <input
                  type="text"
                  required
                  placeholder="admin ou seu e-mail"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#1F3E29] focus:ring-1 focus:ring-[#1F3E29] shadow-2xs transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  required
                  placeholder="Digite sua senha"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#1F3E29] focus:ring-1 focus:ring-[#1F3E29] shadow-2xs transition-all"
                />
              </div>

              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setLoginUser('admin');
                    setLoginPass('tomati@2026');
                    setErrorMsg('');
                  }}
                  className="w-full py-1.5 px-3 text-[11px] font-semibold rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors flex items-center justify-center gap-1 cursor-pointer text-center"
                >
                  <span>🔑 Preencher admin / tomati@2026</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-full bg-[#1F3E29] hover:bg-[#162d1e] text-white font-bold text-sm transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>Verificando...</span>
                ) : (
                  <>
                    <LogIn size={16} />
                    <span>Login</span>
                  </>
                )}
              </button>
            </form>
          ) : tab === 'register' ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nome do Administrador
                </label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#1F3E29] focus:ring-1 focus:ring-[#1F3E29] shadow-2xs transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Usuário ou E-mail
                </label>
                <input
                  type="text"
                  required
                  placeholder="exemplo@tomatibrasil.com.br"
                  value={regUser}
                  onChange={(e) => setRegUser(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#1F3E29] focus:ring-1 focus:ring-[#1F3E29] shadow-2xs transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  required
                  placeholder="Crie sua senha (mínimo 4 caracteres)"
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#1F3E29] focus:ring-1 focus:ring-[#1F3E29] shadow-2xs transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  required
                  placeholder="Repita a senha digitada"
                  value={regPassConfirm}
                  onChange={(e) => setRegPassConfirm(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#1F3E29] focus:ring-1 focus:ring-[#1F3E29] shadow-2xs transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2.5 py-3 px-4 rounded-full bg-[#1F3E29] hover:bg-[#162d1e] text-white font-bold text-sm transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>Salvando cadastro...</span>
                ) : (
                  <>
                    <UserPlus size={15} />
                    <span>Cadastrar Administrador</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetSubmit} className="space-y-3">
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                Defina aqui o usuário e a senha que você preferir usar no sistema.
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Usuário ou E-mail
                </label>
                <input
                  type="text"
                  required
                  placeholder="admin ou seu e-mail"
                  value={resetUser}
                  onChange={(e) => setResetUser(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#1F3E29] focus:ring-1 focus:ring-[#1F3E29] shadow-2xs transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nova Senha Desejada
                </label>
                <input
                  type="password"
                  required
                  placeholder="Digite sua nova senha"
                  value={resetPass}
                  onChange={(e) => setResetPass(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#1F3E29] focus:ring-1 focus:ring-[#1F3E29] shadow-2xs transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  required
                  placeholder="Repita a nova senha"
                  value={resetPassConfirm}
                  onChange={(e) => setResetPassConfirm(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#1F3E29] focus:ring-1 focus:ring-[#1F3E29] shadow-2xs transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2.5 py-3 px-4 rounded-full bg-[#1F3E29] hover:bg-[#162d1e] text-white font-bold text-sm transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>Salvando nova senha...</span>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>Salvar Nova Senha e Entrar</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
