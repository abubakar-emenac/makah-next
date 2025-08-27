// Loader.tsx
import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
