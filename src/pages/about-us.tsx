import Layout from "@components/Layout";
import Container from "@components/Container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export default function TermsPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      // Canvas element is not yet available, return early or handle the case.
      return;
    }
    let phi = 0;
    const globe = createGlobe(canvasRef?.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 10,
      baseColor: [0.8706, 0.1961, 0.1725],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [37.1532, 46.4964], size: 0.06 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  const { t } = useTranslation("common");
  return (
    <div className="About-Page overflow-hidden relative">
      <Container>
        <div className="px-4 lg:px-48 py-16 lg:py-14 space-y-12 lg:space-y-10">
          <div className="relative">
            <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 items-center relative text-center lg:text-left">
              <div className="w-screen max-w-full xl:max-w-lg space-y-5 lg:space-y-2">
                <h2 className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl ">
                  👋 About Us.
                </h2>
                <span className="block text-base xl:text-lg text-neutral-6000 ">
                  LIFESMILE is an ISO 9001:2015 certified company based in
                  Dubai, UAE, specializing in high-quality kitchen tools,
                  cookware, and electricals. With 15 years of experience, we
                  ship our exceptional products worldwide, ensuring the highest
                  health and quality standards for our valued customers. Our
                  focus on innovation, patented technologies, and eco-friendly
                  materials sets us apart, delivering excellence and care in
                  every product we offer.
                </span>
              </div>
              <div className="flex-grow hidden lg:flex">
                <canvas
                  ref={canvasRef}
                  style={{
                    width: 1450,
                    height: 600,
                    maxWidth: "100%",
                    aspectRatio: 1,
                  }}
                />
              </div>
            </div>
            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-14 text-neutral-900">
                <div className="">
                  <h2 className=" text-3xl md:text-4xl font-semibold">
                    🚀 Fun Facts
                  </h2>
                  <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 ">
                    LIFESMILE takes pride in its ISO 9001:2015 certification,
                    which assures customers of the company&apos;s commitment to
                    maintaining the highest quality standards in the production
                    of their kitchen tools and cookware.
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
                <div className="p-6 bg-neutral-50 rounded-2xl">
                  <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl">
                    10 million+
                  </h3>
                  <span className="block text-sm text-neutral-500 mt-3 sm:text-base">
                    LIFESMILE celebrates the sale of ten million products,
                    ensuring ten million healthier meals are prepared using
                    their top-quality and health-conscious cookware.
                  </span>
                </div>
                <div className="p-6 bg-neutral-50 rounded-2xl">
                  <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl">
                    100,000
                  </h3>
                  <span className="block text-sm text-neutral-500 mt-3 sm:text-base">
                    Registered users account (as of Sept. 30, 2021)
                  </span>
                </div>
                <div className="p-6 bg-neutral-50 rounded-2xl">
                  <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl">
                    220+
                  </h3>
                  <span className="block text-sm text-neutral-500 mt-3 sm:text-base">
                    Countries and regions have our presence (as of Sept. 30,
                    2021)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

TermsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "forms", "item"])),
    },
  };
};
