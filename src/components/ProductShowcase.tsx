import React, { useState } from 'react';
import { Product, StoreConfig } from '../types';
import { HealthyProductVisual } from './HealthyProductVisuals';
import { TomatiIcon } from './TomatiLogo';
import { IfoodIcon } from './IfoodIcon';
import { ArrowRight, Sparkles, Eye, CheckCircle2 } from 'lucide-react';

interface ProductShowcaseProps {
  products: Product[];
  config: StoreConfig;
  onSelectProduct: (product: Product) => void;
  onOpenOrderModal: () => void;
  onNavigateToWhereToBuy?: () => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  products,
  config,
  onSelectProduct,
  onNavigateToWhereToBuy,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'pastas-spreads' | 'beverages' | 'healthy-meals' | 'energy-snacks' | 'combos'
  >('all');

  const filteredProducts =
    activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory);

  return (
    <section id="vitrine" className="py-10 sm:py-14 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D44A22] font-semibold">
              <Sparkles size={14} />
              <span>Curadoria Oficial Tomati</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#1F3E29] tracking-tight">
              Vitrine de Produtos Saudáveis
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Cada item une valor nutricional e sabor extraordinário. Escolha seu produto e peça pelo canal de sua preferência:
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F0ECE1] rounded-2xl self-start md:self-end">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white text-[#1F3E29] shadow-2xs'
                  : 'text-stone-600 hover:text-[#1F3E29]'
              }`}
            >
              Todos ({products.length})
            </button>
            <button
              onClick={() => setActiveCategory('pastas-spreads')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'pastas-spreads'
                  ? 'bg-white text-[#1F3E29] shadow-2xs'
                  : 'text-stone-600 hover:text-[#1F3E29]'
              }`}
            >
              Doces & Pastas
            </button>
            <button
              onClick={() => setActiveCategory('beverages')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'beverages'
                  ? 'bg-white text-[#1F3E29] shadow-2xs'
                  : 'text-stone-600 hover:text-[#1F3E29]'
              }`}
            >
              Bebidas Vegetais
            </button>
            <button
              onClick={() => setActiveCategory('energy-snacks')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'energy-snacks'
                  ? 'bg-white text-[#1F3E29] shadow-2xs'
                  : 'text-stone-600 hover:text-[#1F3E29]'
              }`}
            >
              Snacks & Frutas
            </button>
            <button
              onClick={() => setActiveCategory('healthy-meals')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'healthy-meals'
                  ? 'bg-white text-[#1F3E29] shadow-2xs'
                  : 'text-stone-600 hover:text-[#1F3E29]'
              }`}
            >
              Massa Sem Glúten
            </button>
          </div>
        </div>

        {/* Product Cards Grid with Zero-Truncate Layout & Clear Buy Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-stone-200 hover:border-stone-300 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Product Visual Top */}
              <div>
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-stone-50 border-b border-stone-100 flex items-center justify-center">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  ) : (
                    <HealthyProductVisual type={product.id} />
                  )}

                  {/* Brand & Badge Pills */}
                  <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 items-start">
                    <span className="bg-[#1F3E29] text-white text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-2xs">
                      {product.brand}
                    </span>
                    {product.badge && (
                      <span className="bg-white/95 backdrop-blur-xs text-stone-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-stone-200 shadow-2xs">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                    title="Ver detalhes"
                  >
                    <Eye size={15} />
                  </button>
                </div>

                {/* Details Body - Zero truncation, generous text wrap */}
                <div className="p-5 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 font-semibold block">
                        {product.categoryLabel} · {product.weight}
                      </span>
                      <span className="text-base sm:text-lg font-bold font-serif text-[#D44A22] tabular-nums whitespace-nowrap">
                        {product.priceFormatted}
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#1F3E29] leading-snug break-words">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed break-words">
                    {product.tagline}
                  </p>

                  {/* Clean Benefits List */}
                  <div className="space-y-1 pt-1.5 border-t border-stone-100">
                    {product.benefits.slice(0, 3).map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-1.5 text-xs text-stone-700">
                        <CheckCircle2 size={13} className="text-[#2D583B] shrink-0 mt-0.5" />
                        <span className="leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CRYSTAL-CLEAR DUAL BUY BUTTONS */}
              <div className="p-5 pt-0 space-y-2">
                <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 text-center font-bold">
                    Onde Comprar:
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Loja Tomati Button with OFFICIAL TOMATI ICON */}
                    <a
                      href={product.portalLink || config.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs font-bold transition-all shadow-2xs hover:shadow-xs text-center"
                      title="Comprar na Loja Tomati"
                    >
                      <TomatiIcon
                        size={16}
                        variant="dark"
                        customLightUrl={config.iconLightBgUrl}
                        customDarkUrl={config.iconDarkBgUrl}
                      />
                      <span>Loja Tomati</span>
                    </a>

                    {/* iFood Button with OFFICIAL IFOOD ICON ONLY */}
                    <a
                      href={product.ifoodLink || config.ifoodUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-white hover:bg-stone-50 text-stone-800 hover:text-red-600 border border-stone-300 text-xs font-bold transition-all text-center"
                      title="Pedir no iFood"
                    >
                      <IfoodIcon size={18} customLogoUrl={config.ifoodLogoUrl} />
                      <span>No iFood</span>
                    </a>
                  </div>
                </div>

                <div className="text-center pt-0.5">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="text-[11px] text-stone-500 hover:text-[#1F3E29] underline transition-colors cursor-pointer"
                  >
                    Ver detalhes completos e tabela nutricional
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transition Banner to Page 2 (Onde Comprar) */}
        {onNavigateToWhereToBuy && (
          <div className="rounded-3xl bg-[#1F3E29] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-xs font-mono uppercase text-[#A7D7B5] tracking-widest font-bold">
                Entrega em Curitiba
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold">
                Quer saber como funciona a entrega e os bairros atendidos?
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl">
                Consulte nossa página dedicada com todos os detalhes de atendimento express via iFood e agendamento pela Loja Tomati.
              </p>
            </div>

            <button
              onClick={onNavigateToWhereToBuy}
              className="px-5 py-3 rounded-full bg-white hover:bg-[#F3EFE6] text-[#1F3E29] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <span>Ver Página 2: Onde Comprar & Bairros</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
