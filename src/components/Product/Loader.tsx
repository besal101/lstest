import React from "react";
import ContentLoader, { Facebook, List } from "react-content-loader";

interface IProductLoaderProps {}

const ProductLoader: React.FunctionComponent<IProductLoaderProps> = (props) => {
  return (
    <div className="container mx-auto px-4 flex flex-col gap-y-10 scroll-smooth md:px-8">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 pt-3 md:py-8">
        <ContentLoader
          speed={2}
          width={226}
          height={200}
          viewBox="0 0 226 200"
          backgroundColor="#F3F6FA"
          foregroundColor="#E7ECF3"
          className="w-full h-auto shadow-card rounded-md overflow-hidden"
          {...props}
        >
          <rect x="0" y="0" rx="0" ry="0" width="226" height="200" />
        </ContentLoader>
        <div className="flex flex-col w-full relative  md:mt-0">
          <List width="100%" />
          <div className="mt-5" />
          <List />
          <div className="mt-5" />
          <List />
          <div className="mt-5" />
        </div>
      </div>

      <div className="border-t border-slate-200"></div>
      <div
        className="flex flex-col gap-y-8 scroll-smooth md:py-8 bg-slate-100 rounded-xl"
        id="reviews"
      >
        <Facebook />
      </div>
    </div>
  );
};

export default ProductLoader;
