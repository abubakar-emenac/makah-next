import { useEffect, useRef } from "react"
import { useLocation } from "@navigation"
import NProgress from "nprogress"
import "nprogress/nprogress.css" // Import default styles

// Configure NProgress defaults
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  minimum: 0.08,
  easing: "ease",
  speed: 400,
});

/**
 * TopLoadingBar component provides a global NProgress loading bar 
 * for React Router navigation. It intercepts internal link clicks and 
 * handles browser back/forward buttons.
 */
export default function TopLoadingBar() {
  const location = useLocation();
  const prevPathnameRef = useRef("");

  useEffect(() => {
    // Intercept Link clicks
    const handleLinkClick = (e) => {
      // Only handle left clicks without modifiers
      if (e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;

      const target = e.target;
      const link = target.closest("a[href]");

      if (!link || !link.href) return;

      // Ignore links with target="_blank" or download attribute
      if (link.target === "_blank" || link.hasAttribute("download")) return;

      // Ignore specific triggers
      if (link.classList.contains("no-progress") || link.getAttribute("role") === "button") return;

      try {
        const url = new URL(link.href);
        const currentUrl = new URL(window.location.href);

        const isInternal = url.origin === currentUrl.origin;
        const isSamePath = url.pathname === currentUrl.pathname;
        const isSameSearch = url.search === currentUrl.search;
        const isHash = !!url.hash;

        // If it's an internal link leading to a different path/search (not just a hash)
        if (isInternal && (!isSamePath || !isSameSearch) && !isHash) {
          NProgress.start();
        }
      } catch (err) {
        // Ignore invalid URLs
      }
    };

    // Complete loading when route changes
    if (prevPathnameRef.current !== location.pathname) {
      NProgress.done();
      prevPathnameRef.current = location.pathname;
    }

    // Listen for link clicks in bubble phase
    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
      NProgress.done(); // Ensure it finishes on unmount
    };
  }, [location.pathname, location.search]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      NProgress.start();
      setTimeout(() => NProgress.done(), 400);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return null;
}
