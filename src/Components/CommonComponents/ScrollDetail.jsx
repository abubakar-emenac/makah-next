// import React from 'react';
// import '../../CSS/ScrollDetail.css';

// export default function ScrollDetail({ description }) {
//     const safeDescription = typeof description === 'string' ? description : '';

//     // Extract <figure><img/></figure> tag separately
//     const imgMatch = safeDescription.match(/<figure[^>]*>.*?<img[^>]*src="([^"]+)"[^>]*>.*?<\/figure>/);
//     const extractedImageUrl = imgMatch ? imgMatch[1] : null;

//     // Remove <figure> from description
//     const cleanedDescription = safeDescription.replace(/<figure[^>]*>.*?<\/figure>/g, '');

//     // Parse HTML content into React elements
//     const parseHTML = (htmlString) => {
//         if (typeof window === 'undefined') return null;

//         const parser = new DOMParser();
//         const doc = parser.parseFromString(htmlString, 'text/html');
//         const elements = Array.from(doc.body.childNodes);
//         const style = { fontFamily: 'Montserrat' };

//         return elements.map((el, idx) => {
//             if (el.nodeType === 1) {
//                 switch (el.tagName.toLowerCase()) {
//                     case 'h1':
//                         return <h1 key={idx} className="text-[32px] font-bold mb-1" style={style}>{el.textContent}</h1>;
//                     case 'h2':
//                         return <h2 key={idx} className="text-[30px] font-bold mb-1" style={style}>{el.textContent}</h2>;
//                     case 'h3':
//                         return <h3 key={idx} className="text-[28px] font-semibold mb-1" style={style}>{el.textContent}</h3>;
//                     case 'h4':
//                         return <h4 key={idx} className="text-[26px] font-medium mb-1" style={style}>{el.textContent}</h4>;
//                     case 'h5':
//                         return <h5 key={idx} className="text-[24px] font-medium mb-1" style={style}>{el.textContent}</h5>;
//                     case 'h6':
//                         return <h6 key={idx} className="text-[22px] font-medium mb-1" style={style}>{el.textContent}</h6>;
//                     case 'p':
//                         return <p key={idx} className="text-[17px] leading-relaxed mb-3" style={style}>{el.textContent}</p>;
//                     case 'span':
//                         return <span key={idx} className="text-[17px] leading-relaxed mb-3 block" style={style}>{el.textContent}</span>;
//                     case 'ul':
//                         return (
//                             <ul key={idx} className="list-disc pl-6 mb-3" style={style}>
//                                 {Array.from(el.childNodes).map((li, i) => (
//                                     li.nodeType === 1 && li.tagName.toLowerCase() === 'li' ? (
//                                         <li key={i} className="text-[17px] leading-relaxed mb-1" style={style}>{li.textContent}</li>
//                                     ) : null
//                                 ))}
//                             </ul>
//                         );
//                     case 'li':
//                         return <li key={idx} className="text-[17px] leading-relaxed mb-1" style={style}>{el.textContent}</li>;
//                     default:
//                         return null;
//                 }
//             } else if (el.nodeType === 3 && el.textContent.trim()) {
//                 return <p key={idx} className="text-[17px] mb-2" style={style}>{el.textContent}</p>;
//             }
//             return null;
//         });
//     };

//     const parsedContent = parseHTML(cleanedDescription);

//     return (
//         <div className="flex flex-col p-6 bg-white w-full">
//             {/* Top Image */}
//             <div className="w-full mb-6">
//                 {extractedImageUrl ? (
//                     <img
//                         src={extractedImageUrl}
//                         alt="Umrah"
//                         className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg"
//                     />
//                 ) : (
//                         <img
//                             src="/images/Layer 0.png"
//                             alt="Fallback Umrah"
//                             className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg"
//                         />
//                 )}
//             </div>


//             {/* Scrollable Text Content */}
//             <div className="max-h-[500px] overflow-y-auto scroll-smooth custom-scroll scrollbar-thin p-2">
//                 <div className='pl-5'>
//                 {parsedContent}
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import '../../CSS/ScrollDetail.css';

export default function ScrollDetail({ description }) {
    const [topImageUrl, setTopImageUrl] = useState(null);
    const [filteredDescription, setFilteredDescription] = useState('');

    useEffect(() => {
        if (typeof description !== 'string') return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(description, 'text/html');

        const figureImg = doc.querySelector('figure img');
        if (figureImg?.getAttribute('src')) {
            setTopImageUrl(figureImg.getAttribute('src'));
            figureImg.closest('figure')?.remove(); // Remove the <figure> tag
        }

        setFilteredDescription(doc.body.innerHTML);
    }, [description]);

    return (
        <div className=" rounded-[25px] p-[30px] flex flex-col">
            {/* Top Image */}
            {/* {topImageUrl ? (
                <div className="w-full mb-6 flex items-center justify-center">
                    <img
                        src={topImageUrl}
                        alt="Content illustration"
                        className="w-full max-h-[400px] object-contain rounded-xl"
                    />
                </div>
            ) : (
                <div className="text-gray-400 italic text-center mb-6">No image available</div>
            )} */}
            <div className="w-full mb-6 flex items-center justify-center">
                <img
                    src="/images/Layer 0.png"
                    alt="Content illustration"
                    className="w-full max-h-[400px] object-contain"
                />
            </div>

            {/* Full Width Content */}
            <div className="w-full">
                <div className="bg-white h-[500px] flex flex-col">
                    <div className="flex-1 overflow-y-auto scrollbar-thin" style={{ direction: 'rtl' }}>
                        <div
                            style={{ direction: 'ltr' }}
                            className="p-6 prose max-w-none font-quicksand"
                            dangerouslySetInnerHTML={{ __html: filteredDescription }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
