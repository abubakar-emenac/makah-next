import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL_SVG } from "../../Helpers/apiEndpoints";

const colorClasses = {
  primary: "bg-[#DB9E30] text-white",
  secondary: "bg-[#57A68F] text-white",
};

const sizeClasses = {
  sm: {
    text: "text-[14px] pl-3",
    iconWrapper: "w-8 h-8 mr-1.5",
    icon: "w-10 h-10",
    padding: "py-1",
  },
  md: {
    text: "text-[16px] pl-4",
    iconWrapper: "w-10 h-10 mr-1.5",
    icon: "w-12 h-12",
    padding: "py-2",
  },
  lg: {
    text: "text-[18px] pl-4",
    iconWrapper: "w-12 h-12 mr-1.5",
    icon: "w-14 h-14",
    padding: "py-3",
  },
};

const ViewAllButton = ({
  label = "View All Packages",
  color = "secondary",
  icon = "/svgs/(View All Packages) Arrow SVG.svg",
  slug,
  textColor = 'white',
  size = "md",
  onClick, // 👈 optional custom click handler
}) => {
  const { text, iconWrapper, icon: iconSize, padding } = sizeClasses[size] || sizeClasses["md"];

  const linkUrl = slug ? `/${slug}` : "#";
  return (
    <Link
      to={linkUrl}
      onClick={onClick}
      className={`inline-flex font-Montserrat cursor-pointer items-center justify-between gap-5 rounded-full font-semibold shadow-md transition-all duration-300 hover:opacity-90 ${padding} ${colorClasses[color]}`}
    >
      <span className={`font-semibold text-${textColor} ${text}`}>{label}</span>

      <span className={`rounded-full flex items-center justify-center ${iconWrapper}`}>
        {icon ? (
          typeof icon === "string" ? (
            <img src={`${BASE_URL_SVG}/assets/${icon}`} alt="icon" className={iconSize} fetchPriority="high" />
          ) : (
            icon
          )
        ) : null}
      </span>
    </Link>
  );
};

export default ViewAllButton;
