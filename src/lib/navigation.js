"use client";

import NextLink from "next/link";
import { useParams as useNextParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Link({ to, href, children, ...props }) {
  const targetHref = href ?? to ?? "/";
  const isExternalLike =
    typeof targetHref === "string" && /^(https?:|mailto:|tel:|#)/i.test(targetHref);

  if (isExternalLike) {
    return (
      <a href={targetHref} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={targetHref} {...props}>
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

    if (options.replace) {
      router.replace(to);
      return;
    }

    router.push(to);
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
