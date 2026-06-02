"use client";


import { Suspense, useContext } from "react";
import dynamic from "next/dynamic";
import Navbar from "../Components/CommonComponents/NavBar";
import PageScript from "../Components/CommonComponents/PageScript";
import TopLoadingBar from "../Components/CommonComponents/TopLoadingBar";
import { GlobalDataContext } from "../Helpers/GlobalDataContext";
import { Toaster } from "sonner";
import SkeletonLoaderShell from "../Components/CommonComponents/SkeletonLoaderShell";

const Footer = dynamic(() => import("../Components/CommonComponents/Footer"));
const ScrollToTop = dynamic(() => import("../Components/CommonComponents/ScrollToTop"), { ssr: false });
const ScrollToTopButton = dynamic(() => import("../Components/CommonComponents/ScrollToTopButton"), { ssr: false });
const WhatsAppButton = dynamic(() => import("../Components/CommonComponents/WhatsAppButton"), { ssr: false });

export default function AppShell({ children }) {
  const { globalData } = useContext(GlobalDataContext) || {};



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
    <>
      <TopLoadingBar />
      <PageScript html={seoTagSetting?.contents} ownerKey="global-header-seo" />
      <PageScript html={analyticsSetting?.contents} ownerKey="global-analytics" />
      <PageScript html={endBodySetting?.contents} ownerKey="global-end-body" />
      <PageScript html={faviconHtml} ownerKey="global-favicon" />

      <ScrollToTop />
      <ScrollToTopButton />
      <WhatsAppButton />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <SkeletonLoaderShell>
            {children}
          </SkeletonLoaderShell>
        </main>
        <Footer />
      </div>
      <Toaster position="bottom-right" richColors />
    </>
  );
}
