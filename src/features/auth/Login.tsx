import Button from "@components/Element/Button/Button";
import CloseButton from "@components/Element/CloseButton";
import PasswordInput from "@components/Element/PasswordInput";
import Switch from "@components/Element/Switch";
import Text from "@components/Element/Text";
import Input from "@components/Element/input";
import { Facebook } from "@components/icons/facebook";
import { Google } from "@components/icons/google";
import { CloseModal, OpenModal } from "@features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  isPopup?: boolean;
  className?: string;
}

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isPopup = true, className }) => {
  const { t } = useTranslation();
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInputType>();

  const onSubmit = async ({ email, password, remember_me }: LoginInputType) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      rememberMe: remember_me,
    });
    if (result?.ok === false) {
      setLoading(false);
      if (result.error === "email_not_found") {
        setError("email", {
          type: "manual",
          message: t("common:email_not_found") as string,
        });
      }
      if (result.error === "invalid_password") {
        setError("password", {
          type: "manual",
          message: t("common:invalid_password") as string,
        });
      }
    }
    if (result?.ok === true) {
      setLoading(false);
      dispatch(CloseModal());
    }
  };

  const handleSignUp = useCallback(() => {
    return dispatch(
      OpenModal({ view: "SIGN_UP_VIEW", payload: null, type: "open" })
    );
  }, [dispatch]);

  const handleForgetPassword = useCallback(() => {
    return dispatch(
      OpenModal({ view: "FORGET_PASSWORD", payload: null, type: "open" })
    );
  }, [dispatch]);

  function closeModal() {
    return dispatch(CloseModal());
  }

  return (
    <div
      className={cn(
        "w-full lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative",
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}

      <div className="flex bg-brand-light mx-auto rounded-lg overflow-hidden">
        <div className="md:w-[55%] xl:w-[60%] registration hidden md:block">
          <Image
            src="/login-img.png"
            alt="signin Image"
            width={800}
            height={621}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 ">
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              {t("common:text-welcome-back")}
            </h4>
            <div className="mt-3 mb-1 text-sm text-center sm:text-15px text-body">
              {t("common:text-don’t-have-account")}
              <button
                type="button"
                className="text-sm font-semibold text-brand sm:text-15px ltr:ml-1 rtl:mr-1 hover:no-underline focus:outline-none"
                onClick={handleSignUp}
              >
                {t("common:text-create-account")}
              </button>
            </div>
          </div>

          {data === "registered-success" && (
            <div className="bg-green-500 w-full rounded-md flex items-center px-2 py-2 mt-4 mb-4">
              <Text variant="medium" className="text-white">
                {t("common:text-registered-success")}
              </Text>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-3.5">
              <Input
                label={t("forms:label-email") as string}
                type="email"
                variant="solid"
                {...register("email", {
                  required: `${t("forms:email-required")}`,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t("forms:email-error"),
                  },
                })}
                error={errors.email?.message}
              />
              <PasswordInput
                label={t("forms:label-password")}
                error={errors.password?.message}
                {...register("password", {
                  required: `${t("forms:password-required")}`,
                })}
              />
              <div className="flex items-center justify-center">
                <div className="flex items-center flex-shrink-0">
                  <label className="relative inline-block cursor-pointer switch">
                    <Switch checked={remember} onChange={setRemember} />
                  </label>
                  <label
                    htmlFor="remember"
                    className="flex-shrink-0 text-sm text-heading ps-5 mt-1 cursor-pointer"
                  >
                    {t("forms:label-remember-me")}
                  </label>
                </div>
                <div className="flex ms-auto mt-[3px]">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    className="text-end text-sm text-heading ps-3  hover:no-underline hover:text-skin-base focus:outline-none focus:text-skin-base"
                  >
                    {t("common:text-forgot-password")}
                  </button>
                </div>
              </div>
              <div className="relative">
                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  className="h-11 md:h-12 w-full mt-3 font-15px md:font-15px tracking-normal"
                  variant="formButton"
                >
                  {t("common:text-sign-in")}
                </Button>
              </div>
            </div>
          </form>
          <div className="flex flex-col items-center justify-center relative text-sm">
            <span className="mt-5 text-sm text-skin-base opacity-70">
              {t("common:text-or")}
            </span>
          </div>

          <div className="flex flex-col gap-2 justify-center mt-5">
            <Button
              variant="border"
              className="flex-row items-center"
              onClick={(e) => signIn("google")}
            >
              <Google className="h-4 w-4 mr-2" />
              <Text variant="small">Continue with Google</Text>
            </Button>
            <Button
              variant="border"
              className="flex-row items-center"
              onClick={(e) => signIn("facebook")}
            >
              <Facebook className="h-4 w-4 mr-2" />
              <Text variant="small">Continue with Facebook</Text>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
