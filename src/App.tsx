/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, StoreConfig } from './types';
import { DEFAULT_STORE_CONFIG, PRODUCTS as DEFAULT_PRODUCTS } from './data/products';
import { OrderChannelModal } from './components/OrderChannelModal';
import { QuickViewModal } from './components/QuickViewModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { ClaudeWowPreview } from './components/ClaudeWowPreview';

const CONFIG_STORAGE_KEY = 'tomati_store_config_v4';
const PRODUCTS_STORAGE_KEY = 'tomati_store_products_v4';

export default function App() {
  const [config, setConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_STORE_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_STORE_CONFIG;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        return parsed.map((p) => {
          const defaultProd = DEFAULT_PRODUCTS.find(
            (dp) => dp.id === p.id || dp.brand.toLowerCase() === p.brand.toLowerCase()
          );
          return {
            ...p,
            imageUrl: p.imageUrl || defaultProd?.imageUrl,
          };
        });
      }
    } catch {
      // Fallback
    }
    return DEFAULT_PRODUCTS;
  });

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [customProductTitle, setCustomProductTitle] = useState<string | undefined>(undefined);
  const [portalOverride, setPortalOverride] = useState<string | undefined>(undefined);

  const handleSaveConfig = (newConfig: StoreConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
    } catch {
      // Ignore
    }
  };

  const handleSaveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(newProducts));
    } catch {
      // Ignore
    }
  };

  const handleResetAll = () => {
    setConfig(DEFAULT_STORE_CONFIG);
    setProducts(DEFAULT_PRODUCTS);
    try {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
      localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const openGeneralOrderModal = () => {
    setCustomProductTitle(undefined);
    setPortalOverride(undefined);
    setOrderModalOpen(true);
  };

  const openProductOrderModal = (title: string, portalUrl?: string) => {
    setCustomProductTitle(title);
    setPortalOverride(portalUrl);
    setOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1E2420] flex flex-col font-sans selection:bg-[#D44A22]/20 selection:text-[#1F3E29]">
      {/* LOJA OFICIAL TOMATI */}
      <ClaudeWowPreview
        config={config}
        products={products}
        onOpenOrderModal={openGeneralOrderModal}
        onOpenProductOrderModal={openProductOrderModal}
        onSelectProduct={(product: Product) => setQuickViewProduct(product)}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Modal: Onde Comprar (Loja Tomati x iFood) */}
      <OrderChannelModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        config={config}
        customProductTitle={customProductTitle}
        portalLinkOverride={portalOverride}
      />

      {/* Modal: Visualização Rápida de Produto */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        config={config}
        onOpenChannelModal={(title, override) => {
          setQuickViewProduct(null);
          openProductOrderModal(title, override);
        }}
      />

      {/* Painel Administrativo */}
      <AdminPanelModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        config={config}
        products={products}
        onSaveConfig={handleSaveConfig}
        onSaveProducts={handleSaveProducts}
        onResetAll={handleResetAll}
      />
    </div>
  );
}
