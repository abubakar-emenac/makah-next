import React from 'react';
import '../../CSS/ScrollDetail.css';

export default function ScrollDetail({ description }) {
    const safeDescription = typeof description === 'string' ? description : '';

    // Extract <figure><img/></figure> tag separately
    const imgMatch = safeDescription.match(/<figure[^>]*>.*?<img[^>]*src="([^"]+)"[^>]*>.*?<\/figure>/);
    const extractedImageUrl = imgMatch ? imgMatch[1] : null;

    // Remove <figure> from description
    const cleanedDescription = safeDescription.replace(/<figure[^>]*>.*?<\/figure>/g, '');

    // Parse HTML content into React elements
    const parseHTML = (htmlString) => {
        if (typeof window === 'undefined') return null;

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const elements = Array.from(doc.body.childNodes);
        const style = { fontFamily: 'Montserrat' };

        return elements.map((el, idx) => {
            if (el.nodeType === 1) {
                switch (el.tagName.toLowerCase()) {
                    case 'h1':
                        return <h1 key={idx} className="text-[32px] font-bold mb-1" style={style}>{el.textContent}</h1>;
                    case 'h2':
                        return <h2 key={idx} className="text-[30px] font-bold mb-1" style={style}>{el.textContent}</h2>;
                    case 'h3':
                        return <h3 key={idx} className="text-[28px] font-semibold mb-1" style={style}>{el.textContent}</h3>;
                    case 'h4':
                        return <h4 key={idx} className="text-[26px] font-medium mb-1" style={style}>{el.textContent}</h4>;
                    case 'h5':
                        return <h5 key={idx} className="text-[24px] font-medium mb-1" style={style}>{el.textContent}</h5>;
                    case 'h6':
                        return <h6 key={idx} className="text-[22px] font-medium mb-1" style={style}>{el.textContent}</h6>;
                    case 'p':
                        return <p key={idx} className="text-[17px] leading-relaxed mb-3" style={style}>{el.textContent}</p>;
                    case 'span':
                        return <span key={idx} className="text-[17px] leading-relaxed mb-3 block" style={style}>{el.textContent}</span>;
                    case 'ul':
                        return (
                            <ul key={idx} className="list-disc pl-6 mb-3" style={style}>
                                {Array.from(el.childNodes).map((li, i) => (
                                    li.nodeType === 1 && li.tagName.toLowerCase() === 'li' ? (
                                        <li key={i} className="text-[17px] leading-relaxed mb-1" style={style}>{li.textContent}</li>
                                    ) : null
                                ))}
                            </ul>
                        );
                    case 'li':
                        return <li key={idx} className="text-[17px] leading-relaxed mb-1" style={style}>{el.textContent}</li>;
                    default:
                        return null;
                }
            } else if (el.nodeType === 3 && el.textContent.trim()) {
                return <p key={idx} className="text-[17px] mb-2" style={style}>{el.textContent}</p>;
            }
            return null;
        });
    };

    const parsedContent = parseHTML(cleanedDescription);

    return (
        <div className="flex flex-col border-[2px] border-[#710C5C] rounded-[25px] p-6 bg-white w-full">
            {/* Top Image */}
            <div className="w-full mb-6">
                {extractedImageUrl ? (
                    <img
                        src={extractedImageUrl}
                        alt="Umrah"
                        className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg"
                    />
                ) : (
                    <div className="text-gray-400 italic text-center">No image available</div>
                )}
            </div>

            {/* Scrollable Text Content */}
            <div className="max-h-[500px] overflow-y-auto scrollbar-thin p-2">
                {parsedContent}
            </div>
        </div>
    );
}
