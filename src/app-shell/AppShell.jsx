"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import Navbar from "../Components/CommonComponents/NavBar";
import Footer from "../Components/CommonComponents/Footer";
import ScrollToTop from "../Components/CommonComponents/ScrollToTop";
import ScrollToTopButton from "../Components/CommonComponents/ScrollToTopButton";
import WhatsAppButton from "../Components/CommonComponents/WhatsAppButton";
import PageScript from "../Components/CommonComponents/PageScript";
import TopLoadingBar from "../Components/CommonComponents/TopLoadingBar";
import SkeletonLoaderShell from "../Components/CommonComponents/SkeletonLoaderShell";
import { GlobalDataProvider } from "../Helpers/GlobalDataProvider";
import { GlobalDataContext } from "../Helpers/GlobalDataContext";
import { useContext } from "react";
import { Toaster } from "sonner";

export default function AppShell({ children }) {
  const { globalData } = useContext(GlobalDataContext) || {};

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    window.lenisInstance = lenis;
    return () => {
      lenis.destroy();
      window.lenisInstance = null;
    };
  }, []);

  const settings = globalData?.result?.settings || [];

  // Extract scripts from settings
  const seoTagSetting = settings.find(s => s.ref_name === 'SEO Meta Tags in Header' && s.is_active);
  const analyticsSetting = settings.find(s => s.ref_name.toLowerCase().includes("google analytics") && s.is_active);
  const endBodySetting = settings.find(s => s.ref_name === 'SEO Tracking or Other Scripts in the End of Body Tag' && s.is_active);

  // Favicon Handling
  const logoSetting = settings.find((s) => s.ref_name === "Website Logo");
  const faviconPath = logoSetting?.contents?.favicon;
  const faviconHtml = faviconPath ? `<link rel="icon" href="${faviconPath}" type="image/png" />` : "";

  return (
    <GlobalDataProvider>
      <TopLoadingBar />
      <PageScript html={seoTagSetting?.contents} ownerKey="global-header-seo" />
      <PageScript html={analyticsSetting?.contents} ownerKey="global-analytics" />
      <PageScript html={endBodySetting?.contents} ownerKey="global-end-body" />
      <PageScript html={faviconHtml} ownerKey="global-favicon" />

      <ScrollToTop />
      <ScrollToTopButton />
      <WhatsAppButton />
      <Navbar />
      <SkeletonLoaderShell>
        {children}
      </SkeletonLoaderShell>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </GlobalDataProvider>
  );
}
