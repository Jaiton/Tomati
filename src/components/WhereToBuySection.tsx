import React from 'react';
import { StoreConfig } from '../types';
import { DeliveryChecker } from './DeliveryChecker';
import { TomatiIcon } from './TomatiLogo';
import { IfoodIcon } from './IfoodIcon';
import { ArrowRight, ExternalLink, Check, ShieldCheck } from 'lucide-react';

interface WhereToBuySectionProps {
  config: StoreConfig;
  onOpenOrderModal: () => void;
}

export const WhereToBuySection: React.FC<WhereToBuySectionProps> = ({
  config,
  onOpenOrderModal,
}) => {
  return (
    <section id="onde-comprar" className="py-10 sm:py-14 bg-[#FBF9F5] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D44A22] font-semibold">
            <span>Canais Oficiais de Venda</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#1F3E29] tracking-tight">
            Seu pedido, do seu jeito.
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            A compra é realizada em dois canais oficiais. Escolha a experiência que melhor combina com a sua rotina:
          </p>
        </div>

        {/* Dual Channel Cards with Visual Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Loja Tomati (More Visual Prominence, Span 7) */}
          <div className="md:col-span-7 rounded-3xl bg-white border-2 border-[#1F3E29] p-6 sm:p-8 shadow-md relative flex flex-col justify-between group">
            {/* Top Badge */}
            <div className="absolute -top-3.5 left-8 bg-[#1F3E29] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-xs">
              Canal Oficial Direto · Recomendado
            </div>

            <div className="space-y-4 pt-1">
              <div className="flex items-center gap-3.5">
                <TomatiIcon size={44} variant="dark" />
                <div>
                  <span className="text-[11px] uppercase font-mono tracking-wider text-stone-500">
                    pedido.tomati.com.br
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1F3E29]">
                    Loja Tomati
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                A experiência mais completa: catálogo integral de marcas parceiras selecionadas, novidades exclusivas e atendimento direto.
              </p>

              {/* Channel Attributes */}
              <div className="space-y-2 pt-1 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#1F3E29]/10 text-[#1F3E29] flex items-center justify-center shrink-0">
                    <Check size={11} />
                  </div>
                  <span>Cardápio integral com novidades semanais e combos exclusivos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#1F3E29]/10 text-[#1F3E29] flex items-center justify-center shrink-0">
                    <Check size={11} />
                  </div>
                  <span>Doces sem açúcar, pastas de amendoim artesanais e leites vegetais</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#1F3E29]/10 text-[#1F3E29] flex items-center justify-center shrink-0">
                    <Check size={11} />
                  </div>
                  <span>Opção de entrega expressa ou agendada para o seu dia</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-stone-500 flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-[#2D583B]" />
                <span>Destino: portal seguro Tomati</span>
              </div>
              <a
                href={config.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md group-hover:translate-x-0.5"
              >
                <span>Explorar produtos e fazer meu pedido</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Card 2: iFood (Secondary, Span 5) */}
          <div className="md:col-span-5 rounded-3xl bg-white border border-stone-300 p-6 sm:p-8 shadow-2xs hover:border-red-300 hover:shadow-sm transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                  <IfoodIcon size={26} />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-mono tracking-wider text-stone-400">
                    Delivery Expresso
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                    Loja no iFood
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                A conveniência que você já usa: peça seus produtos de saudabilidade favoritos com rapidez pelo app do iFood.
              </p>

              {/* Channel Attributes */}
              <div className="space-y-2 pt-1 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-100 text-[#EA1D2C] flex items-center justify-center shrink-0">
                    <Check size={11} />
                  </div>
                  <span>Pedidos imediatos com o fluxo habitual da sua conta iFood</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-100 text-[#EA1D2C] flex items-center justify-center shrink-0">
                    <Check size={11} />
                  </div>
                  <span>Acompanhamento da entrega em tempo real no app</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-100 text-[#EA1D2C] flex items-center justify-center shrink-0">
                    <Check size={11} />
                  </div>
                  <span>Entrega rápida nos bairros atendidos</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-stone-400">
                Destino: ifood.com.br
              </span>
              <a
                href={config.ifoodUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-100 hover:bg-[#EA1D2C] text-stone-800 hover:text-white text-xs sm:text-sm font-semibold tracking-wide transition-all"
              >
                <span>Ver nossa loja no iFood</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Region & Neighborhood Checker */}
        <div id="regioes" className="pt-2">
          <DeliveryChecker onOpenOrderModal={onOpenOrderModal} />
        </div>
      </div>
    </section>
  );
};
