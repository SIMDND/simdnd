import React from "react";
import "./SVG.css";

export default function ArrowDown(props) {
  return (
    <svg
      width="26"
      height="23"
      viewBox="0 0 26 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter={props.phil !== "disabled"? "url(#filter0_d)": null}>
        <path d="M12 16L3.33974 1L20.6603 1L12 16Z" className={props.phil} />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0.339745"
          y="0"
          width="25.3205"
          height="23"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="1" dy="3" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
