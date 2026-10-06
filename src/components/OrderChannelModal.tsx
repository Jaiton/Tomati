import React, { useEffect } from 'react';
import { StoreConfig } from '../types';
import { TomatiLogo, TomatiIcon } from './TomatiLogo';
import { IfoodIcon } from './IfoodIcon';
import { X, ExternalLink, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface OrderChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: StoreConfig;
  customProductTitle?: string;
  portalLinkOverride?: string;
  ifoodLinkOverride?: string;
}

export const OrderChannelModal: React.FC<OrderChannelModalProps> = ({
  isOpen,
  onClose,
  config,
  customProductTitle,
  portalLinkOverride,
  ifoodLinkOverride,
}) => {
  // Fechar com a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const targetPortalUrl = portalLinkOverride || config.portalUrl;
  const targetIfoodUrl = ifoodLinkOverride || config.ifoodUrl;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[85vh] sm:max-h-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header - Fixo com Botão X Sempre Visível e Acessível */}
        <div className="py-2.5 px-3.5 sm:px-4 border-b border-stone-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <TomatiLogo
              size="sm"
              customLightBgUrl={config.logoLightBgUrl}
              customDarkBgUrl={config.logoDarkBgUrl}
            />
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 border-l border-stone-300 pl-2">
              Canais Oficiais
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-all cursor-pointer hover:rotate-90"
            title="Fechar (ESC)"
            aria-label="Fechar modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body - Compacto, cabe 100% em qualquer monitor sem necessidade de zoom */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-3 flex-1">
          <div className="text-center sm:text-left space-y-0.5">
            <span className="text-[10px] font-bold text-[#D44A22] uppercase tracking-wider block">
              {customProductTitle ? `Pedir: ${customProductTitle}` : 'Seu pedido, do seu jeito'}
            </span>
            <h3 className="font-display text-base sm:text-xl font-bold text-[#1F3E29]">
              Onde você prefere fazer seu pedido?
            </h3>
            <p className="text-[11px] sm:text-xs text-stone-600 leading-tight">
              Escolha seu canal favorito: Loja Tomati ou pelo iFood.
            </p>
          </div>

          {/* Grid com 2 colunas no tablet/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-stretch">
            {/* Canal 1: Loja Tomati */}
            <div className="relative rounded-xl sm:rounded-2xl border-2 border-[#1F3E29] bg-gradient-to-br from-white to-[#F5F2EB] p-3 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between group">
              <div className="absolute -top-2 right-2.5 bg-[#1F3E29] text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                Recomendado
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <TomatiIcon
                    size={28}
                    variant="dark"
                    customLightUrl={config.iconLightBgUrl}
                    customDarkUrl={config.iconDarkBgUrl}
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm sm:text-base text-[#1F3E29] leading-tight">
                      Loja Tomati
                    </h4>
                    <span className="text-[9px] sm:text-[10px] text-stone-500 font-mono">pedido.tomati.com.br</span>
                  </div>
                </div>

                <p className="text-[11px] text-stone-600 leading-snug">
                  Catálogo integral com kits exclusivos e atendimento direto.
                </p>

                <div className="pt-0.5 flex items-center gap-1 text-[9px] sm:text-[10px] text-[#1F3E29] font-medium">
                  <ShieldCheck size={12} className="text-[#2D583B] shrink-0" />
                  <span>Pedido Direto · Lotes Frescos</span>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-stone-200/80">
                <a
                  href={targetPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg sm:rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs font-bold tracking-wide transition-all shadow-xs group-hover:shadow"
                >
                  <span>Acessar Loja Tomati</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>

            {/* Canal 2: iFood */}
            <div className="rounded-xl sm:rounded-2xl border border-stone-300 bg-white p-3 hover:border-red-300 hover:shadow-2xs transition-all flex flex-col justify-between group">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                    <IfoodIcon size={18} customLogoUrl={config.ifoodLogoUrl} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm sm:text-base text-stone-900 leading-tight">
                      Tomati no iFood
                    </h4>
                    <span className="text-[9px] sm:text-[10px] text-stone-400 font-mono">ifood.com.br</span>
                  </div>
                </div>

                <p className="text-[11px] text-stone-600 leading-snug">
                  Praticidade no aplicativo iFood com entrega expressa nos bairros de Curitiba.
                </p>

                <div className="pt-0.5 text-[9px] sm:text-[10px] text-stone-500">
                  <span>Entrega rápida no app iFood</span>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-stone-100">
                <a
                  href={targetIfoodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg sm:rounded-xl bg-stone-100 hover:bg-[#EA1D2C] text-stone-800 hover:text-white text-xs font-bold tracking-wide transition-all"
                >
                  <span>Pedir no iFood</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Rodapé do Modal com WhatsApp e link para fechar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-1.5 border-t border-stone-200/60 text-[11px]">
            <a
              href={config.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-[#1F3E29] transition-colors"
            >
              <MessageCircle size={13} className="text-[#25D366]" />
              <span>Dúvidas? Fale conosco no WhatsApp</span>
            </a>

            <button
              onClick={onClose}
              className="text-stone-500 hover:text-stone-800 underline cursor-pointer text-[11px]"
            >
              Fechar modal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
