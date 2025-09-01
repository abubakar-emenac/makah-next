// /Hooks/usePageMetaInjector.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../Helpers/apiEndpoints";
export default function usePageMetaInjector() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const pathSegments = path.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1] || "";

  useEffect(() => {
    const injectMeta = async () => {
      try {
        let metaData = null;

        // 1. Static Pages
        const staticPages = [
          "airlines.htm",
          "about-us.html",
          "contact-us.htm",
          "privacy-policy.html",
          "terms-and-conditions.html",
          "cookies-policy.html",
        ];
        if (staticPages.includes(lastSegment)) {
          const res = await axios.get(`${endpoints.getPage}?page_url=${staticPages}`);
          metaData = res.data?.result;
        }

        // 2. Airline Details
        else if (path.startsWith("/airline/")) {
          const airlineSlug = pathSegments[1];
          const res = await axios.get(endpoints.airlineDetails(airlineSlug));
          metaData = res.data?.result;
        }

        // 3. Holiday Country
        else if (path.startsWith("/holidays/") && lastSegment.endsWith(".html")) {
          const countrySlug = lastSegment.replace(".html", "");
          const res = await axios.get(endpoints.holidaysCountryDetailsBySlug(countrySlug));
          metaData = res.data?.result;
        }

        // 4. Holiday City
        else if (
          pathSegments.length === 2 &&
          !path.includes("/holidays/") &&
          lastSegment.endsWith(".html") &&
          !lastSegment.startsWith("flights-to")
        ) {
          const citySlug = lastSegment.replace(".html", "");
          const res = await axios.get(endpoints.holidaysCityDetailsBySlug(citySlug));
          metaData = res.data?.result;
        }

        // 5. Holiday Package Detail
        else if (path.startsWith("/holiday/") && lastSegment.endsWith(".html")) {
          const packageSlug = lastSegment.replace(".html", "");
          const res = await axios.get(endpoints.holidayPackageDetailsBySlug(packageSlug));
          metaData = res.data?.result;
        }

        // 6. Umrah Type Detail
        else if (path.startsWith("/umrah/") && lastSegment.endsWith(".html")) {
          const umrahSlug = lastSegment.replace(".html", "");
          const res = await axios.get(`${endpoints.umrahType}?umrah_slug=${umrahSlug}`);
          metaData = res.data?.result;
        }

        // 7. Destination Pages: flights-to-*
        else if (lastSegment.startsWith("flights-to-") && lastSegment.endsWith(".html")) {
          const cityName = lastSegment
            .replace("flights-to-", "")
            .replace(".html", "")
            .replace(/-/g, " ");
          const res = await axios.get(endpoints.CityFaresByCityName(cityName));
          metaData = res.data?.result;
        }

        // Inject tags
        if (metaData) {
          document.title = metaData.browser_title || metaData.title || "Emenac Travel";

          injectMeta("description", metaData.meta_description);
          injectMeta("keywords", metaData.meta_keywords);

          injectMeta("og:title", metaData.browser_title || metaData.title, true);
          injectMeta("og:description", metaData.meta_description, true);
          injectMeta("og:image", metaData.og_image, true);
          injectMeta("og:url", window.location.href, true);

          injectCanonical(window.location.href);
        }
      } catch (err) {
        console.error("Meta Injection Error:", err);
      }
    };

    injectMeta();
  }, [location.pathname]);
}

function injectMeta(name, content, isProperty = false) {
  if (!content) return;
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(isProperty ? "property" : "name", name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function injectCanonical(href) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}
