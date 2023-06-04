import React, { FC } from "react";
import DateBulletItem from "@/commons/DateBulletItem";
import IconButton from "@/commons/IconButton";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { BsCalendarEvent } from "react-icons/bs";

export interface DatePickerProps {
  className?: string;
}

const DatePicker: FC<DatePickerProps> = ({ className }) => {
  const date = new Date();
  const month = date.toLocaleString("UTC", { month: "long" });
  const years = date.getFullYear();
  const currentDate = date.toDateString();
  const daysMonth = new Date(years, date.getMonth() - 1, 0).getDate();
  const diasSemana = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"];
  const dateMonth = [];

  for (let day = 1; day <= daysMonth; day++) {
    const indice = new Date(years, date.getMonth(), day).getDay();
    dateMonth.push({ day, weekDay: diasSemana[indice] });
  }

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
        <p className="font-light text-sm">{years}</p>
      </div>
      <div className="flex overflow-x-scroll gap-2">
        {dateMonth?.map((obj) =>
          currentDate.slice(9) === `${obj.day} ${years}` ? (
            <DateBulletItem
              key={obj.day}
              day={obj.day}
              weekDay={obj.weekDay}
              selected
            />
          ) : (
            <DateBulletItem key={obj.day} day={obj.day} weekDay={obj.weekDay} />
          )
        )}
      </div>
    </div>
  );
};

export default DatePicker;
