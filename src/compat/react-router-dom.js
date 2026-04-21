"use client";

import NextLink from "next/link";
import { useParams as useNextParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Link({ to, href, children, ...props }) {
  return (
    <NextLink href={href ?? to ?? "/"} {...props}>
      {children}
    </NextLink>
  );
}

export function useNavigate() {
  const router = useRouter();
  return (to, options = {}) => {
    if (typeof to === "number") {
      if (to < 0) router.back();
      return;
    }
    if (options.replace) router.replace(to);
    else router.push(to);
  };
}

export function useLocation() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [hash, setHash] = useState("");
  useEffect(() => {
    if (typeof window === "undefined") return;
    setSearch(window.location.search || "");
    setHash(window.location.hash || "");
  }, [pathname]);
  return { pathname, search, hash };
}

export function useParams() {
  return useNextParams();
}

export function Navigate({ to, replace = false }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, replace, to]);
  return null;
}

export function BrowserRouter({ children }) {
  return children;
}

export function Routes({ children }) {
  return children;
}

export function Route() {
  return null;
}
