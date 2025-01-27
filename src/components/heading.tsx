import React from "react";

interface IProps {
  title: string;
  description?: string;
  className?: string;
}

export const Heading: React.FC<IProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-[3px] ${className || ""}`}>
      <h2 className="text-[35px] text-rose-400 font-[700]">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

