import Image from "next/image";
import * as React from "react";
import Logo from "@assets/logo.png";
import { LanguageSwitcher } from "@components/shared";
import Text from "@components/Element/Text";
import Container from "@components/Container";

interface ICopyrightProps {
  payment: {
    id: number;
    image: string;
    name: string;
  }[];
}

const Copyright: React.FunctionComponent<ICopyrightProps> = ({ payment }) => {
  return (
    <div className="bg-border-one">
      <div className="border-b border-border-two hidden md:block">
        <Container>
          <div className="flex flex-row gap-5 justify-center items-center">
            <Image
              src={Logo}
              width={80}
              height={80}
              alt="Image"
              className="py-6"
            />
            <div className="relative">
              <select
                name="cars"
                id="cars"
                className="appearance-none border border-gray-500 rounded-lg py-2 pl-4 pr-12"
              >
                <option value="volvo">English</option>
                <option value="saab">Arabic</option>
                <option value="mercedes">Turkish</option>
                <option value="audi">Russian</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="16"
                  height="16"
                  x="0"
                  y="0"
                  viewBox="0 0 16 16"
                >
                  <g>
                    <path
                      d="m12.03 4.97-3.5-3.5a.749.749 0 0 0-1.06 0l-3.5 3.5a.749.749 0 1 0 1.06 1.06L8 3.061l2.97 2.969a.749.749 0 1 0 1.06-1.06zM10.97 9.97 8 12.939 5.03 9.97a.749.749 0 1 0-1.06 1.06l3.5 3.5a.749.749 0 0 0 1.06 0l3.5-3.5a.749.749 0 1 0-1.06-1.06z"
                      fill="#6B7280"
                      data-original="#6B7280"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex flex-col sm:flex-row py-2 justify-between items-center px-12 ">
          <Text className="text-brand-gray text-sm font-medium">
            © 2023 Lifesmile. All Rights Reserved.
          </Text>
          <div className="hidden md:block">
            <div className="flex flex-row gap-2 ">
              {payment?.map((item) => (
                <Image
                  key={`payment-${item.id}`}
                  src={item.image}
                  width={40}
                  height={20}
                  alt={item.name}
                  quality={100}
                  className="bg-fill-thumbnail object-cover w-full"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Copyright;
