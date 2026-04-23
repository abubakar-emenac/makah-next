"use client";

import AppShell from "./AppShell";
import dynamic from "next/dynamic";

const routeComponents = {
  home: dynamic(() => import("../MainPages/CommonPages/HomePage"), { ssr: false }),
  visa: dynamic(() => import("../MainPages/CommonPages/VisaPage"), { ssr: false }),
  customization: dynamic(() => import("../Components/CommonComponents/CustomizationForm"), { ssr: false }),
  about: dynamic(() => import("../MainPages/CommonPages/AboutPage"), { ssr: false }),
  terms: dynamic(() => import("../MainPages/CommonPages/T&CPage"), { ssr: false }),
  privacy: dynamic(() => import("../MainPages/CommonPages/PrivacyPolicy"), { ssr: false }),
  cookies: dynamic(() => import("../MainPages/CommonPages/CookiesPolicy"), { ssr: false }),
  contact: dynamic(() => import("../MainPages/CommonPages/ContactUs"), { ssr: false }),
  customizePackage: dynamic(() => import("../Components/CommonComponents/CustomizePackageForm"), { ssr: false }),
  slugPage: dynamic(() => import("../Hooks/PageNavigator"), { ssr: false }),
  umrahDetail: dynamic(() => import("../MainPages/UmrahPages/UmrahDetail"), { ssr: false }),
  hajjDetail: dynamic(() => import("../MainPages/HajjPackages/HajjDetail"), { ssr: false }),
  thankYou: dynamic(() => import("../MainPages/CommonPages/ThankYouPage"), { ssr: false }),
  blogHome: dynamic(() => import("../MainPages/BlogComponents/Bloghome"), { ssr: false }),
  blogDetail: dynamic(() => import("../MainPages/BlogComponents/BlogDetails"), { ssr: false }),
  notFound: dynamic(() => import("../MainPages/CommonPages/NotFound"), { ssr: false }),
};

export default function RouteClientRenderer({ route }) {
  const Component = routeComponents[route] || routeComponents.notFound;
  return (
    <AppShell>
      <Component />
    </AppShell>
  );
}
