import React, { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import cn from "classnames";

type ModalProps = {
  open?: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  variant?: "center" | "bottom";
};

const Modal: FC<ModalProps> = ({
  children,
  open,
  onClose,
  variant = "center",
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden"
        onClose={onClose}
      >
        <div className="min-h-screen lg:px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed bg-brand-dark bg-opacity-70 inset-0 z-40 cursor-pointer" />
          </Transition.Child>

          <span
            className={cn({
              "h-screen align-middle inline-block": variant === "center",
              "h-screen align-bottom": variant === "bottom",
            })}
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-110"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-110"
          >
            <div className="w-full md:w-auto inline-block p-4 md:p-6 xl:p-8 overflow-hidden text-start align-middle transition-all transform shadow-xl relative z-50">
              <div className="relative rounded-md">
                <button
                  onClick={onClose}
                  aria-label="Close panel"
                  className="opacity-0 absolute top-2 md:top-4 end-2 md:end-4"
                />
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
