import React from 'react';
import { StoreConfig } from '../types';
import { DeliveryChecker } from './DeliveryChecker';
import { TomatiIcon } from './TomatiLogo';
import { IfoodIcon } from './IfoodIcon';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Check,
  ShieldCheck,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface WhereToBuyPageProps {
  config: StoreConfig;
  onNavigateToStore: () => void;
  onOpenOrderModal: () => void;
}

export const WhereToBuyPage: React.FC<WhereToBuyPageProps> = ({
  config,
  onNavigateToStore,
  onOpenOrderModal,
}) => {
  return (
    <div className="py-8 sm:py-12 bg-[#FBF9F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Back Link to Page 1 */}
        <div>
          <button
            onClick={onNavigateToStore}
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-[#1F3E29] transition-colors py-1.5 px-3 rounded-lg hover:bg-stone-200/60 cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Voltar para Página 1: Loja & Vitrine de Produtos</span>
          </button>
        </div>

        {/* Page Hero Header - NO "slogan oficial" label! */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D44A22] font-semibold">
              <Sparkles size={14} />
              <span>Página 2 · Canais de Compra & Entrega</span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1F3E29] tracking-tight">
              Seu pedido, do seu jeito.
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              A Tomati torna seu acesso a produtos de saudabilidade mais perto e mais fácil. Escolha entre comprar direto na <strong>Loja Tomati</strong> ou pedir pelo seu <strong>aplicativo do iFood</strong>.
            </p>
          </div>

          {/* Slogan Badge SEM o texto "Slogan Oficial" */}
          <div className="px-4 py-2.5 rounded-2xl bg-[#EBF2EC] border border-[#C5DAC9] text-xs self-start md:self-center">
            <span className="font-bold text-sm text-[#1F3E29]">
              Tomati. | mais perto, mais fácil.
            </span>
          </div>
        </div>

        {/* The Two Main Purchase Channels (Clear, Official Icons, High Intent) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Channel 1: Loja Tomati (Featured) */}
          <div className="md:col-span-7 rounded-3xl bg-white border-2 border-[#1F3E29] p-6 sm:p-8 shadow-md relative flex flex-col justify-between group">
            <div className="absolute -top-3.5 left-8 bg-[#1F3E29] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-xs">
              Canal Oficial Direto · Recomendado
            </div>

            <div className="space-y-4 pt-1">
              <div className="flex items-center gap-3.5">
                {/* Official Tomati Icon */}
                <TomatiIcon
                  size={48}
                  variant="dark"
                  customLightUrl={config.iconLightBgUrl}
                  customDarkUrl={config.iconDarkBgUrl}
                />
                <div>
                  <span className="text-[11px] uppercase font-mono tracking-wider text-stone-500 font-semibold">
                    pedido.tomati.com.br
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[#1F3E29]">
                    Loja Tomati
                  </h2>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                A experiência mais completa: catálogo integral de marcas selecionadas, lançamentos e atendimento exclusivo.
              </p>

              {/* Channel Attributes */}
              <div className="space-y-2 pt-1 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#1F3E29]/10 text-[#1F3E29] flex items-center justify-center shrink-0">
                    <Check size={11} />
                  </div>
                  <span>Catálogo completo com lançamentos e kits especiais de saudabilidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#1F3E29]/10 text-[#1F3E29] flex items-center justify-center shrink-0">
                    <Check size={11} />
                  </div>
                  <span>Doces de leite sem açúcar, bebidas vegetais puras e pastas nobres</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#1F3E29]/10 text-[#1F3E29] flex items-center justify-center shrink-0">
                    <Check size={11} />
                  </div>
                  <span>Entrega expressa ou programada na sua rotina diária</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
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

          {/* Channel 2: iFood (Secondary, Span 5) */}
          <div className="md:col-span-5 rounded-3xl bg-white border border-stone-300 p-6 sm:p-8 shadow-2xs hover:border-red-300 hover:shadow-sm transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                {/* Official iFood Icon */}
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                  <IfoodIcon size={28} customLogoUrl={config.ifoodLogoUrl} />
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
                A conveniência que você já usa no dia a dia: peça seus produtos saudáveis preferidos com agilidade pelo aplicativo do iFood.
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
                  <span>Entrega rápida nos principais bairros atendidos</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-stone-400">Destino: ifood.com.br</span>
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

        {/* Informações Operacionais Compactas */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#F0ECE1] border border-stone-300/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-700">
          <div className="flex items-start gap-2.5">
            <Clock size={16} className="text-[#1F3E29] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#1F3E29] font-bold">Horário de Funcionamento</strong>
              <span>{config.workingHours}</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="text-[#D44A22] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#1F3E29] font-bold">Base de Distribuição</strong>
              <span>{config.address}</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <TomatiIcon
              size={16}
              variant="dark"
              customLightUrl={config.iconLightBgUrl}
              customDarkUrl={config.iconDarkBgUrl}
              className="shrink-0 mt-0.5"
            />
            <div>
              <strong className="block text-[#1F3E29] font-bold">Canais Oficiais</strong>
              <span>Loja Tomati Oficial & iFood</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
