import React, { useEffect } from 'react';
import { Product, StoreConfig } from '../types';
import { HealthyProductVisual } from './HealthyProductVisuals';
import { TomatiIcon } from './TomatiLogo';
import { IfoodIcon } from './IfoodIcon';
import { X, ArrowRight, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  config: StoreConfig;
  onOpenChannelModal: (productTitle: string, portalOverride?: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  config,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[85vh] sm:max-h-[540px] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button fixo no canto superior */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-stone-800 flex items-center justify-center shadow-md transition-all cursor-pointer hover:rotate-90"
          title="Fechar (ESC)"
          aria-label="Fechar"
        >
          <X size={16} />
        </button>

        <div className="overflow-y-auto flex-1">
          {/* Packaging Visual Header */}
          <div className="h-40 sm:h-48 w-full relative bg-stone-100 border-b border-stone-200 flex items-center justify-center">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <HealthyProductVisual type={product.id} />
            )}

            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 items-start">
              <span className="bg-[#1F3E29] text-white text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                {product.brand}
              </span>
              {product.badge && (
                <span className="bg-white/95 text-stone-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-stone-200 shadow-2xs">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Details body */}
          <div className="p-4 sm:p-5 space-y-3.5">
            <div className="space-y-1 border-b border-stone-200 pb-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] uppercase font-mono tracking-wider text-stone-500 font-semibold">
                  {product.categoryLabel} · {product.weight}
                </span>
                <span className="text-xl font-bold font-serif text-[#D44A22] tabular-nums">
                  {product.priceFormatted}
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1F3E29] leading-snug">
                {product.name}
              </h3>
            </div>

            {/* Editorial Highlight */}
            {product.editorialHighlight && (
              <div className="p-3 rounded-xl bg-[#EBF2EC] border-l-4 border-[#1F3E29] text-xs text-stone-700 italic font-medium">
                "{product.editorialHighlight}"
              </div>
            )}

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {product.description}
            </p>

            {/* Highlight strip */}
            <div className="p-3 rounded-2xl bg-white border border-stone-200 flex items-center justify-between text-xs">
              <div>
                <span className="block text-[10px] text-stone-500 uppercase font-mono font-bold">Destaque Nutricional</span>
                <span className="font-bold text-[#1F3E29]">{product.nutritionHighlight}</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-stone-500 uppercase font-mono font-bold">Porção / Embalagem</span>
                <span className="font-semibold text-stone-800">{product.weight}</span>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-1.5">
              <h4 className="text-[11px] font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#D44A22]" /> Benefícios e Diferenciais
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-700">
                {product.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-stone-50 p-2 rounded-xl border border-stone-200/60">
                    <CheckCircle2 size={13} className="text-[#2D583B] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CLEAR DUAL PURCHASE BUTTONS WITH OFFICIAL ICONS */}
            <div className="pt-3 border-t border-stone-200 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 text-center font-bold">
                Escolha o canal para comprar:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={product.portalLink || config.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
                >
                  <TomatiIcon
                    size={18}
                    variant="dark"
                    customLightUrl={config.iconLightBgUrl}
                    customDarkUrl={config.iconDarkBgUrl}
                  />
                  <span>Loja Tomati</span>
                  <ArrowRight size={14} />
                </a>

                <a
                  href={product.ifoodLink || config.ifoodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white hover:bg-stone-50 border-2 border-[#EA1D2C]/80 text-stone-900 font-bold text-xs sm:text-sm transition-all shadow-2xs"
                >
                  <IfoodIcon size={20} />
                  <span>Pedir no iFood</span>
                  <ExternalLink size={13} className="text-stone-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
