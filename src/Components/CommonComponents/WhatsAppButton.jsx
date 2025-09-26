import React from "react";
import { useGlobalData } from "../../Helpers/useGlobalData";

const WhatsAppButton = () => {
    const { globalData } = useGlobalData();
    const whatsappObj = globalData?.result?.global_variables?.find(
        (item) => item.code === "[%WHATSAPP%]"
      );
      const whatsappNumber = whatsappObj?.code_value || "";
      const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "#";


  return (
      <div className="fixed bottom-4 left-4 z-50 lg:hidden"> 
      {/* 👆 changed right-4 → left-4 */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 flex-row-reverse"
      >

        {/* WhatsApp icon */}
        <div className="w-14 h-14 rounded-full shadow-lg bg-green-500 flex items-center justify-center animate-bounce">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-8 h-8"
          />
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;
