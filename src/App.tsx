/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, StoreConfig, PageView } from './types';
import { DEFAULT_STORE_CONFIG, PRODUCTS as DEFAULT_PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductShowcase } from './components/ProductShowcase';
import { StorySection } from './components/StorySection';
import { WhereToBuyPage } from './components/WhereToBuyPage';
import { SocialSection } from './components/SocialSection';
import { FooterSection } from './components/FooterSection';
import { OrderChannelModal } from './components/OrderChannelModal';
import { QuickViewModal } from './components/QuickViewModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { MobileQuickBuyBar } from './components/MobileQuickBuyBar';

const CONFIG_STORAGE_KEY = 'tomati_store_config_v4';
const PRODUCTS_STORAGE_KEY = 'tomati_store_products_v4';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('store');

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
        return JSON.parse(saved);
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

  // Scroll to top upon navigating between the 2 pages
  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      {/* 2-Page Top Navigation Bar with Pure Logotype */}
      <Navbar
        config={config}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenOrderModal={openGeneralOrderModal}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Main Views (Maximum 2 Pages) */}
      <main className="flex-1">
        {currentPage === 'store' ? (
          /* PÁGINA 1: LOJA & VITRINE PRINCIPAL */
          <>
            <HeroSection
              config={config}
              onOpenOrderModal={openGeneralOrderModal}
              onExploreProducts={() => {
                const vitrineEl = document.getElementById('vitrine');
                vitrineEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAdmin={() => setAdminModalOpen(true)}
            />

            <ProductShowcase
              products={products}
              config={config}
              onSelectProduct={(product) => setQuickViewProduct(product)}
              onOpenOrderModal={openGeneralOrderModal}
              onNavigateToWhereToBuy={() => handleNavigate('where-to-buy')}
            />

            <StorySection config={config} />

            <SocialSection config={config} />
          </>
        ) : (
          /* PÁGINA 2: ONDE COMPRAR (LOJA TOMATI & IFOOD) & REGIÕES DE ENTREGA */
          <WhereToBuyPage
            config={config}
            onNavigateToStore={() => handleNavigate('store')}
            onOpenOrderModal={openGeneralOrderModal}
          />
        )}
      </main>

      {/* Rodapé da Loja */}
      <FooterSection
        config={config}
        onNavigate={handleNavigate}
        onOpenOrderModal={openGeneralOrderModal}
        onOpenConfigModal={() => setAdminModalOpen(true)}
      />

      {/* Barra de Compra Flutuante para Celular (Limite <15% viewport) */}
      <MobileQuickBuyBar config={config} onOpenOrderModal={openGeneralOrderModal} />

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

      {/* Painel Administrativo: Ofertas, Fotos, Links (Loja Tomati x iFood) & Marcas */}
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
