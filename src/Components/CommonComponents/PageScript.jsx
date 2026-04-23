import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function normalizeInlineScript(content) {
    return content.replace(/\r\n/g, "\n").trim();
}

function normalizeSeoTagsInBody() {
    if (typeof document === "undefined" || !document.body) return;

    // Meta tags are only valid in head for SEO. Move any misplaced tags.
    const bodyMetaTags = document.body.querySelectorAll("meta");
    bodyMetaTags.forEach((metaTag) => {
        document.head.appendChild(metaTag);
    });

    // Keep canonical/icon/alternate links in head as well.
    const bodySeoLinks = document.body.querySelectorAll(
        'link[rel="canonical"], link[rel="icon"], link[rel="shortcut icon"], link[rel="alternate"]'
    );
    bodySeoLinks.forEach((linkTag) => {
        document.head.appendChild(linkTag);
    });

    // Title should not remain inside body.
    const bodyTitles = document.body.querySelectorAll("title");
    bodyTitles.forEach((titleTag) => titleTag.remove());
}

// Global function to remove all page scripts - ensures cleanup happens synchronously
export function removeAllPageScripts() {
    if (typeof document === "undefined") return;
    const scripts = document.head.querySelectorAll("script[data-page-script-owner], meta[data-page-script-owner], link[data-page-script-owner]");
    scripts.forEach((s) => {
        if (s.parentNode) {
            s.remove();
        }
    });
}

// Helper to check if a script already exists in head
function scriptExists(content, type) {
    if (typeof document === "undefined") return false;
    const existingScripts = document.head.querySelectorAll("script");
    for (const script of existingScripts) {
        if (type && script.getAttribute("type") !== type) continue;
        const existingContent = normalizeInlineScript(script.innerHTML || "");
        const normalizedContent = normalizeInlineScript(content);
        if (existingContent === normalizedContent && existingContent !== "") {
            return true;
        }
    }
    return false;
}

export default function PageScript({ html, ownerKey }) {
    const location = useLocation();
    const pathname = location.pathname;
    const scope = ownerKey || pathname || "unknown";
    const elementsRef = useRef([]);
    const previousScopeRef = useRef("");

    useEffect(() => {
        normalizeSeoTagsInBody();

        // Track current scope
        const currentScope = scope;
        previousScopeRef.current = currentScope;

        // If no script provided, return
        if (!html || typeof html !== "string" || html.trim() === "") {
            return;
        }

        // Parse the provided HTML to find tags
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html.trim();
        const elements = tempDiv.querySelectorAll("script, meta, link");

        if (elements.length === 0) {
            return;
        }

        // Create elements in <head>
        elements.forEach((oldEl) => {
            if (previousScopeRef.current !== currentScope) return;

            const tagName = oldEl.tagName.toLowerCase();
            const newEl = document.createElement(tagName);

            // Mark ownership
            newEl.dataset.pageScriptOwner = currentScope;

            // Copy all attributes
            Array.from(oldEl.attributes).forEach((attr) => {
                newEl.setAttribute(attr.name, attr.value);
            });

            if (tagName === 'script') {
                const originalSrc = oldEl.getAttribute("src");
                if (!originalSrc) {
                    const content = normalizeInlineScript(oldEl.innerHTML || "");
                    if (content) {
                        if (scriptExists(content, oldEl.getAttribute("type") || undefined)) {
                            return;
                        }
                        newEl.text = content;
                    }
                } else {
                    const existing = document.head.querySelector(`script[src="${CSS.escape(originalSrc)}"]`);
                    if (existing) return;
                }
            } else if (tagName === 'meta') {
                const name = oldEl.getAttribute('name');
                const content = oldEl.getAttribute('content');
                const property = oldEl.getAttribute('property');

                let selector = 'meta';
                if (name) selector += `[name="${CSS.escape(name)}"]`;
                else if (property) selector += `[property="${CSS.escape(property)}"]`;

                const existing = document.head.querySelector(selector);
                if (existing) {
                    // Avoid duplicate meta tags (e.g. Next metadata + page script meta).
                    // If an element from this scope already exists, just keep it updated.
                    if (existing.dataset.pageScriptOwner === currentScope) {
                        if (content) {
                            existing.setAttribute('content', content);
                        }
                        return;
                    }
                    // A meta tag with same key already exists from another source; do not duplicate.
                    return;
                }
            } else if (tagName === 'link') {
                const rel = oldEl.getAttribute('rel');
                const href = oldEl.getAttribute('href');
                const existing = document.head.querySelector(`link[rel="${CSS.escape(rel || '')}"][href="${CSS.escape(href || '')}"]`);
                if (existing) return;
            }

            if (previousScopeRef.current === currentScope) {
                document.head.appendChild(newEl);
                elementsRef.current.push(newEl);
            }
        });

        return () => {
            // Cleanup elements added by this instance
            elementsRef.current.forEach((el) => {
                if (el && el.parentNode) {
                    el.remove();
                }
            });
            elementsRef.current = [];

            // Safety cleanup for this scope
            if (previousScopeRef.current === scope) {
                document.head
                    .querySelectorAll(`[data-page-script-owner="${CSS.escape(scope)}"]`)
                    .forEach((el) => el.remove());
            }

            normalizeSeoTagsInBody();
        };
    }, [html, scope, pathname]);

    return null;
}
