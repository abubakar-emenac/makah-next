// src/Hooks/useFaviconInjector.js
import { useEffect } from "react";
import axios from "axios";
import {
  BASE_URL_IMG,
  BASE_URL_SVG_PUBLIC,
  endpoints,
} from "../Helpers/apiEndpoints";

const useFaviconInjector = () => {
  useEffect(() => {
    const injectFavicon = async () => {
      try {
        const res = await axios.get(endpoints.generalSettings);

        // ✅ Correct setting: look for "Website Logo"
        const logoSetting = res.data?.result?.settings?.find(
          (item) => item.ref_name === "Website Logo"
        );

        const faviconPath = logoSetting?.contents?.favicon;
        // console.log("faviconPath:", faviconPath);

        if (faviconPath) {
          const faviconUrl = `${BASE_URL_SVG_PUBLIC}${faviconPath}`;

          // Remove existing favicons
          document
            .querySelectorAll("link[rel*='icon']")
            .forEach((el) => el.parentNode.removeChild(el));

          // Inject new favicon
          const link = document.createElement("link");
          link.rel = "icon";
          link.href = faviconUrl;
          link.type = "image/png";
          document.head.appendChild(link);
        } else {
          console.warn("Favicon path not found in Website Logo setting.");
        }
      } catch (error) {
        console.error("Failed to inject favicon:", error);
      }
    };

    injectFavicon();
  }, []);
};

export default useFaviconInjector;
