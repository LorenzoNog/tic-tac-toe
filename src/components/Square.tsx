import React from "react";

export const Square = ({ children, index, isSelected, updateBoard }) => {
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div
      onClick={handleClick}
      className={`h-[120px] w-[120px] flex justify-center rounded-xl m-2 items-center border-2 ${
        isSelected ? "bg-sky-500" : "bg-[#242424]"
      }`}
      key={index}
    >
      <span className="text-[50px]">{children}</span>
    </div>
  );
};
