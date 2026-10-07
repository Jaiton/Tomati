import React from 'react';
import { BrandPartner } from '../types';

interface BrandCarouselProps {
  brands: BrandPartner[];
}

export const BrandCarousel: React.FC<BrandCarouselProps> = ({ brands }) => {
  // Se não houver marcas cadastradas, não renderiza
  if (!brands || brands.length === 0) return null;

  // Duplica as marcas para o efeito contínuo de marquee infinito
  const displayBrands = brands.length < 5 
    ? [...brands, ...brands, ...brands, ...brands] 
    : [...brands, ...brands];

  return (
    <div className="pt-2 max-w-7xl mx-auto space-y-2.5">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D44A22]" />
          <span className="text-xs font-mono uppercase tracking-widest text-stone-600 font-bold">
            Marcas Parceiras
          </span>
        </div>
      </div>

      {/* Carrossel Infinito com APENAS AS LOGOS (sem retângulo/borda em volta, 40% maiores) */}
      <div className="relative w-full overflow-hidden py-4 sm:py-5 bg-white/60 backdrop-blur-xs rounded-2xl border border-stone-200/80 shadow-2xs group">
        {/* Sombras suaves nas laterais para fade elegante */}
        <div className="absolute left-0 top-0 bottom-0 w-14 sm:w-24 bg-gradient-to-r from-[#FBF9F5] sm:from-white/90 via-[#FBF9F5]/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-14 sm:w-24 bg-gradient-to-l from-[#FBF9F5] sm:from-white/90 via-[#FBF9F5]/70 to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-8 sm:gap-14 w-max animate-marquee hover:[animation-play-state:paused]">
          {displayBrands.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 select-none"
              title={brand.name || 'Marca Parceira'}
            >
              {/* APENAS A LOGO DA MARCA - SEM RETÂNGULO EM VOLTA E 40% MAIOR */}
              {brand.logoUrl ? (
                <img
                  src={brand.logoUrl}
                  alt={brand.name || 'Logo Marca'}
                  className="h-11 sm:h-14 w-auto max-w-[170px] max-h-[54px] object-contain drop-shadow-2xs"
                  onError={(e) => {
                    // Fallback visual caso a imagem não carregue
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <span
                  className="font-bold text-lg sm:text-xl tracking-tight font-display px-2"
                  style={{ color: brand.accentColor || '#1F3E29' }}
                >
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
