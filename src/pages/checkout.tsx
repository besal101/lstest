import Container from "@components/Container";
import Layout from "@components/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Button from "@components/Element/Button/Button";
import OrderSummary from "@features/Order";
import { OpenModal } from "@features/modal/modalSlice";
import Payment from "@features/payment";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { useGetIDMutataion } from "@query/auth/get-id-from-email";
import { useCheckAndGetMutation } from "@query/auth/use-check-get";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { AiOutlinePlus } from "react-icons/ai";
import { BsBank } from "react-icons/bs";
import { RiUserLocationLine } from "react-icons/ri";
import EmptyCart from "@features/cart/CartSidebar/EmptyCart";
import { useSaveLocationMutation } from "@query/location/save-location";

export default function Checkout() {
  const { data: session } = useSession();
  const cart = useAppSelector((state) => state.cart.cartItems);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { location, apartment, fullname, phone } = useAppSelector(
    (state) => state.location
  );
  const [userId, setUserId] = useState<any>(null);
  const [addressId, setAddressId] = useState<number>();

  const [currentMenu, setCurrentMenu] = useState<string>("address");

  const { mutate: signUp, data: signUpdata } = useCheckAndGetMutation();

  const { mutate: getID, data: userID } = useGetIDMutataion();

  const { totalAmount } = useAppSelector((state) => state.orderSummary);
  const dispatch = useAppDispatch();
  const handleaddress = useCallback(() => {
    setCurrentMenu("address");
    dispatch(OpenModal({ type: "open", view: "DELIVERY_VIEW", payload: null }));
  }, [dispatch]);

  const { data: addressID, mutate: saveLocationMutation } =
    useSaveLocationMutation();

  useEffect(() => {
    if (addressID) {
      setAddressId(addressID?.address?.id);
      setLoading(false);
      setCurrentMenu("payment");
    }
  }, [addressID]);

  useEffect(() => {
    if (userID) {
      setUserId(userID);
      setLoading(false);
      setCurrentMenu("payment");
    }
    if (signUpdata) {
      setUserId(signUpdata.id);
      setLoading(false);
      setCurrentMenu("payment");
    }
  }, [signUpdata, userID]);

  useEffect(() => {
    if (userId) {
      const locationData = {
        userId: userId.toString() as string,
        fullname: fullname,
        phone,
        apartment,
        address: location[0].address,
        city: location[0].state,
        latitude: location[0].lat,
        longitude: location[0].lng,
        country: location[0].country,
      };
      saveLocationMutation(locationData);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleSaveaddress = useCallback(async () => {
    setLoading(true);
    if (session?.user?.email) {
      getID({ email: session.user.email });
    } else {
      signUp({
        name: fullname,
        mobile: phone,
      });
    }
  }, [fullname, getID, phone, session, signUp]);

  if (!cart?.length) return <EmptyCart returnToHome />;

  return (
    <Container>
      <main className="container py-4 lg:pb-28 lg:pt-20 ">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <div className="space-y-8">
              <div className="border border-slate-200 shadow-lg rounded-sm overflow-hidden z-0 p-6">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div className="sm:ml-4 ml-8">
                    <div className="flex flex-row gap-2">
                      <span className="hidden sm:block">
                        <RiUserLocationLine className="w-6 h-6 text-slate-900 mt-0.5" />
                      </span>
                      <div className="flex flex-col">
                        <h3 className=" text-slate-900 flex text-sm font-bold">
                          <span className="uppercase">Shipping Profile</span>
                        </h3>
                        {location.length > 0 && fullname !== "" ? (
                          <div className="font-semibold mt-1 flex flex-col text-slate-700 leading-snug">
                            <span className="text-base">{fullname}</span>
                            <span className="text-xs">{phone}</span>
                            <span className="text-xs">{apartment}</span>
                            <span className="text-xs">
                              {location[0].address}, {location[0].state}
                            </span>
                          </div>
                        ) : (
                          <Button
                            variant="small"
                            className="mt-5 sm:mt-3 sm:ml-auto"
                            onClick={handleaddress}
                          >
                            <AiOutlinePlus className="ltr:mr-1.5 rtl:ml-1.5" />
                            Add A New Address
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  {location.length > 0 && fullname !== "" && (
                    <div className="flex flex-col justify-between">
                      <Button
                        variant="smallSecondary"
                        className="mt-5 sm:mt-0 sm:ml-auto"
                        onClick={handleaddress}
                      >
                        Change Address
                      </Button>
                      <Button
                        variant="small"
                        className="mt-5 sm:mt-3 sm:ml-auto"
                        onClick={handleSaveaddress}
                        loading={loading}
                      >
                        Save And Continue
                      </Button>
                    </div>
                  )}
                </div>

                <hr className="divide-y divide-slate-200/70 mt-4" />
                <AnimateHeight
                  duration={300}
                  height={currentMenu === "payment" ? "auto" : 0}
                >
                  <div className="flex flex-col sm:flex-row items-start p-6">
                    <span className="hidden sm:block">
                      <BsBank className="w-10 h-10 text-slate-900 mt-0.5" />
                    </span>
                    <div className="sm:ml-4">
                      <h3 className=" text-slate-900 flex text-xl font-bold">
                        <span className="uppercase">Payment</span>
                      </h3>

                      {userId && addressId && (
                        <Payment
                          userId={userId}
                          fullname={fullname}
                          phone={phone}
                          addressId={addressId}
                        />
                      )}
                    </div>
                  </div>
                </AnimateHeight>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>
          <div className="w-full lg:w-[36%] ">
            <h3 className="text-lg font-semibold">Order summary</h3>
            <OrderSummary cart={cart} />
          </div>
        </div>
      </main>
    </Container>
  );
}

Checkout.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const locale = ctx.locale;
  const session = await getSession(ctx);

  const translations = await serverSideTranslations(locale!, [
    "common",
    "forms",
    "item",
  ]);

  return {
    props: {
      ...translations,
      session,
    },
  };
};
