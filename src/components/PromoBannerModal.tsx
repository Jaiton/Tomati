import React, { useEffect, useState } from 'react';
import { X, ArrowUpRight, Copy, Check } from 'lucide-react';
import defaultBlackTomatiImg from '../assets/images/black_tomati_banner_1795474886448.jpg';

export interface PromoBannerConfig {
  enabled: boolean;
  tag: string;
  title: string;
  description: string;
  coupon: string;
  ctaText: string;
  ctaLinkType: 'portal' | 'ifood' | 'custom';
  ctaCustomUrl: string;
  image: string;
  imageOnly: boolean;
  frequency: 'session' | 'always';
}

export const DEFAULT_PROMO_BANNER: PromoBannerConfig = {
  enabled: true,
  tag: 'Black Tomati',
  title: 'Seleção saudável com condições especiais.',
  description:
    'Aproveite descontos exclusivos em marcas selecionadas durante a Black Tomati. Peça no portal ou no iFood.',
  coupon: 'BLACKTOMATI',
  ctaText: 'Ver ofertas no portal',
  ctaLinkType: 'portal',
  ctaCustomUrl: '',
  image: '',
  imageOnly: false,
  frequency: 'session',
};

interface PromoBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PromoBannerConfig;
  resolveImageUrl: (url?: string) => string;
  ctaHref: string;
  isPreview?: boolean;
}

export const PromoBannerModal: React.FC<PromoBannerModalProps> = ({
  isOpen,
  onClose,
  config,
  resolveImageUrl,
  ctaHref,
  isPreview = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [config.image, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resolvedCustomImage = config.image ? resolveImageUrl(config.image) : '';
  const activeImageSrc = !imgFailed && resolvedCustomImage ? resolvedCustomImage : defaultBlackTomatiImg;
  const hasValidHref = Boolean(ctaHref && ctaHref !== '#');
  const isExternalLink = ctaHref.startsWith('http://') || ctaHref.startsWith('https://');

  const handleCopyCoupon = () => {
    if (!config.coupon.trim()) return;
    try {
      navigator.clipboard?.writeText(config.coupon.trim());
    } catch {
      // Fallback silencioso caso o navegador bloqueie clipboard em iframe
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={config.title || config.tag || 'Campanha Tomati'}
    >
      <div
        className="relative w-full max-w-[540px] rounded-[24px] overflow-hidden bg-[#0B0E0C] text-[#FAF8F5] border border-white/15 shadow-2xl transition-transform duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de fechar com alvo de toque >= 44px */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar aviso promocional"
          title="Fechar (ESC)"
          className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-black/65 hover:bg-black/85 text-white border border-white/20 flex items-center justify-center transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFC93C]"
        >
          <X size={20} />
        </button>

        {isPreview && (
          <div className="px-5 py-2 bg-[#FFC93C] text-[#14201A] text-xs font-bold tracking-wide text-center shrink-0">
            Pré-visualização do painel — os visitantes verão exatamente assim
          </div>
        )}

        {config.imageOnly ? (
          /* Modo Arte Pronta: imagem clicável em destaque */
          <div className="flex flex-col overflow-y-auto">
            {hasValidHref ? (
              <a
                href={ctaHref}
                target={isExternalLink ? '_blank' : undefined}
                rel={isExternalLink ? 'noopener noreferrer' : undefined}
                onClick={onClose}
                className="block relative w-full bg-[#14201A]"
              >
                <img
                  src={activeImageSrc}
                  alt={config.title || config.tag || 'Campanha Tomati'}
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full h-auto max-h-[74vh] object-cover block"
                />
              </a>
            ) : (
              <div className="relative w-full bg-[#14201A]">
                <img
                  src={activeImageSrc}
                  alt={config.title || config.tag || 'Campanha Tomati'}
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full h-auto max-h-[74vh] object-cover block"
                />
              </div>
            )}

            {config.ctaText.trim() && hasValidHref && (
              <div className="p-4 sm:p-5 bg-[#0B0E0C] border-t border-white/10 flex items-center justify-between gap-3">
                <a
                  href={ctaHref}
                  target={isExternalLink ? '_blank' : undefined}
                  rel={isExternalLink ? 'noopener noreferrer' : undefined}
                  onClick={onClose}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#FFC93C] hover:bg-[#ffd45e] text-[#14201A] font-bold text-sm transition-colors duration-150 whitespace-nowrap"
                >
                  <span>{config.ctaText}</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            )}
          </div>
        ) : (
          /* Modo Editorial Completo: foto + texto + cupom + CTA */
          <div className="flex flex-col overflow-y-auto">
            {/* Mídia de capa 16:9 com scrim suave para transição no fundo escuro */}
            <div className="relative w-full aspect-[16/9] bg-[#14201A] shrink-0 overflow-hidden">
              <img
                src={activeImageSrc}
                alt={config.title || config.tag || 'Campanha Tomati'}
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className="w-full h-full object-cover block"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0B0E0C] via-[#0B0E0C]/20 to-transparent"
              />
            </div>

            {/* Conteúdo tipográfico */}
            <div className="px-6 pt-4 pb-6 sm:px-8 sm:pb-7 flex flex-col gap-4">
              {config.tag.trim() && (
                <div className="text-xs font-bold tracking-[0.14em] uppercase text-[#FFC93C]">
                  {config.tag}
                </div>
              )}

              {config.title.trim() && (
                <h2
                  className="text-2xl sm:text-[28px] font-extrabold leading-[1.12] tracking-[-0.02em] text-white m-0"
                  style={{
                    fontFamily: "'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif",
                    textWrap: 'balance',
                  }}
                >
                  {config.title}
                </h2>
              )}

              {config.description.trim() && (
                <p className="text-sm sm:text-[15px] leading-relaxed text-[#FAF8F5]/80 m-0">
                  {config.description}
                </p>
              )}

              {/* Cupom clicável (opcional) */}
              {config.coupon.trim() && (
                <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/12">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#FAF8F5]/60">Cupom da campanha</span>
                    <span className="font-mono text-base font-bold tracking-wider text-[#FFC93C] tabular-nums">
                      {config.coupon.trim()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCoupon}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copied ? <Check size={14} className="text-[#FFC93C]" /> : <Copy size={14} />}
                    <span>{copied ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
              )}

              {/* Ações */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {config.ctaText.trim() && hasValidHref && (
                  <a
                    href={ctaHref}
                    target={isExternalLink ? '_blank' : undefined}
                    rel={isExternalLink ? 'noopener noreferrer' : undefined}
                    onClick={onClose}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#E63B1F] hover:bg-[#cf3319] text-white font-bold text-sm transition-colors duration-150 whitespace-nowrap"
                  >
                    <span>{config.ctaText}</span>
                    <ArrowUpRight size={16} />
                  </a>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-5 rounded-full text-sm font-semibold text-[#FAF8F5]/75 hover:text-white hover:bg-white/10 transition-colors duration-150 cursor-pointer whitespace-nowrap"
                >
                  Continuar para o site
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
