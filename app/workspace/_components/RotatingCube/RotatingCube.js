"use client";

import React from "react";
import "./RotatingCube.css"; // we'll add the styles here

const RotatingCube = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center z-0">
      <div className="cube relative w-[150px] h-[150px]">
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face right"></div>
        <div className="face left"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
      </div>
    </div>
  );
};

export default RotatingCube;
