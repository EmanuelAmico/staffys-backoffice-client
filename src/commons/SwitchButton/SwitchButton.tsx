import React, { useEffect, useState } from "react";
import "./SwitchButton.css";
export interface ISwitchButton {
  isSwitched: boolean;
  onClick: () => void;
}
const SwitchButton: React.FC<ISwitchButton> = ({ isSwitched, onClick }) => {
  const [railAnimation, setRailAnimation] = useState<string>(
    "rail-animation-disable"
  );
  const [circleAnimation, setCirlceAnimation] = useState<string>(
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
    <div>
      <button onClick={onClick} className="button">
        <div className={`rail ${railAnimation}`}></div>
        <div className={`circle ${circleAnimation}`}></div>
      </button>
    </div>
  );
};

export default SwitchButton;
