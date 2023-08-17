import { CallIcon } from "@components/icons/Call";
import { Message } from "@components/icons/message";
import { WhatsappIcon } from "@components/icons/whatsapp";
import { siteSettings } from "@utils/routes";
import { useTranslation } from "next-i18next";
import * as React from "react";

interface IAssistantProps {}

const Assistant: React.FC<IAssistantProps> = (props) => {
  const { t } = useTranslation("common");
  const handleCall = () => {
    window.location.href = `tel:${siteSettings.phone}`;
  };
  const handleWhatsapp = () => {
    window.location.href = `https://wa.me/${siteSettings.phone}`;
  };
  return (
    <div className="flex flex-row pt-16 gap-4">
      <div className="h-10 w-10 rounded-full bg-brand-pink flex items-center justify-center">
        <Message className="w-6 h-6 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold">{t("shopping-assistant")}</span>
        <span className="text-sm">{t("shopping-assistant-sub")}</span>
        <div className="flex flex-row gap-4 pt-4">
          <button
            className="flex flex-row gap-2 border-b-2 border-b-brand w-fit hover:text-brand-pink cursor-pointer"
            onClick={handleCall}
          >
            <div className="pb-1">
              <CallIcon />
            </div>
            <span className="text-brand font-semibold">{t("call-us")}</span>
          </button>
          <button
            className="flex flex-row gap-2 border-b-2 border-b-brand-whatsapp w-fit hover:text-brand-pink cursor-pointer"
            onClick={handleWhatsapp}
          >
            <WhatsappIcon />
            <span className="text-brand-whatsapp font-semibold">
              {t("whatsapp-us")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
