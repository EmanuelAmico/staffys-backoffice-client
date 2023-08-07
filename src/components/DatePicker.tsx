"use client";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import DateBulletItem from "@/commons/DateBulletItem";
import IconButton from "@/commons/IconButton";
import { BsCalendarEvent } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { showToast } from "@/utils/toast";
import { getHistoryByDate } from "@/redux/reducers/selectedHistory";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export interface DatePickerProps {
  className?: string;
}

const DatePicker: FC<DatePickerProps> = ({ className }) => {
  const { histories, selectedHistory } = useSelector(
    (state: RootState) => state
  );
  const monthNames = useMemo(
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
  const dispatch = useDispatch<AppDispatch>();
  const [date, setDate] = useState(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    firstDayOfMonth.setHours(0, 0, 0, 0);
    return firstDayOfMonth;
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const month = date
    .toLocaleString("es-AR", {
      month: "long",
    })
    .split("")
    .map((char, index) => (index === 0 ? char.toUpperCase() : char))
    .join("");
  const year = date.getFullYear();
  const weekDays = useMemo(
    () => ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"],
    []
  );

  const calculateDaysOfCurrentMonth = useCallback(
    (currentDate: Date) => {
      const daysOfCurrentMonth: {
        day: number;
        weekDay: string;
        selected: boolean;
        disabled: boolean;
      }[] = [];

      const monthDays = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();

      for (let day = 1; day <= monthDays; day++) {
        const _date = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          day
        );
        const index = _date.getDay();
        const ISODate = new Date(
          _date.getFullYear(),
          _date.getMonth(),
          _date.getDate()
        ).toISOString();

        const history = histories.find(
          (history) => history.date.split("T")[0] === ISODate.split("T")[0]
        );

        daysOfCurrentMonth.push({
          day,
          weekDay: weekDays[index],
          selected:
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getFullYear() === currentDate.getFullYear(),
          disabled: !history,
        });
      }

      return daysOfCurrentMonth;
    },
    [histories, selectedDate, weekDays]
  );
  const [daysOfCurrentMonth, setDaysOfCurrentMonth] = useState<
    { day: number; weekDay: string; selected: boolean; disabled: boolean }[]
  >(calculateDaysOfCurrentMonth(date));

  const handleClick = useCallback(
    async (clickedDay: number) => {
      try {
        const formattedDay = clickedDay.toString().padStart(2, "0");
        const monthNumber = monthNames.indexOf(month) + 1;

        await dispatch(
          getHistoryByDate(
            `${selectedHistory.date
              .split("T")[0]
              .split("-")
              .map((yearMonthDay, i) =>
                i === 2
                  ? formattedDay
                  : i === 1
                  ? monthNumber.toString().padStart(2, "0")
                  : yearMonthDay
              )
              .join("-")}T${selectedHistory.date.split("T")[1]}`
          )
        ).unwrap();

        setSelectedDate(
          new Date(date.getFullYear(), date.getMonth(), clickedDay)
        );

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
    [dispatch, selectedHistory.date, date, month, monthNames]
  );

  const handleClickNextMonth = () => {
    const newDate = new Date(year, date.getMonth() + 1, 1);
    setDate(newDate);
    setDaysOfCurrentMonth(calculateDaysOfCurrentMonth(newDate));
  };

  const handleClickPreviousMonth = () => {
    const newDate = new Date(year, date.getMonth() - 1, 1);
    setDate(newDate);
    setDaysOfCurrentMonth(calculateDaysOfCurrentMonth(newDate));
  };

  useEffect(() => {
    setDaysOfCurrentMonth(calculateDaysOfCurrentMonth(date));
  }, [calculateDaysOfCurrentMonth, date]);

  return (
    <div className={`${className || ""}`}>
      <div className="flex flex-col items-center justify-center pb-3 relative">
        <div className="flex items-center justify-between font-bold">
          <IconButton onClick={handleClickPreviousMonth}>
            <RiArrowLeftSLine size={30} />
          </IconButton>
          <h3 className="pl-4 pr-4">{month}</h3>
          <IconButton onClick={handleClickNextMonth}>
            <RiArrowRightSLine size={30} />
          </IconButton>
          <div className="absolute right-0">
            <IconButton
              onClick={async () => {
                const today = new Date();
                await handleClick(today.getDate());
                const firstDayOfMonth = new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  1
                );
                firstDayOfMonth.setHours(0, 0, 0, 0);
                setDate(firstDayOfMonth);
                setSelectedDate(today);

                const newDaysOfCurrentMonth =
                  calculateDaysOfCurrentMonth(today);
                newDaysOfCurrentMonth[today.getDate() - 1].selected = true;
                setDaysOfCurrentMonth(newDaysOfCurrentMonth);
              }}
            >
              <BsCalendarEvent size={22} />
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
