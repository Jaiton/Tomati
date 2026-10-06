import React from 'react';
import { StoreConfig } from '../types';
import { TomatiIcon } from './TomatiLogo';
import { ArrowRight } from 'lucide-react';

interface MobileQuickBuyBarProps {
  config: StoreConfig;
  onOpenOrderModal: () => void;
}

export const MobileQuickBuyBar: React.FC<MobileQuickBuyBarProps> = ({ config, onOpenOrderModal }) => {
  return (
    <div className="md:hidden fixed bottom-3 inset-x-3 z-30">
      <div className="bg-[#1F3E29]/95 backdrop-blur-md text-white rounded-2xl shadow-xl border border-white/20 p-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5 pl-1.5">
          <TomatiIcon
            size={28}
            variant="light"
            customLightUrl={config.iconLightBgUrl}
            customDarkUrl={config.iconDarkBgUrl}
          />
          <div className="leading-tight">
            <span className="block text-xs font-bold font-sans">Tomati Saudabilidade</span>
            <span className="block text-[10px] text-white/70">mais perto, mais fácil.</span>
          </div>
        </div>

        <button
          onClick={onOpenOrderModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#1F3E29] text-xs font-bold shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <span>Fazer Pedido</span>
          <ArrowRight size={13} className="text-[#D44A22]" />
        </button>
      </div>
    </div>
  );
};
