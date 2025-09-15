import Home from "./Pages/CommonPages/HomePage"
import Footer from "./Components/CommonComponents/Footer"
import { Routes, Route, Navigate } from "react-router-dom"
import NotFound from "./Pages/CommonPages/NotFound"
import SpecificCategoryUmrah from "./Pages/UmrahPages/SpecificCategoryUmrah"
import AboutPage from "./Pages/CommonPages/AboutPage"
import BestUmrahDeals from "./Pages/UmrahPages/BestUmrahDeals"
import UmrahPackageStar from "./Pages/UmrahPages/UmrahPackageStar"
import UmrahLayout from "./Pages/UmrahPages/UmrahLayout"
import CustomizationForm from "./Components/CommonComponents/CustomizationForm"
import HajjPackage from "./Pages/HajjPackages/HajjPackage"
import ContactPage from "./Components/CommonComponents/ContactPage"
import { Toaster } from "react-hot-toast";
import VisaPage from "./Pages/CommonPages/VisaPage"
import AnalyticsInjector from "./Hooks/AnalyticsInjector";
import useSeoScripts from "./Hooks/useSeoScripts";
import useFaviconInjector from "./Hooks/useFaviconInjector";
import useGlobalSettingsInjector from "./Hooks/useGlobalSettingsInjector";
import HajjDetail from "./Pages/HajjPackages/HajjDetail"
import UmrahDetail from "./Pages/UmrahPages/UmrahDetail"
import Bloghome from "./Pages/BlogComponents/Bloghome"
import BlogDetails from "./Pages/BlogComponents/BlogDetails"
import ContactUS from "./Pages/CommonPages/ContactUs"
import './App.css'
import PageNavigator from "./Hooks/PageNavigator"
import CustomizePackageForm from "./Components/CommonComponents/CustomizePackageForm"
import TnCpage from "./Pages/CommonPages/T&CPage"
import PrivacyPolicy from "./Pages/CommonPages/PrivacyPolicy"
import CookiePolicy from "./Pages/CommonPages/CookiesPolicy"
import ThankYou from "./Pages/CommonPages/ThankYouPage"
import Navbar from "./Components/CommonComponents/NavBar"
import ScrollToTopButton from "./Components/CommonComponents/ScrollToTopButton"

function App() {
  useGlobalSettingsInjector();
  // usePageMetaInjector();
  AnalyticsInjector();
  useSeoScripts();
  useFaviconInjector();

  return (
    <>
      <ScrollToTopButton />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route
          path="/hajj-and-umrah-visa"
          element={<VisaPage />}
        />
        <Route
          path="/customization"
          element={<CustomizationForm />}
        />
        <Route
          path="/about-us"
          element={<AboutPage />}
        />
        <Route
          path="/terms-and-conditions"
          element={<TnCpage />}
        />
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />
        <Route
          path="/cookies-policy"
          element={<CookiePolicy />}
        />
        <Route
          path="/contact-us"
          element={<ContactUS />}
        />
        <Route
          path="/customize-your-umrah"
          element={<CustomizePackageForm />}
        />
        <Route
          path="/:slug"
          element={<PageNavigator />}
        />
        <Route
          path="/umrah/:slug" element={<UmrahDetail />}
        />
        <Route
          path="/hajj/:slug"
          element={<HajjDetail />}
        />
        <Route
          path="/thank-you"
          element={<ThankYou />}
        />
        <Route path="/blog" element={<Bloghome />} />
        <Route path="/blog/:page_url" element={<BlogDetails />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontFamily: "Montserrat, sans-serif",
            fontSize: "14px",
            borderRadius: "12px",
            background: "#1f2937",
            color: "#fff",
          },
          success: {
            style: {
              background: "#16a34a",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#16a34a",
            },
          },
          error: {
            style: {
              background: "#dc2626",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#dc2626",
            },
          },
        }}
      />
    </>
  )
}

export default App
