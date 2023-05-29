import React, { FC } from "react";

interface DateBulletItemProps {
  selected?: boolean;
  day: number;
  weekDay: string;
  className?: string;
  onClick?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

const DateBulletItem: FC<DateBulletItemProps> = ({
  selected,
  day,
  weekDay,
  onClick,
  onBlur,
  onFocus,
  className,
}) => {
  return (
    <button
      className={`w-fit px-4 ${
        selected ? "py-9" : "py-6"
      } inline-flex flex-col justify-center items-center ${
        selected ? "bg-yellowBackground" : "bg-primaryBlue"
      } rounded-full transition-all  ${className || ""}`}
      onClick={onClick}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      <span className="text-whiteText text-2xl font-bold">{day}</span>
      <span
        className={`text-whiteText text-sm ${selected ? "" : "opacity-50"}`}
      >
        {weekDay}
      </span>
    </button>
  );
};

export default DateBulletItem;
