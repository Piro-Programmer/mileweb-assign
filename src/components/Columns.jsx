import React from "react";

export default function Columns({ artists, categories, current, onClick, onHover }) {
  return (
    <div className="absolute inset-0 flex items-center justify-between px-8 z-[3] pointer-events-none">
      <div className="w-1/3 pointer-events-auto">
        <div className="flex flex-col gap-2 text-[rgba(245,245,245,0.9)]">
          {artists.map((name, i) => (
            <div
              key={i}
              onClick={() => onClick(i)}
              onMouseEnter={() => onHover()}
              className={`relative cursor-pointer transition-all duration-500 ${current === i ? "opacity-100 translate-x-2 pl-4" : "opacity-30 hover:opacity-100"}`}
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/3 flex justify-center pointer-events-none">
        {/* center reserved for Featured */}
      </div>

      <div className="w-1/3 flex justify-end pointer-events-auto">
        <div className="flex flex-col gap-2 text-[rgba(245,245,245,0.9)] text-right">
          {categories.map((name, i) => (
            <div
              key={i}
              onClick={() => onClick(i)}
              onMouseEnter={() => onHover()}
              className={`relative cursor-pointer transition-all duration-500 ${current === i ? "opacity-100 -translate-x-2 pr-4" : "opacity-30 hover:opacity-100"}`}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
