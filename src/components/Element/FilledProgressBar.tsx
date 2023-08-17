import React from "react";

interface FilledProgressBarProps {
  filledPercentage: number;
}

const FilledProgressBar: React.FC<FilledProgressBarProps> = ({
  filledPercentage,
}) => {
  return (
    <div className="h-2 md:h-3.5 w-full bg-white rounded-lg">
      <div
        className={`h-full bg-brand rounded-lg border-none`}
        style={{ width: `${filledPercentage}%` }}
      ></div>
    </div>
  );
};

export default FilledProgressBar;
