import React from "react";
import './SVG.css'

export default function ArrowDown(props) {
  return (
    <svg
      width="35"
      height="20"
      viewBox="0 0 18 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 0L17.6603 15H0.339746L9 0Z" className={props.phil} />
    </svg>
  );
}
