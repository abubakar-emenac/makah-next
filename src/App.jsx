import Home from "./Pages/CommonPages/HomePage"
import Footer from "./Components/CommonComponents/Footer"
import { Routes, Route, Navigate } from "react-router-dom"
import NotFound from "./Pages/CommonPages/NotFound"
import SpecificCategoryUmrah from "./Pages/UmrahPages/SpecificCategoryUmrah"
import AboutPage from "./Pages/CommonPages/AboutPage"
import BestUmrahDeals from "./Pages/UmrahPages/BestUmrahDeals"
import UmrahPackageStar from "./Pages/UmrahPages/UmrahPackageStar"
import UmrahLayout from "./Pages/UmrahPages/UmrahLayout "
import CustomizationForm from "./Components/CommonComponents/CustomizationForm"
import HajjPackage from "./Pages/HajjPackages/HajjPackage"
import { Toaster } from "react-hot-toast";
import VisaPage from "./Pages/CommonPages/VisaPage"
import AnalyticsInjector from "./Hooks/AnalyticsInjector";
import useSeoScripts from "./Hooks/useSeoScripts";
import useFaviconInjector from "./Hooks/useFaviconInjector";
import useGlobalSettingsInjector from "./Hooks/useGlobalSettingsInjector";
import HajjDetail from "./Pages/HajjPackages/HajjDetail "
import Bloghome from "./Pages/BlogComponents/Bloghome"
import BlogDetails from "./Pages/BlogComponents/BlogDetails"

function App() {


    useGlobalSettingsInjector();
  // usePageMetaInjector();
  AnalyticsInjector();
  useSeoScripts();
  useFaviconInjector();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/visa"
          element={<VisaPage />}
        />
        <Route
          path="/customization"
          element={<CustomizationForm />}
        />
        <Route
          path="/umrah"
          element={<SpecificCategoryUmrah />}
        />
        <Route
          path="/hajj"
          element={<HajjPackage />}
        />
        <Route
          path="/about-us"
          element={<AboutPage />}
        />
        <Route
          path="/umrah/3-star-umrah-packages"
          element={<UmrahPackageStar />}
        />
        <Route
          path="/umrah/:slug"
          element={< UmrahLayout key="umrah-detail" />}
        />
        <Route
          path="/hajj/:slug"
          element={<HajjDetail />}
        />
            <Route path="/blog" element={<Bloghome />} />
            <Route path="/blog/:page_url" element={<BlogDetails />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
   


      </Routes>
      <Footer />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Global default styles
          style: {
            fontFamily: "Montserrat, sans-serif",
            fontSize: "14px",
            borderRadius: "12px",
            background: "#1f2937", // dark gray
            color: "#fff",
          },
          success: {
            style: {
              background: "#16a34a", // green
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#16a34a",
            },
          },
          error: {
            style: {
              background: "#dc2626", // red
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
