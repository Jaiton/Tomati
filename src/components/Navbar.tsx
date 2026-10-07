import React, { useState } from 'react';
import { TomatiLogo } from './TomatiLogo';
import { StoreConfig, PageView } from '../types';
import { Menu, X, ArrowRight, Instagram, ShoppingBag, MapPin, Settings } from 'lucide-react';

interface NavbarProps {
  config: StoreConfig;
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenOrderModal: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  currentPage,
  onNavigate,
  onOpenOrderModal,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Zone 1: Pure Logotype (Sem caixas ou retângulos, 40% maior) + Slogan Oficial Restaurado */}
          <div id="nav-logo-container" className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('store')}
              className="group flex items-center focus:outline-none text-left cursor-pointer transition-transform hover:scale-[1.01]"
              aria-label="Tomati. - Página Inicial"
            >
              <TomatiLogo
                size="lg"
                customLightBgUrl={config.logoLightBgUrl}
                customDarkBgUrl={config.logoDarkBgUrl}
              />
            </button>

            {/* Barra vertical divisora e Slogan (mais perto, mais fácil.) */}
            <span className="hidden sm:inline-block h-6 w-px bg-stone-300" aria-hidden="true" />

            <div className="hidden sm:flex flex-col">
              <span className="text-[11px] sm:text-xs font-mono font-medium text-stone-600 tracking-tight lowercase">
                mais perto, mais fácil.
              </span>
            </div>
          </div>

          {/* Zone 2: Redes Sociais Restauradas + Ações do Topo */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Ícones de Redes Sociais no Cabeçalho (Instagram e TikTok) visíveis no celular e desktop */}
            <div className="flex items-center gap-1 sm:gap-1.5 border-r border-stone-200/80 pr-2 sm:pr-3">
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-[#D44A22] flex items-center justify-center transition-colors cursor-pointer"
                title="Instagram @tomatibrasil"
                aria-label="Instagram da Tomati"
              >
                <Instagram size={15} />
              </a>
              <a
                href={config.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                title="TikTok @tomatibrasil"
                aria-label="TikTok da Tomati"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.87-4.49V8.71a8.21 8.21 0 0 0 4.9 1.6v-3.5a4.85 4.85 0 0 1-1-.12z" />
                </svg>
              </a>
            </div>

            {/* Quick Order Button */}
            <button
              onClick={onOpenOrderModal}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap"
            >
              <span>Fazer Pedido</span>
              <ArrowRight size={14} className="text-[#D44A22] hidden xs:inline" />
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 sm:top-18 z-30 bg-[#FBF9F5] border-b border-stone-300 shadow-xl px-6 py-6 space-y-4 animate-in slide-in-from-top-3">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('store');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl text-left font-semibold text-sm flex items-center justify-between ${
                currentPage === 'store' ? 'bg-[#1F3E29] text-white' : 'bg-white text-stone-800 border border-stone-200'
              }`}
            >
              <span>1. Loja & Produtos Saudáveis</span>
              <ShoppingBag size={16} />
            </button>

            <button
              onClick={() => {
                onNavigate('where-to-buy');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl text-left font-semibold text-sm flex items-center justify-between ${
                currentPage === 'where-to-buy' ? 'bg-[#1F3E29] text-white' : 'bg-white text-stone-800 border border-stone-200'
              }`}
            >
              <span>2. Onde Comprar (Loja Tomati & iFood)</span>
              <MapPin size={16} />
            </button>

            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl text-left font-semibold text-sm flex items-center justify-between bg-stone-100 text-stone-700"
            >
              <span>Painel Admin (Marcas & Links)</span>
              <Settings size={16} />
            </button>
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-stone-600">
              <a href={config.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
              <span>·</span>
              <a href={config.tiktokUrl} target="_blank" rel="noopener noreferrer">TikTok</a>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="px-4 py-2 rounded-full bg-[#1F3E29] text-white text-xs font-semibold"
            >
              Fazer Pedido
            </button>
          </div>
        </div>
      )}
    </>
  );
};
