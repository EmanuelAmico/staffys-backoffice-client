import React, { MouseEvent, useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const handleSum = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCounter((counter) => counter + 1);
  };

  const handleMinus = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (counter > 0) {
      setCounter((counter) => counter - 1);
    }
  };

  return (
    <div className="w-[5rem]">
      <p className="mb-1 text-xs text-yellowText">Cantidad</p>
      <div className="flex items-center">
        <button
          onClick={handleMinus}
          className="w-[3rem] h-[1.7rem] border border-greyBorder rounded-sm flex justify-center items-center"
        >
          -
        </button>
        <p className="w-[3rem]  text-center ">{counter}</p>
        <button
          onClick={handleSum}
          className="w-[3rem] h-[1.7rem] border border-greyBorder rounded-sm flex justify-center items-center"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
