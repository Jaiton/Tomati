import React, { useState } from 'react';
import { NEIGHBORHOODS_DELIVERY } from '../data/products';
import { MapPin, Search, CheckCircle2, ArrowRight } from 'lucide-react';

interface DeliveryCheckerProps {
  onOpenOrderModal: () => void;
}

export const DeliveryChecker: React.FC<DeliveryCheckerProps> = ({ onOpenOrderModal }) => {
  const [query, setQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [showAllBairros, setShowAllBairros] = useState(false);

  const filtered = NEIGHBORHOODS_DELIVERY.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const displayedList = query ? filtered : (showAllBairros ? filtered : filtered.slice(0, 12));

  return (
    <div className="rounded-3xl bg-[#F4EFE6] border border-[#E3DAC8] p-5 sm:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E3DAC8]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D44A22] font-semibold">
            <MapPin size={14} />
            <span>Raio de Entrega & Disponibilidade</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1F3E29]">
            Consulte sua região em Curitiba
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
            Nossos centros de distribuição atendem os principais bairros de Curitiba e região com entrega expressa via iFood e agendamento pela Loja Tomati.
          </p>
        </div>

        {/* Quick Search Input */}
        <div className="w-full md:w-72 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Digite seu bairro..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#1F3E29] focus:ring-1 focus:ring-[#1F3E29]"
          />
        </div>
      </div>

      {/* Neighborhood Pills / List */}
      <div className="pt-4">
        <div className="text-xs font-medium text-stone-500 mb-3">
          {query ? `Bairros encontrados (${filtered.length}):` : 'Bairros atendidos com frequência diária:'}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {displayedList.map((bairro, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedNeighborhood(bairro.name)}
              className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between cursor-pointer ${
                selectedNeighborhood === bairro.name
                  ? 'bg-[#1F3E29] text-white border-[#1F3E29] shadow-sm'
                  : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200/90'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold">{bairro.name}</span>
                <CheckCircle2 size={13} className={selectedNeighborhood === bairro.name ? 'text-[#D44A22]' : 'text-stone-300'} />
              </div>
              <span className={`text-[11px] mt-1 ${selectedNeighborhood === bairro.name ? 'text-stone-300' : 'text-stone-500'}`}>
                {bairro.time} (estimativa)
              </span>
            </button>
          ))}
        </div>

        {!query && filtered.length > 12 && (
          <div className="pt-2.5 text-center">
            <button
              type="button"
              onClick={() => setShowAllBairros(!showAllBairros)}
              className="text-xs font-semibold text-[#1F3E29] hover:underline cursor-pointer"
            >
              {showAllBairros ? 'Mostrar menos bairros' : `Ver todos os ${filtered.length} bairros atendidos em Curitiba`}
            </button>
          </div>
        )}

        {/* Status Callout if selected or general */}
        <div className="mt-5 p-4 rounded-2xl bg-white/80 border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1F3E29]/10 text-[#1F3E29] flex items-center justify-center shrink-0">
              <CheckCircle2 size={18} />
            </div>
            <div className="text-xs text-stone-700">
              {selectedNeighborhood ? (
                <>
                  Região <strong className="text-[#1F3E29]">{selectedNeighborhood}</strong> está <strong>100% coberta</strong> tanto na Loja Tomati quanto no iFood!
                </>
              ) : (
                <>
                  Atendemos todos os principais bairros de Curitiba com envio rápido diário via Loja Tomati e iFood.
                </>
              )}
            </div>
          </div>

          <button
            onClick={onOpenOrderModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
          >
            <span>Fazer meu pedido nesta região</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
