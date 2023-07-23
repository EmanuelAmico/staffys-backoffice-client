"use client";
import React, { FC, useCallback, useState } from "react";
import DateBulletItem from "@/commons/DateBulletItem";
import IconButton from "@/commons/IconButton";
import { BsCalendarEvent } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { showToast } from "@/utils/toast";
import { getHistoryByDate } from "@/redux/reducers/selectedHistory";

export interface DatePickerProps {
  className?: string;
}

const DatePicker: FC<DatePickerProps> = ({ className }) => {
  const { histories, selectedHistory } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch<AppDispatch>();
  const today = new Date();
  const month = today
    .toLocaleString("es-AR", {
      month: "long",
    })
    .split("")
    .map((char, index) => (index === 0 ? char.toUpperCase() : char))
    .join("");
  const year = today.getFullYear();
  const currentDate = today.toDateString();
  const monthDays = new Date(year, today.getMonth() - 1, 0).getDate();
  const weekDays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"];
  const [daysOfCurrentMonth, setDaysOfCurrentMonth] = useState<
    { day: number; weekDay: string; selected: boolean; disabled: boolean }[]
  >(() => {
    const daysOfCurrentMonth: {
      day: number;
      weekDay: string;
      selected: boolean;
      disabled: boolean;
    }[] = [];

    for (let day = 1; day <= monthDays; day++) {
      const date = new Date(year, today.getMonth(), day);
      const index = date.getDay();
      const ISODate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).toISOString();

      const history = histories.find(
        (history) => history.date.split("T")[0] === ISODate.split("T")[0]
      );

      daysOfCurrentMonth.push({
        day,
        weekDay: weekDays[index],
        selected: currentDate.slice(8) === `${day} ${year}`,
        disabled: !history,
      });
    }

    return daysOfCurrentMonth;
  });

  const handleClick = useCallback(
    async (clickedDay: number) => {
      try {
        await dispatch(
          getHistoryByDate(
            `${selectedHistory.date
              .split("T")[0]
              .split("-")
              .map((yearMonthDay, i) => (i === 2 ? clickedDay : yearMonthDay))
              .join("-")}T${selectedHistory.date.split("T")[1]}`
          )
        ).unwrap();
        setDaysOfCurrentMonth((daysOfCurrentMonth) =>
          daysOfCurrentMonth.map(({ day, weekDay, disabled }) => ({
            day,
            weekDay,
            disabled,
            selected: day === clickedDay,
          }))
        );
      } catch (error) {
        console.error(error);
        showToast("error", "Se produjo un error al seleccionar el día");
      }
    },
    [dispatch, selectedHistory.date]
  );

  return (
    <div className={`${className || ""}`}>
      <div className="flex flex-col items-center justify-center pb-3 relative">
        <div className="flex items-center justify-between font-bold">
          <h3 className="pl-4 pr-4">{month}</h3>
          <div className="absolute right-0">
            <IconButton onClick={() => handleClick(today.getDate())}>
              {<BsCalendarEvent size={22} />}
            </IconButton>
          </div>
        </div>
        <p className="font-light text-sm">{year}</p>
      </div>
      <div className="h-36 flex items-center overflow-x-scroll gap-2">
        {daysOfCurrentMonth.map(({ day, weekDay, selected, disabled }) => (
          <DateBulletItem
            key={day}
            day={day}
            weekDay={weekDay}
            selected={selected}
            onClick={handleClick}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
