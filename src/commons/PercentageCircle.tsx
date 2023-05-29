import React, { FC } from "react";

interface PercentageCircleProps {
  percentage: number;
  className?: string;
}

const PercentageCircle: FC<PercentageCircleProps> = ({
  className,
  percentage,
}) => {
  const percentageColor = percentage < 100 ? "#FCBC11" : "#96DB76";

  return (
    <div
      className={`flex relative items-center justify-center ${className || ""}`}
    >
      <svg
        className="transform -rotate-90 transition-all ease-in-out"
        viewBox="0 0 100 100"
        width="60"
        height="60"
        fill="transparent"
        stroke={percentageColor}
        strokeWidth="7"
        strokeLinecap="round"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          strokeDasharray={251}
          strokeDashoffset={251 - (percentage / 100) * 251}
        />
      </svg>
      <span className="absolute text-sm font-bold">{`${percentage}%`}</span>
    </div>
  );
};

export default PercentageCircle;
