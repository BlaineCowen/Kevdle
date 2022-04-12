import React from "react";

const PlayCircle = ({ size = 24, color = "#000000" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        >


        <polygon points="10 8 16 12 10 16 10 8" fill="black"/>

    </svg>

  </svg>
);

export default PlayCircle;
