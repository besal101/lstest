import Button from "@components/Element/Button/Button";
import Heading from "@components/Element/Heading";
import { ProfileIcon } from "@components/icons/profile";
import { OpenModal } from "@features/modal/modalSlice";
import { Listbox, Transition } from "@headlessui/react";
import { useAppDispatch } from "@hooks/useRedux";
import cn from "classnames";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useCallback, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineGift } from "react-icons/hi";

interface IProfileProps {
  classname?: string;
}

const Profile: React.FC<IProfileProps> = ({ classname }) => {
  const { data: session } = useSession();
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  const [displaySearch, setDisplaySearch] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleModal = useCallback(
    (modal: "LOGIN_VIEW" | "SIGN_UP_VIEW") => {
      dispatch(OpenModal({ type: "open", view: modal, payload: null }));
    },
    [dispatch]
  );

  function clear() {
    setInputFocus(false);
  }

  return (
    <>
      <div
        className={cn("overlay cursor-pointer", {
          "input-focus-overlay-open": inputFocus === true,
          "open-search-overlay": displaySearch,
        })}
        onClick={() => clear()}
      />
      <Listbox>
        {({ open }) => (
          <div className="relative z-10 lg:top-[1px]">
            <Listbox.Button className="relative w-full ps-3 pe-5 text-start cursor-pointer">
              {session && session?.user?.name ? (
                <span className="flex items-center text-base font-medium lg:text-20px">
                  {session?.user?.image ? (
                    <Image
                      src={session?.user?.image}
                      alt="profile"
                      width={24}
                      height={24}
                      className="hidden lg:flex h-8 w-8 me-1 rounded-full"
                    />
                  ) : (
                    <ProfileIcon
                      className="hidden lg:flex h-6 w-6 me-2"
                      color="#0F172A"
                    />
                  )}
                  <span className="pb-0.5 hidden lg:flex">Account</span>
                </span>
              ) : (
                <span className="flex items-center text-base font-medium lg:text-20px">
                  <ProfileIcon className="h-6 w-6 me-1" color="#0F172A" />
                  <span className="hidden lg:flex pb-0.5">Profile</span>
                </span>
              )}
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute end-0 flex flex-col gap-4 lg:start-1 w-24 py-4 mt-1 overflow-auto bg-white rounded-md shadow-dropDown max-h-70 focus:outline-none text-sm min-w-[250px] border border-brand-base"
              >
                {session && session?.user?.name ? (
                  <Heading
                    variant="base"
                    className="cursor-pointer relative px-3"
                  >
                    Welcome, {session?.user?.name}
                  </Heading>
                ) : (
                  <>
                    <Listbox.Option
                      className="cursor-pointer relative px-3"
                      value="Signin"
                    >
                      <Button
                        variant="small"
                        className="w-full"
                        onClick={() => handleModal("LOGIN_VIEW")}
                      >
                        Signin
                      </Button>
                    </Listbox.Option>
                    <Listbox.Option
                      className="cursor-pointer relative "
                      value="Signin"
                    >
                      <div
                        onClick={handleModal.bind(null, "SIGN_UP_VIEW")}
                        role="button"
                        className="flex justify-center hover:underline "
                      >
                        Create an Account
                      </div>
                    </Listbox.Option>
                  </>
                )}
                <hr className="border border-secondary" />
                <Listbox.Option
                  className="cursor-pointer relative px-4"
                  value="Signin"
                >
                  <Link
                    href="/my-account"
                    className="flex justify-left hover:underline items-center font-medium"
                  >
                    <ProfileIcon className="h-5 w-5 me-2.5" />
                    My Account
                  </Link>
                </Listbox.Option>
                <Listbox.Option
                  className="cursor-pointer relative px-4"
                  value="Signin"
                >
                  <Link
                    href="/signup"
                    className="flex justify-left hover:underline items-center font-medium"
                  >
                    <AiOutlineShoppingCart className="h-5 w-5 me-2.5" />
                    My Orders
                  </Link>
                </Listbox.Option>
                <Listbox.Option
                  className="cursor-pointer relative px-4"
                  value="Signin"
                >
                  <Link
                    href="/signup"
                    className="flex justify-left hover:underline items-center font-medium"
                  >
                    <HiOutlineGift className="h-5 w-5 me-2.5" />
                    My SmilePoints
                  </Link>
                </Listbox.Option>
                {session && session?.user?.name && (
                  <Listbox.Option
                    className="cursor-pointer relative px-3"
                    value="Signin"
                  >
                    <Button
                      variant="small"
                      className="w-full"
                      onClick={(e) => signOut()}
                    >
                      Signout
                    </Button>
                  </Listbox.Option>
                )}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </>
  );
};

export default Profile;
