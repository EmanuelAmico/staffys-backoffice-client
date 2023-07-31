"use client";
import React, { FC, useCallback, useEffect, useState, useMemo } from "react";
import DateBulletItem from "@/commons/DateBulletItem";
import IconButton from "@/commons/IconButton";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { BsCalendarEvent } from "react-icons/bs";

export interface DatePickerProps {
  className?: string;
}

type DaysOfCurrentMonth = {
  day: number;
  weekDay: string;
  selected: boolean;
}[];

const DatePicker: FC<DatePickerProps> = ({ className }) => {
  const weekDays = useMemo(
    () => ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"],
    []
  );
  const yearOfMonth = useMemo(
    () => [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    []
  );

  const [date, setDate] = useState(new Date());
  const [daysOfCurrentMonth, setDaysOfCurrentMonth] =
    useState<DaysOfCurrentMonth>([]);

  const handleClickDay = useCallback(
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

  const handleClickMonthNext = () => {
    date.setMonth(date.getMonth() + 1);
    const newDate = new Date(date);
    setDate(newDate);
  };

  const handleClickMonthBack = () => {
    date.setMonth(date.getMonth() - 1);
    const newDate = new Date(date);
    setDate(newDate);
  };

  useEffect(() => {
    const daysOfCurrentMonth: DaysOfCurrentMonth = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthDays = new Date(year, month, -1).getDate();

    for (let day = 1; day <= monthDays; day++) {
      const index = new Date(year, month, day).getDay();
      daysOfCurrentMonth.push({
        day,
        weekDay: weekDays[index],
        selected: new Date().toDateString().slice(8) === `${day} ${year}`,
      });
    }

    setDaysOfCurrentMonth(daysOfCurrentMonth);
  }, [date, weekDays]);

  return (
    <div className={`${className || ""}`}>
      <div className="flex flex-col items-center justify-center pb-3 relative">
        <div className="flex items-center justify-between font-bold">
          <IconButton onClick={handleClickMonthBack}>
            <RiArrowLeftSLine size={30} />
          </IconButton>
          <h3 className="pl-4 pr-4">{yearOfMonth[date.getMonth()]}</h3>
          <IconButton onClick={handleClickMonthNext}>
            <RiArrowRightSLine size={30} />
          </IconButton>
          <div className="absolute right-0">
            <IconButton onClick={() => setDate(new Date())}>
              <BsCalendarEvent size={22} />
            </IconButton>
          </div>
        </div>
        <p className="font-light text-sm">{date.getFullYear()}</p>
      </div>
      <div className="h-36 flex items-center overflow-x-scroll gap-2">
        {daysOfCurrentMonth.map(({ day, weekDay, selected }) => (
          <DateBulletItem
            key={day}
            day={day}
            weekDay={weekDay}
            selected={selected}
            onClick={handleClickDay}
          />
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
