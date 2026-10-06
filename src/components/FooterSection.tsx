import React from 'react';
import { StoreConfig, PageView } from '../types';
import { TomatiLogo, TomatiIcon } from './TomatiLogo';
import { IfoodIcon } from './IfoodIcon';
import { ArrowRight, Instagram, MessageCircle, MapPin, Clock, Phone, Settings } from 'lucide-react';

interface FooterSectionProps {
  config: StoreConfig;
  onNavigate: (page: PageView) => void;
  onOpenOrderModal: () => void;
  onOpenConfigModal: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  config,
  onNavigate,
  onOpenConfigModal,
}) => {
  return (
    <footer className="bg-[#14281B] text-[#F3EFE6] border-t border-[#1F3E29]">
      {/* Pre-footer Closing Callout */}
      <div className="border-b border-white/10 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#D44A22]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D44A22]" />
            <span>Tomati. | mais perto, mais fácil.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D44A22]" />
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-[1.15] text-balance">
            Mais energia, bem-estar e sabor para sua rotina hoje.
          </h2>

          <p className="text-sm sm:text-base text-[#F3EFE6]/80 max-w-xl mx-auto font-normal">
            Peça agora mesmo na Loja Tomati ou pelo iFood e receba sua seleção de saudabilidade em minutos.
          </p>

          {/* Dual Closing CTAs with Official Icons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={config.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-[#1F3E29] hover:bg-[#254F33] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md border border-white/20"
            >
              <TomatiIcon
                size={20}
                variant="light"
                customLightUrl={config.iconLightBgUrl}
                customDarkUrl={config.iconDarkBgUrl}
              />
              <span>Loja Tomati</span>
              <ArrowRight size={14} className="text-[#A7D7B5]" />
            </a>

            <a
              href={config.ifoodUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-white/10 hover:bg-[#EA1D2C] text-white text-xs sm:text-sm font-bold tracking-wide border border-white/20 transition-all"
            >
              <IfoodIcon size={20} customLogoUrl={config.ifoodLogoUrl} />
              <span>Pedir no iFood</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-8 border-b border-white/10">
          {/* Brand info (Span 4) */}
          <div className="lg:col-span-4 space-y-3">
            <TomatiLogo
              variant="light"
              size="lg"
              customLightBgUrl={config.logoLightBgUrl}
              customDarkBgUrl={config.logoDarkBgUrl}
            />
            <p className="text-xs sm:text-sm text-[#F3EFE6]/70 leading-relaxed max-w-sm">
              Sua loja de saudabilidade com o equilíbrio perfeito entre suplementação, nutrição e sabor.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                title="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href={config.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                title="TikTok"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.87-4.49V8.71a8.21 8.21 0 0 0 4.9 1.6v-3.5a4.85 4.85 0 0 1-1-.12z" />
                </svg>
              </a>
              <a
                href={config.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                title="WhatsApp"
              >
                <MessageCircle size={15} className="text-[#25D366]" />
              </a>
            </div>
          </div>

          {/* Região Atendida (Span 3) */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="text-xs uppercase font-mono tracking-wider text-white font-semibold flex items-center gap-1.5">
              <MapPin size={13} className="text-[#D44A22]" /> Entrega em Curitiba
            </h4>
            <p className="text-xs text-[#F3EFE6]/80 leading-relaxed">
              {config.deliveryRegions}
            </p>
            <div className="pt-1">
              <button
                onClick={() => onNavigate('where-to-buy')}
                className="text-xs text-[#A7D7B5] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Consultar bairros atendidos</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Horários & Contato (Span 3) */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="text-xs uppercase font-mono tracking-wider text-white font-semibold flex items-center gap-1.5">
              <Clock size={13} className="text-[#D44A22]" /> Horários de Envio
            </h4>
            <p className="text-xs text-[#F3EFE6]/80 leading-relaxed">
              {config.workingHours}
            </p>
            {config.deliveryHours && (
              <p className="text-[11px] text-[#A7D7B5] leading-relaxed">
                Entregas: {config.deliveryHours}
              </p>
            )}
            <div className="pt-1">
              <span className="block text-[11px] text-white/50">Telefone & WhatsApp oficial:</span>
              <a
                href={config.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#F3EFE6] hover:text-[#D44A22] font-semibold flex items-center gap-1 mt-0.5"
              >
                <Phone size={12} />
                <span>{config.phone || config.whatsappNumber}</span>
              </a>
            </div>
          </div>

          {/* Navegação 2 Páginas (Span 2) */}
          <div className="lg:col-span-2 space-y-2">
            <h4 className="text-xs uppercase font-mono tracking-wider text-white font-semibold">
              Páginas
            </h4>
            <ul className="space-y-1.5 text-xs text-[#F3EFE6]/70">
              <li>
                <button
                  onClick={() => onNavigate('store')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  1. Loja & Produtos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('where-to-buy')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  2. Onde Comprar (Portal & iFood)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenConfigModal}
                  className="hover:text-white transition-colors text-left flex items-center gap-1 text-[11px] text-white/50 pt-1 cursor-pointer"
                >
                  <Settings size={12} />
                  <span>Painel Administrativo</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#F3EFE6]/50">
          <p>© {new Date().getFullYear()} Tomati. | mais perto, mais fácil. Todos os direitos reservados.</p>
          <div className="flex items-center gap-3">
            <a href={config.portalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Loja Tomati
            </a>
            <span>·</span>
            <a href={config.ifoodUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              iFood
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
