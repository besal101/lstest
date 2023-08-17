import * as React from "react";

interface IOverlayProps {
  onClick: () => void;
}

const Overlay: React.FC<IOverlayProps> = ({ onClick }) => {
  return (
    <div
      className="fixed bg-brand-dark bg-opacity-70 inset-0 z-40 cursor-pointer opacity-100"
      aria-hidden="true"
      data-headlessui-state="open"
      role="button"
      onClick={onClick}
    />
  );
};

export default Overlay;
