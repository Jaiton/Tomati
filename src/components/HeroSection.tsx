import React from 'react';
import { StoreConfig } from '../types';
import { BrandCarousel } from './BrandCarousel';
import { TomatiIcon } from './TomatiLogo';
import { IfoodIcon } from './IfoodIcon';
import { ArrowRight, ShoppingBag } from 'lucide-react';

interface HeroSectionProps {
  config: StoreConfig;
  onOpenOrderModal: () => void;
  onExploreProducts: () => void;
  onOpenAdmin: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onOpenAdmin,
}) => {
  return (
    <section className="relative overflow-hidden pt-4 pb-8 sm:pb-12 lg:pt-8 lg:pb-14 border-b border-stone-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[380px] bg-gradient-to-b from-[#EBF2EC]/70 via-[#FBF9F5] to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Main Editorial Lockup */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F3E29]/10 text-[#1F3E29] text-xs font-mono font-bold uppercase tracking-widest border border-[#1F3E29]/20">
            <span className="w-2 h-2 rounded-full bg-[#D44A22] animate-pulse" />
            <span>Tomati. | mais perto, mais fácil.</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F3E29] leading-[1.1] text-balance">
            Sua loja de saudabilidade com o equilíbrio perfeito entre{' '}
            <span className="italic font-normal text-[#D44A22]">
              suplementação, nutrição e sabor.
            </span>
          </h1>

          {/* User Exact Mission Paragraph */}
          <p className="text-sm sm:text-lg text-stone-700 max-w-3xl leading-relaxed font-normal pt-1">
            Produtos selecionados para quem busca mais energia, bem-estar e performance no dia a dia — sem abrir mão do prazer de comer bem.
          </p>

          {/* HIGH CONVERSION PURCHASE CHANNELS BAR (Extremely clear, official icons, compact) */}
          <div className="w-full max-w-2xl mt-2 p-4 sm:p-5 rounded-3xl bg-white border-2 border-[#1F3E29] shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2.5 text-xs">
              <span className="font-bold text-[#1F3E29] uppercase tracking-wider flex items-center gap-1.5">
                <ShoppingBag size={14} className="text-[#D44A22]" /> Escolha onde fazer seu pedido:
              </span>
              <span className="text-stone-500 hidden sm:inline">Entrega expressa em Curitiba</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Channel 1: Loja Tomati with Official Tomati Icon */}
              <a
                href={config.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#1F3E29] hover:bg-[#14281B] text-white transition-all shadow-sm hover:shadow-md group"
              >
                <div className="text-left flex items-center gap-3">
                  <TomatiIcon
                    size={32}
                    variant="light"
                    customLightUrl={config.iconLightBgUrl}
                    customDarkUrl={config.iconDarkBgUrl}
                  />
                  <div>
                    <span className="block text-[10px] font-mono text-[#A7D7B5] uppercase font-bold tracking-wider">
                      Canal Oficial Direto
                    </span>
                    <span className="block text-sm sm:text-base font-bold text-white leading-tight">
                      Loja Tomati
                    </span>
                    <span className="block text-[11px] text-white/70">
                      Catálogo completo & kits
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={15} className="text-white" />
                </div>
              </a>

              {/* Channel 2: iFood with Official iFood Icon ONLY */}
              <a
                href={config.ifoodUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-900 border-2 border-[#EA1D2C]/80 transition-all shadow-sm hover:shadow-md group"
              >
                <div className="text-left flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <IfoodIcon size={20} customLogoUrl={config.ifoodLogoUrl} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-[#EA1D2C] uppercase font-bold tracking-wider">
                      Delivery Expresso
                    </span>
                    <span className="block text-sm sm:text-base font-bold text-stone-900 leading-tight">
                      Pedir no iFood
                    </span>
                    <span className="block text-[11px] text-stone-500">
                      Entrega ágil no seu app
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-red-50 text-[#EA1D2C] flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={15} />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Brand Carousel (Apenas Logos das marcas) */}
        <BrandCarousel brands={config.brands || []} />
      </div>
    </section>
  );
};
