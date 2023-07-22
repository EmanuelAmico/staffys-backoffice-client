import React, {
  ComponentPropsWithoutRef,
  FC,
  createRef,
  useEffect,
} from "react";

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
  disabled,
  ...buttonProps
}) => {
  const buttonRef = createRef<HTMLButtonElement>();

  useEffect(() => {
    if (selected && buttonRef.current) {
      buttonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [selected, buttonRef]);

  return (
    <button
      ref={buttonRef}
      className={`w-fit px-4 ${
        selected ? "py-9" : "py-6"
      } inline-flex flex-col justify-center items-center ${
        selected
          ? "bg-yellowBackground"
          : disabled
          ? "bg-disableButton"
          : "bg-primaryBlue"
      } rounded-full transition-all  ${className || ""}`}
      onClick={() => onClick(day)}
      disabled={disabled}
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
