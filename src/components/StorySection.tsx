import React from 'react';
import { StoreConfig } from '../types';
import { TomatiIcon } from './TomatiLogo';
import { Zap, Heart, ShieldCheck, Sparkles } from 'lucide-react';

interface StorySectionProps {
  config?: StoreConfig;
}

export const StorySection: React.FC<StorySectionProps> = ({ config }) => {
  return (
    <section className="py-10 sm:py-14 bg-[#F5F1E8] border-t border-stone-200/90 relative overflow-hidden">
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#1F3E29]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Manifesto */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D44A22] font-semibold">
              <Sparkles size={14} />
              <span>O Propósito da Tomati</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#1F3E29] leading-[1.15] text-balance">
              Alimentar sua melhor versão não precisa ser sem graça.
            </h2>

            <div className="space-y-3 text-stone-700 text-sm sm:text-base leading-relaxed">
              <p>
                Acreditamos que saúde de verdade não é sobre dietas restritivas ou abrir mão do prazer. É sobre colocar no corpo combustível de alta densidade nutritiva, com ingredientes limpos e sabor que dá vontade de repetir todos os dias.
              </p>
              <p className="font-semibold text-[#1F3E29]">
                Por isso criamos a Tomati: para reunir o equilíbrio perfeito entre suplementação, nutrição e sabor — mais perto e mais fácil da sua rotina.
              </p>
              <p>
                Selecionamos marcas inovadoras como <strong>Hey! Mu</strong>, <strong>Naveia</strong>, <strong>Tocca</strong>, <strong>Yok-k!</strong> e <strong>Fruit-Titus</strong> para que você tenha energia limpa e bem-estar em um só clique.
              </p>
            </div>

            {/* Slogan Stamp with Official Icon */}
            <div className="pt-3 border-t border-stone-300/80 flex items-center gap-3">
              <TomatiIcon
                size={38}
                variant="dark"
                customLightUrl={config?.iconLightBgUrl}
                customDarkUrl={config?.iconDarkBgUrl}
              />
              <div>
                <span className="block font-display font-bold text-sm sm:text-base text-[#1F3E29]">
                  Tomati. | mais perto, mais fácil.
                </span>
                <span className="block text-[11px] text-stone-500">
                  Sua loja de saudabilidade, nutrição e sabor em Curitiba - PR
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Pillars */}
          <div className="lg:col-span-5 space-y-3">
            <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#D44A22]/10 text-[#D44A22] flex items-center justify-center shrink-0">
                  <Zap size={20} />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-display font-bold text-base text-[#1F3E29]">
                    Energia & Performance Real
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Alimentos com aporte proteico, gorduras boas de amendoim e carboidratos complexos que sustentam sua disposição ao longo do dia.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#1F3E29]/10 text-[#1F3E29] flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-display font-bold text-base text-[#1F3E29]">
                    Rótulos Transparentes
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Zero ingredientes misteriosos. Você sabe o que consome: sem açúcares refinados, sem lactose e com opções sem glúten.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#E05B35]/10 text-[#E05B35] flex items-center justify-center shrink-0">
                  <Heart size={20} />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-display font-bold text-base text-[#1F3E29]">
                    O Prazer de Comer Bem
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Doce de leite aveludado, chocolate nobre 70% com frutas e cappuccino vegetal com espuma cremosa. Saúde com prazer real.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
