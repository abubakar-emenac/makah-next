"use client";

import AppShell from "./AppShell";
import dynamic from "next/dynamic";

const routeComponents = {
  home: dynamic(() => import("../Pages/CommonPages/HomePage"), { ssr: false }),
  visa: dynamic(() => import("../Pages/CommonPages/VisaPage"), { ssr: false }),
  customization: dynamic(() => import("../Components/CommonComponents/CustomizationForm"), { ssr: false }),
  about: dynamic(() => import("../Pages/CommonPages/AboutPage"), { ssr: false }),
  terms: dynamic(() => import("../Pages/CommonPages/T&CPage"), { ssr: false }),
  privacy: dynamic(() => import("../Pages/CommonPages/PrivacyPolicy"), { ssr: false }),
  cookies: dynamic(() => import("../Pages/CommonPages/CookiesPolicy"), { ssr: false }),
  contact: dynamic(() => import("../Pages/CommonPages/ContactUs"), { ssr: false }),
  customizePackage: dynamic(() => import("../Components/CommonComponents/CustomizePackageForm"), { ssr: false }),
  slugPage: dynamic(() => import("../Hooks/PageNavigator"), { ssr: false }),
  umrahDetail: dynamic(() => import("../Pages/UmrahPages/UmrahDetail"), { ssr: false }),
  hajjDetail: dynamic(() => import("../Pages/HajjPackages/HajjDetail"), { ssr: false }),
  thankYou: dynamic(() => import("../Pages/CommonPages/ThankYouPage"), { ssr: false }),
  blogHome: dynamic(() => import("../Pages/BlogComponents/Bloghome"), { ssr: false }),
  blogDetail: dynamic(() => import("../Pages/BlogComponents/BlogDetails"), { ssr: false }),
  notFound: dynamic(() => import("../Pages/CommonPages/NotFound"), { ssr: false }),
};

export default function RouteClientRenderer({ route }) {
  const Component = routeComponents[route] || routeComponents.notFound;
  return (
    <AppShell>
      <Component />
    </AppShell>
  );
}
