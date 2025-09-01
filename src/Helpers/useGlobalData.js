// useGlobalData.js
import { useContext } from "react";
import { GlobalDataContext } from "./GlobalDataContext"; // ✅ fix path

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);
  if (context === undefined) {
    throw new Error("useGlobalData must be used within a GlobalDataProvider");
  }
  return context;
};
