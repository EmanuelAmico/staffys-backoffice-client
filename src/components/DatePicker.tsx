"use client";
import React, { FC, useCallback, useState } from "react";
import DateBulletItem from "@/commons/DateBulletItem";
import IconButton from "@/commons/IconButton";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { BsCalendarEvent } from "react-icons/bs";

export interface DatePickerProps {
  className?: string;
}

const DatePicker: FC<DatePickerProps> = ({ className }) => {
  const date = new Date();
  const month = date
    .toLocaleString("es-AR", {
      month: "long",
    })
    .split("")
    .map((char, index) => (index === 0 ? char.toUpperCase() : char))
    .join("");
  const year = date.getFullYear();
  const currentDate = date.toDateString();
  const monthDays = new Date(year, date.getMonth() - 1, 0).getDate();
  const weekDays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"];
  const [daysOfCurrentMonth, setDaysOfCurrentMonth] = useState<
    { day: number; weekDay: string; selected: boolean }[]
  >(() => {
    const daysOfCurrentMonth: {
      day: number;
      weekDay: string;
      selected: boolean;
    }[] = [];

    for (let day = 1; day <= monthDays; day++) {
      const index = new Date(year, date.getMonth(), day).getDay();
      daysOfCurrentMonth.push({
        day,
        weekDay: weekDays[index],
        selected: currentDate.slice(8) === `${day} ${year}`,
      });
    }

    return daysOfCurrentMonth;
  });

  const handleClick = useCallback(
    (clickedDay: number) =>
      setDaysOfCurrentMonth((daysOfCurrentMonth) =>
        daysOfCurrentMonth.map(({ day, weekDay }) => ({
          day,
          weekDay,
          selected: day === clickedDay,
        }))
      ),
    []
  );

  return (
    <div className={`${className || ""}`}>
      <div className="flex flex-col items-center justify-center pb-3 relative">
        <div className="flex items-center justify-between font-bold">
          <IconButton icon={<RiArrowLeftSLine size={30} />} />
          <h3 className="pl-4 pr-4">{month}</h3>
          <IconButton icon={<RiArrowRightSLine size={30} />} />
          <div className="absolute right-0">
            <IconButton icon={<BsCalendarEvent size={22} />} />
          </div>
        </div>
        <p className="font-light text-sm">{year}</p>
      </div>
      <div className="h-36 flex items-center overflow-x-scroll gap-2">
        {daysOfCurrentMonth.map(({ day, weekDay, selected }) => (
          <DateBulletItem
            key={day}
            day={day}
            weekDay={weekDay}
            selected={selected}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
