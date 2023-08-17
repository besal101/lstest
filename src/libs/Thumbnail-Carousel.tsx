import productGalleryPlaceholder from "@assets/product-placeholder.png";
import SocialShareBox from "@components/social-share-box";
import { getDirection } from "@utils/getDirection";
import { CDN_URL_PRODUCT, ROUTES, SITE_URL } from "@utils/routes";
import useWindowSize from "@utils/useWindowSize";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { IoArrowRedoOutline } from "react-icons/io5";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Navigation, Pagination, SwiperOptions, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  gallery: string[];
  thumbnailClassName?: string;
  galleryClassName?: string;
}

// product gallery breakpoints
const galleryCarouselBreakpoints = {
  "0": {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  "640": {
    slidesPerView: 5,
    slidesPerGroup: 5,
  },
  "768": {
    slidesPerView: 6,
    slidesPerGroup: 6,
  },
};

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ThumbnailCarousel: React.FC<Props> = ({ gallery }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const router = useRouter();

  const { width } = useWindowSize();
  const isSmallScreen = width ? width < 768 : false;
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    let images: string[] = [];
    if (gallery && gallery.length > 0) {
      gallery.map((item) => {
        images.push(`${item}`);
      });
      setProductImages(images as any);
    }
  }, [gallery]);

  const productUrl = `${SITE_URL}${ROUTES.PRODUCT}/${router.query.slug}`;

  let lightboxView;
  if (isOpen) {
    lightboxView = (
      <Lightbox
        mainSrc={`${CDN_URL_PRODUCT}/${productImages[photoIndex]}`}
        nextSrc={`${CDN_URL_PRODUCT}/${
          productImages[(photoIndex + 1) % productImages.length]
        }`}
        prevSrc={`${CDN_URL_PRODUCT}/${
          productImages[
            (photoIndex + productImages.length - 1) % productImages.length
          ]
        }`}
        onCloseRequest={() => {
          setIsOpen(false);
        }}
        onMovePrevRequest={() => {
          setPhotoIndex(
            (photoIndex + productImages.length - 1) % productImages.length
          );
        }}
        onMoveNextRequest={() => {
          setPhotoIndex((photoIndex + 1) % productImages.length);
        }}
      />
    );
  }

  const handleOpenLightbox = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    i: number
  ) => {
    e.preventDefault();
    setPhotoIndex(i);
    setIsOpen(true);
  };
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };

  return (
    <div className="grid md:grid-cols-6 grid-cols-1 gap-2">
      <div className="col-span-5 order-1 md:order-2">
        <div className="relative">
          <div className="relative">
            <button
              onClick={handleChange}
              className="w-9 h-9 z-50 flex items-center justify-center rounded-full bg-white  text-neutral-700 absolute right-3 top-3 "
            >
              {shareButtonStatus === true ? (
                <AiOutlineClose className="w-5 h-5 text-brand" />
              ) : (
                <IoArrowRedoOutline className="w-5 h-5 text-brand" />
              )}
            </button>
            <SocialShareBox
              className={`absolute z-50 ltr:right-0 rtl:left-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${
                shareButtonStatus === true
                  ? "visible opacity-100 top-14 right-4"
                  : "opacity-0 invisible top-[130%]"
              }`}
              shareUrl={productUrl}
            />
          </div>

          <Swiper
            id="productGallery"
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs, Pagination]}
            navigation={{
              prevEl: prevRef.current!, // Assert non-null
              nextEl: nextRef.current!, // Assert non-null
            }}
            pagination={{ clickable: true }}
            {...swiperParams}
          >
            {gallery?.map((item: any, index: number) => (
              <SwiperSlide
                key={`product-gallery-${index}`}
                className={"rounded-2xl h-full w-full object-cover"}
              >
                <Image
                  src={
                    `${CDN_URL_PRODUCT}/${item}` ?? productGalleryPlaceholder
                  }
                  alt={`Product gallery ${index}`}
                  width={800}
                  height={900}
                  className="rounded-lg cursor-zoom-in"
                  onClick={(e) => handleOpenLightbox(e, index)}
                  style={{ filter: "brightness(0.95)" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex items-center justify-between w-full absolute top-2/4 z-10 px-2.5">
            <div
              ref={prevRef}
              className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl bg-brand-light hover:bg-brand hover:text-brand-light focus:outline-none shadow-navigation"
            >
              {dir === "rtl" ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </div>
            <div
              ref={nextRef}
              className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl bg-brand-light hover:bg-brand hover:text-brand-light focus:outline-none shadow-navigation"
            >
              {dir === "rtl" ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </div>
          </div>
        </div>
      </div>

      {!isSmallScreen && (
        <div className="hidden xl:block col-span-1 order-2 md:order-1">
          <div className="flex md:flex-col flex-row gap-3 overflow-y-hidden justify-center">
            <Swiper
              id="productGalleryThumbs"
              onSwiper={setThumbsSwiper}
              spaceBetween={0}
              watchSlidesProgress={true}
              freeMode={true}
              observer={true}
              observeParents={true}
              breakpoints={galleryCarouselBreakpoints}
            >
              {gallery?.map((item: any, index: number) => (
                <SwiperSlide
                  key={`product-thumb-gallery-${index}`}
                  className="flex items-center justify-center overflow-hidden transition rounded-lg cursor-pointer border-border-base hover:opacity-75"
                >
                  <Image
                    src={
                      `${CDN_URL_PRODUCT}/thumbnail/${item}` ??
                      productGalleryPlaceholder
                    }
                    alt={`Product thumb gallery ${item.id}`}
                    width={90}
                    height={110}
                    className="rounded-lg"
                    style={{ filter: "brightness(0.95)" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
      {lightboxView}
    </div>
  );
};

export default ThumbnailCarousel;
