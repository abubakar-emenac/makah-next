"use client";

import { Toaster } from "react-hot-toast";
import Lenis from "lenis";
import { useEffect } from "react";
import Navbar from "../Components/CommonComponents/NavBar";
import Footer from "../Components/CommonComponents/Footer";
import ScrollToTop from "../Components/CommonComponents/ScrollToTop";
import ScrollToTopButton from "../Components/CommonComponents/ScrollToTopButton";
import WhatsAppButton from "../Components/CommonComponents/WhatsAppButton";
import AnalyticsInjector from "../Hooks/AnalyticsInjector";
import useSeoScripts from "../Hooks/useSeoScripts";
import useFaviconInjector from "../Hooks/useFaviconInjector";
import useGlobalSettingsInjector from "../Hooks/useGlobalSettingsInjector";
import { GlobalDataProvider } from "../Helpers/GlobalDataProvider";

export default function AppShell({ children }) {
  useGlobalSettingsInjector();
  AnalyticsInjector();
  useSeoScripts();
  useFaviconInjector();

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    window.lenisInstance = lenis;
    return () => {
      lenis.destroy();
      window.lenisInstance = null;
    };
  }, []);

  return (
    <GlobalDataProvider>
      <ScrollToTop />
      <ScrollToTopButton />
      <WhatsAppButton />
      <Navbar />
      {children}
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </GlobalDataProvider>
  );
}
