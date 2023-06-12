import React, { ComponentPropsWithoutRef, FC } from "react";

interface DateBulletItemProps
  extends Omit<ComponentPropsWithoutRef<"button">, "onClick"> {
  selected?: boolean;
  day: number;
  weekDay: string;
  onClick: (day: number) => void;
}

const DateBulletItem: FC<DateBulletItemProps> = ({
  selected,
  day,
  weekDay,
  className,
  onClick,
  ...buttonProps
}) => {
  return (
    <button
      className={`w-fit px-4 ${
        selected ? "py-9" : "py-6"
      } inline-flex flex-col justify-center items-center ${
        selected ? "bg-yellowBackground" : "bg-primaryBlue"
      } rounded-full transition-all  ${className || ""}`}
      onClick={() => onClick(day)}
      {...buttonProps}
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
