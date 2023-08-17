import { Product } from "@query/types";
import { useEffect, useState } from "react";

const useProduct = (product: Product) => {
  const {
    variations,
    mainImage,
    variationType,
    price,
    quantity,
    itemCode,
    name,
    selected,
  } = product;

  const [productImages, setProductImages] = useState<string[]>([]);
  const [productStock, setProductStock] = useState<number>(0);
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [productPrice, setProductPrice] = useState<number>(0);
  const [colorImage, setColorImage] = useState<string>("");
  const [productCode, setProductCode] = useState<string | undefined>("");
  const [variationName, setVariationName] = useState<string>("");
  const [variationColor, setVariationColor] = useState<any>();
  const [variationSize, setVariationSize] = useState<any>();
  const [availableColors, setAvailableColors] = useState<any>();
  const [availableSizes, setAvailableSizes] = useState<any>();
  const [variationId, setVariationId] = useState<number | null>();

  const filteredColors: { name: string; colorImage: string | undefined }[] = (
    (variations as any) || []
  ).reduce(
    (
      names: { name: any; colorImage: any }[],
      item: { name: any; colorImage: any }
    ) => {
      if (!names.find((name) => name.name === item.name)) {
        names.push({ name: item.name, colorImage: item.colorImage });
      }
      return names;
    },
    []
  );

  const filteredSizes: (string | undefined)[] = variations
    ? [...new Set(variations.map((item) => item.size))].filter(
        (size) => size !== undefined
      )
    : [];

  useEffect(() => {
    //Handle if the product has no variation
    if (variationType === "single") {
      setProductImages(mainImage && JSON.parse(mainImage));
      setProductPrice(price ? price : 0);
      setProductStock(quantity ? quantity : 0);
      setProductCode(itemCode);
      setVariationId(null);
    }
    if (variationType === "variationbycolor") {
      setProductImages(
        selected && selected.length > 0
          ? selected[0].images && JSON.parse(selected[0].images)
          : []
      );
      setProductStock(
        selected && selected[0]?.quantity ? selected[0].quantity : 0
      );
      setProductPrice(selected && selected[0]?.price ? selected[0].price : 0);
      setColorImage(
        selected && selected[0]?.colorImage ? selected[0].colorImage : ""
      );
      setProductCode(selected && selected[0]?.itemCode);
      setVariationColor(selected && selected[0]?.name ? selected[0].name : "");
      setAvailableColors(filteredColors);
      setVariationId(selected && selected[0]?.id ? selected[0].id : null);
    }

    if (variationType === "variationbysize") {
      setProductImages(mainImage && JSON.parse(mainImage));
      setProductStock(
        selected && selected[0]?.quantity ? selected[0].quantity : 0
      );
      setProductPrice(selected && selected[0]?.price ? selected[0].price : 0);
      setProductCode(selected && selected[0]?.itemCode);
      setVariationSize(selected && selected[0]?.name ? selected[0].name : "");
      setAvailableSizes(filteredSizes);
      setVariationId(selected && selected[0]?.id ? selected[0].id : null);
    }

    if (variationType === "variationbymulti") {
      setProductImages(
        selected && selected.length > 0
          ? selected[0].images && JSON.parse(selected[0].images)
          : []
      );
      setProductStock(
        selected && selected[0]?.quantity ? selected[0].quantity : 0
      );
      setProductPrice(selected && selected[0]?.price ? selected[0].price : 0);
      setProductCode(selected && selected[0]?.itemCode);
      setVariationName(selected && selected[0]?.name ? selected[0].name : "");
      setVariationColor(selected && selected[0]?.name ? selected[0].name : "");
      setVariationSize(selected && selected[0]?.size ? selected[0].size : "");
      setAvailableSizes(filteredSizes);
      setAvailableColors(filteredColors);
      setVariationId(selected && selected[0]?.id ? selected[0].id : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCode, mainImage, price, quantity, selected, variationType]);

  const productQuantityIncrement = () => {
    setProductQuantity((prevState) => (prevState += 1));
  };

  const productQuantityDecrement = () =>
    setProductQuantity((prevState) => (prevState > 1 ? (prevState -= 1) : 1));

  return {
    productImages,
    productStock,
    productQuantity,
    productPrice,
    colorImage,
    productCode,
    variationName,
    availableColors,
    availableSizes,
    variationColor,
    variationSize,
    variationId,
    productQuantityIncrement,
    productQuantityDecrement,
  };
};

export default useProduct;
