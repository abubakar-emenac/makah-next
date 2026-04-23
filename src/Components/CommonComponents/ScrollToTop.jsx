import { useEffect } from "react";
import { useLocation } from "@navigation";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(0, { duration: 0.8, easing: t => t });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
  }, [pathname]);

  return null;
}
