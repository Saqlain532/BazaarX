import React from "react";

const BazaarXLogo = ({ width = 100, height = 100 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 860 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bazaarGreen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
      </defs>
      <g transform="skewX(-12)">
        <text
          x="0"
          y="120"
          fontFamily="Poppins, Arial, sans-serif"
          fontSize="200"
          fontWeight="700"
          fontStyle="italic"
          fill="url(#bazaarGreen)"
          letterSpacing="2"
        >
          BazaarX
        </text>
      </g>
    </svg>
  );
};

export default BazaarXLogo;
