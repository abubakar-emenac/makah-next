import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import Lenis from "lenis";
import "../../CSS/ScrollDetail.css";

export default function ScrollDetail({ pageData }) {
    const [topImageUrl, setTopImageUrl] = useState(null);
    const [filteredDescription, setFilteredDescription] = useState("");
    const [topImageAlt, setTopImageAlt] = useState("");

    const decodeHtml = (html) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };
    const isMeaningfulContent = (html) => {
        // Remove HTML tags, whitespace, and non-breaking spaces
        const text = html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim();
        return text.length > 0;
    };

    useEffect(() => {
        if (!pageData) return;

        const rawHtml = pageData.scroll_description || pageData.description || "";
        if (!rawHtml.trim()) return;

        const decodedHtml = decodeHtml(rawHtml);
        const parser = new DOMParser();
        const doc = parser.parseFromString(decodedHtml, "text/html");

        const figureImg = doc.querySelector("figure img");
        if (figureImg) {
            const src = figureImg.getAttribute("src");
            const alt = figureImg.getAttribute("alt") || "";
            if (src) {
                setTopImageUrl(src);
                setTopImageAlt(alt);
            }
            figureImg.closest("figure")?.remove();
        }

        const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
        headings.forEach((h) => {
            h.style.display = "block";
            h.style.marginBottom = "5px";
        });

        // const cleanHtml = doc.body.innerHTML.trim();

        const cleanHtml = doc.body.innerHTML
            .replace(/<\/(?!h[1-6]\b)([^>]+)>/gi, (match) => match + "<br/>")
            .trim();

        if (isMeaningfulContent(cleanHtml)) {
            setFilteredDescription(cleanHtml);
        }
    }, [pageData]);

    if (!filteredDescription) {
        return null;
    }

    return (
        <div className="w-full lg:max-w-[75%] md:max-w-[85%] sm:max-w-[95%] max-w-[95%] mx-auto flex flex-col font-quicksand">
            {/* Top Image */}
            <div className="w-full">
                <img
                    src={topImageUrl || "/images/Layer 0.png"}
                    alt={topImageAlt || "Content illustration"}
                    className="w-full h-auto max-h-[250px] sm:max-h-[350px] object-fill"
                />
            </div>

            {/* Scrollable description */}
            <div className="w-full sm:px-6 md:px-1 mt-6 h-[500px] max-h-full" data-lenis-prevent>
                <div
                    className="custom-scrollbar prose font-Montserrat p-3"
                >
                    {parse(filteredDescription)}
                </div>
            </div>
        </div>
    );
}
