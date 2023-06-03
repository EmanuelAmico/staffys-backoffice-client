"use client";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import "../styles/SwitchButton.css";

export interface SwitchButtonProps extends ComponentPropsWithoutRef<"button"> {
  isSwitched: boolean;
}
const SwitchButton: React.FC<SwitchButtonProps> = ({
  isSwitched,
  onClick,
  ...buttonProps
}) => {
  const [railAnimation, setRailAnimation] = useState("rail-animation-disable");
  const [circleAnimation, setCirlceAnimation] = useState(
    "circle-animation-disable"
  );

  useEffect(() => {
    if (isSwitched) {
      setRailAnimation("rail-animation-active");
      setCirlceAnimation("circle-animation-active");
    } else {
      setRailAnimation("rail-animation-disable");
      setCirlceAnimation("circle-animation-disable");
    }
  }, [isSwitched]);

  return (
    <button onClick={onClick} className="button" {...buttonProps}>
      <div className={`rail ${railAnimation}`}></div>
      <div className={`circle ${circleAnimation}`}></div>
    </button>
  );
};

export default SwitchButton;
