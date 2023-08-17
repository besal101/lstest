import Button from "@components/Element/Button/Button";
import Input from "@components/Element/input";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import CloseButton from "@components/Element/CloseButton";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { CloseModal, OpenModal } from "@features/modal/modalSlice";
import { useCallback } from "react";

type FormValues = {
  email: string;
};

const defaultValues = {
  email: "",
};

const ForgetPassword = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const dispatch = useAppDispatch();

  const handleSignIn = useCallback(() => {
    return dispatch(
      OpenModal({ view: "LOGIN_VIEW", payload: null, type: "open" })
    );
  }, [dispatch]);

  function closeModal() {
    return dispatch(CloseModal());
  }

  const onSubmit = (values: FormValues) => {
    console.log(values, "token");
  };

  return (
    <div className="py-6 px-5 sm:p-8 bg-brand-light mx-auto rounded-lg w-full sm:w-96 md:w-450px">
      <CloseButton onClick={closeModal} />
      <div className="text-center mb-9 pt-2.5">
        <p className="text-sm md:text-base text-body mt-3 sm:mt-4 mb-8 sm:mb-10">
          {t("common:forgot-password-helper")}
        </p>
      </div>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col justify-center"
        noValidate
      >
        <Input
          label={t("forms:label-email") as string}
          type="email"
          variant="solid"
          className="mb-4"
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

        <Button
          type="submit"
          variant="formButton"
          className="h-11 md:h-12 w-full mt-0"
        >
          {t("common:text-reset-password")}
        </Button>
      </form>
      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-10 mb-6 sm:mb-7">
        <hr className="w-full border-gray-300" />
        <span className="absolute -top-2.5 px-2 bg-brand-light">
          {t("common:text-or")}
        </span>
      </div>
      <div className="text-sm sm:text-15px text-skin-muted text-center">
        {t("common:text-back-to")}{" "}
        <button
          type="button"
          className="text-skin-base underline font-medium hover:no-underline focus:outline-none"
          onClick={handleSignIn}
        >
          {t("common:text-login")}
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
