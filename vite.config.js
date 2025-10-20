import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import axios from "axios";
import { BASE_URL_SVG_PUBLIC, endpoints } from "./src/Helpers/apiEndpoints";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: "inject-favicon",
      async transformIndexHtml(html) {
        try {
          const res = await axios.get(endpoints.generalSettings);
          const favicon = res.data?.result?.settings?.find(
            (s) => s.ref_name === "Website Logo"
          )?.contents?.favicon;

          const faviconUrl = favicon
            ? `${BASE_URL_SVG_PUBLIC}${favicon}`
            : "/svg/makkahtravel_favicon.png";

          return html.replace(/%FAVICON%/g, faviconUrl);
        } catch (e) {
          console.error("Error fetching favicon", e);
          return html.replace(/%FAVICON%/g, "/svg/makkahtravel_favicon.png");
        }
      },
    },
  ],
});
