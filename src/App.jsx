import { useEffect } from "react"
import Home from "./MainPages/CommonPages/HomePage"
import Footer from "./Components/CommonComponents/Footer"
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"
import NotFound from "./MainPages/CommonPages/NotFound"
import SpecificCategoryUmrah from "./MainPages/UmrahPages/SpecificCategoryUmrah"
import AboutPage from "./MainPages/CommonPages/AboutPage"
import UmrahPackageStar from "./MainPages/UmrahPages/UmrahPackageStar"
import UmrahLayout from "./MainPages/UmrahPages/UmrahLayout"
import CustomizationForm from "./Components/CommonComponents/CustomizationForm"
import HajjPackage from "./MainPages/HajjPackages/HajjPackage"
import ContactPage from "./Components/CommonComponents/ContactPage"
import { Toaster } from "sonner";
import VisaPage from "./MainPages/CommonPages/VisaPage"
import PageScript from "./Components/CommonComponents/PageScript";
import TopLoadingBar from "./Components/CommonComponents/TopLoadingBar";
import SkeletonLoaderShell from "./Components/CommonComponents/SkeletonLoaderShell";
import { GlobalDataContext } from "./Helpers/GlobalDataContext";
import HajjDetail from "./MainPages/HajjPackages/HajjDetail"
import UmrahDetail from "./MainPages/UmrahPages/UmrahDetail"
import Bloghome from "./MainPages/BlogComponents/Bloghome"
import BlogDetails from "./MainPages/BlogComponents/BlogDetails"
import ContactUS from "./MainPages/CommonPages/ContactUs"
import './App.css'
import PageNavigator from "./Hooks/PageNavigator"
import CustomizePackageForm from "./Components/CommonComponents/CustomizePackageForm"
import TnCpage from "./MainPages/CommonPages/T&CPage"
import PrivacyPolicy from "./MainPages/CommonPages/PrivacyPolicy"
import CookiePolicy from "./MainPages/CommonPages/CookiesPolicy"
import ThankYou from "./MainPages/CommonPages/ThankYouPage"
import Navbar from "./Components/CommonComponents/NavBar"
import ScrollToTopButton from "./Components/CommonComponents/ScrollToTopButton"
import Lenis from 'lenis'
import WhatsAppButton from "./Components/CommonComponents/WhatsAppButton"
import ScrollToTop from "./Components/CommonComponents/ScrollToTop"

import { useContext } from "react";

function App() {
  const { globalData } = useContext(GlobalDataContext);

  const location = useLocation();
  const navigate = useNavigate();



  // ✅ Normalize URL (collapse multiple slashes + remove trailing slash)
  const getNormalizedPath = (path) => {
    let normalized = path.replace(/\/{2,}/g, "/");
    if (normalized.length > 1 && normalized.endsWith("/")) {
      normalized = normalized.slice(0, -1);
    }
    return normalized;
  };

  const normalizedPath = getNormalizedPath(location.pathname);
  const isInvalidPath = location.pathname !== normalizedPath;

  useEffect(() => {
    if (isInvalidPath) {
      navigate(normalizedPath + location.search, { replace: true });
    }
  }, [isInvalidPath, normalizedPath, location.search, navigate]);

  // Initialize Lenis
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
    <>
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
        {!isInvalidPath && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/hajj-and-umrah-visa" element={<VisaPage />} />
            <Route path="/customization" element={<CustomizationForm />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/terms-and-conditions" element={<TnCpage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookies-policy" element={<CookiePolicy />} />
            <Route path="/contact-us" element={<ContactUS />} />
            <Route path="/customise-your-package" element={<CustomizePackageForm />} />
            <Route path="/:slug" element={<PageNavigator />} />
            <Route path="/umrah/:slug" element={<UmrahDetail />} />
            <Route path="/hajj/:slug" element={<HajjDetail />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/blog" element={<Bloghome />} />
            <Route path="/blog/:page_url" element={<BlogDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </SkeletonLoaderShell>
      <Footer />

      <Toaster position="bottom-right" richColors />
    </>
  )
}

export default App
