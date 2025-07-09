import React from "react";
import { useNavigate } from "react-router-dom";


const colorClasses = {
  primary: "bg-[#DB9E30] text-white",
  secondary: "bg-[#57A68F] text-white",
};

const ViewAllButton = ({ label='View All Packages', color = "secondary", icon='/svg/(View All Packages) Arrow SVG.svg', slug }) => {
    const navigate = useNavigate();
  return (
    <button
    onClick={() => navigate(slug)}
      className={`inline-flex cursor-pointer items-center justify-between gap-5 rounded-full py-2 font-semibold shadow-md transition-all duration-300 hover:opacity-90 ${colorClasses[color]}`}
    >
      <span className="font-semibold text-white text-[18px] pl-4" >{label}</span>

      <span className=" w-10 h-10 rounded-full flex items-center justify-center mr-1.5">
        {icon ? (
          typeof icon === "string" ? (
            <img src={icon} alt="icon" className="w-12 h-12" />
          ) : (
            icon
          )
        ) : null}
      </span>
    </button>
  );
};



export default ViewAllButton;
