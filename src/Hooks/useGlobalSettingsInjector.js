// src/Hooks/useGlobalSettingsInjector.js
import { useEffect, useRef } from "react";
import axios from "axios";
import { endpoints } from "../Helpers/apiEndpoints";

// TTL Helpers
const TTL_KEY = "general_settings";
const TTL_DURATION = 60 * 60 * 1000;

const getCachedSettings = () => {
  const raw = localStorage.getItem(TTL_KEY);
  if (!raw) return null;

  try {
    const { value, expiry } = JSON.parse(raw);
    if (Date.now() > expiry) {
      localStorage.removeItem(TTL_KEY);
      return null;
    }
    return value;
  } catch {
    localStorage.removeItem(TTL_KEY);
    return null;
  }
};

const setCachedSettings = (value) => {
  localStorage.setItem(
    TTL_KEY,
    JSON.stringify({ value, expiry: Date.now() + TTL_DURATION })
  );
};

const useGlobalSettingsInjector = () => {
  const hasInjected = useRef(false);

  useEffect(() => {
    if (hasInjected.current) return;
    hasInjected.current = true;

    const injectSettings = async () => {
      try {
        let settings = getCachedSettings();

        if (!settings) {
          const res = await axios.get(endpoints.generalSettings);
          settings = res.data?.result?.settings || [];
          setCachedSettings(settings);
        }

        // === FAVICON ===
        const logoSetting = settings.find((s) => s.ref_name === "Website Logo");
        const faviconPath = logoSetting?.contents?.favicon;

        if (faviconPath) {
          document
            .querySelectorAll("link[rel*='icon']")
            .forEach((el) => el.parentNode.removeChild(el));

          const link = document.createElement("link");
          link.rel = "icon";
          link.href = faviconPath;
          link.type = "image/png";
          document.head.appendChild(link);
          // console.log("✅ Favicon injected.");
        }

        // === GOOGLE ANALYTICS ===
        const analyticsSetting = settings.find((setting) =>
          setting.ref_name.toLowerCase().includes("google analytics")
        );

        if (analyticsSetting?.is_active && analyticsSetting?.contents) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(
            analyticsSetting.contents,
            "text/html"
          );
          const scriptTags = doc.querySelectorAll("script");

          scriptTags.forEach((originalScript) => {
            const script = document.createElement("script");
            if (originalScript.src) {
              script.src = originalScript.src;
              script.async = originalScript.async ?? true;
              script.defer = originalScript.defer ?? true;
            } else {
              script.textContent = originalScript.textContent;
            }
            document.head.appendChild(script);
          });

          // console.log("✅ Google Analytics script(s) injected.");
        }

        // === SEO META TAGS IN HEADER ===
        const seoHeaderSetting = settings.find(
          (item) => item.ref_name === "SEO Meta Tags in Header" && item.is_active
        );

        if (seoHeaderSetting?.contents) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = seoHeaderSetting.contents;

          const nodes = Array.from(tempDiv.childNodes);

          nodes.forEach((node) => {
            if (node.tagName === "META") {
              const existing = document.head.querySelector(
                `meta[name="${node.getAttribute("name")}"]`
              );
              if (existing) {
                existing.setAttribute("content", node.getAttribute("content"));
              } else {
                document.head.appendChild(node);
              }
            } else if (node.tagName === "SCRIPT") {
              const script = document.createElement("script");
              Array.from(node.attributes).forEach((attr) =>
                script.setAttribute(attr.name, attr.value)
              );
              script.innerHTML = node.innerHTML;
              document.head.appendChild(script);
            }
          });
          // console.log("✅ SEO Meta Tags in Header injected");
        }

        // === SEO SCRIPTS ===
        const seoSetting = settings.find(
          (item) =>
            item.ref_name ===
            "SEO Tracking or Other Scripts in the End of Body Tag" &&
            item.is_active
        );

        if (seoSetting?.contents) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = seoSetting.contents;

          const nodes = Array.from(tempDiv.childNodes);
          const appendedNodes = [];

          nodes.forEach((node) => {
            if (node.tagName === "SCRIPT") {
              const script = document.createElement("script");
              Array.from(node.attributes).forEach((attr) =>
                script.setAttribute(attr.name, attr.value)
              );
              script.innerHTML = node.innerHTML;
              document.body.appendChild(script);
              appendedNodes.push(script);
            } else {
              document.body.appendChild(node);
              appendedNodes.push(node);
            }
          });

          // Cleanup on unmount
          return () => {
            appendedNodes.forEach((n) => {
              if (document.body.contains(n)) {
                document.body.removeChild(n);
              }
            });
          };
        }
      } catch (err) {
        console.error("❌ Failed to inject global settings:", err);
      }
    };

    injectSettings();
  }, []);
};

export default useGlobalSettingsInjector;
