import Checkbox from "@components/Element/CheckBox";
import RadioButton from "@components/Element/RadioButton";
import Switch from "@components/Element/Switch";
import {
  countUniqueColors,
  countUniqueSizes,
  findPriceRange,
} from "@utils/functions";
import { SORTOPTIONS } from "@utils/routes";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import PriceFilter from "./PriceFilter";
import { useAppDispatch } from "@hooks/useRedux";
import { setMobileFilter } from "@features/theme/themeSlice";

interface subCategory {
  id: number;
  name: string;
  slug: string;
}

interface IFilterOptionsProps {
  products: any;
  subCategory: subCategory[];
}

const FilterOptions: React.FunctionComponent<IFilterOptionsProps> = ({
  products,
  subCategory,
}) => {
  const COLORS = countUniqueColors(products);
  const SIZES = countUniqueSizes(products);
  const PRICERANGE = findPriceRange(products);
  const dispatch = useAppDispatch();

  const [onSale, setOnSale] = useState<boolean>(false);
  const [minValue, setMinValue] = useState<number>(PRICERANGE.minPrice);
  const [maxValue, setMaxValue] = useState<number>(PRICERANGE.maxPrice);

  const closeFilter = useCallback(
    () => dispatch(setMobileFilter(false)),
    [dispatch]
  );

  const router = useRouter();

  const handleRangeChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setMinValue(values[0]);
      setMaxValue(values[1]);
    }
  };

  const handleRangeSlide = () => {
    closeFilter();
    const newQuery = {
      ...router.query,
      minprice: minValue,
      maxprice: maxValue,
    };
    router.push(
      {
        query: newQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleClick = (slug: string, queryname: string) => {
    closeFilter();
    const queryParams = new URLSearchParams(router.asPath.split("?")[1]);
    const selectedSubcategories = queryParams.getAll(queryname);
    const isSelected = selectedSubcategories.includes(slug as string);
    if (isSelected) {
      const updatedSubcategories = selectedSubcategories.filter(
        (category) => category !== slug
      );
      queryParams.delete(queryname);
      updatedSubcategories.forEach((subcategory) =>
        queryParams.append(queryname, subcategory)
      );
    } else {
      queryParams.append(queryname, slug as string);
    }
    const currentPath = router.asPath.split("?")[0];
    const newUrl = `${currentPath}?${queryParams.toString()}`;
    router.push(newUrl);
  };

  const handleSortClick = (value: string) => {
    closeFilter();
    const queryParams = new URLSearchParams(router.asPath.split("?")[1]);
    const selectedSort = queryParams.getAll("sort");
    const isSelected = selectedSort.includes(value);

    if (queryParams.has("sort")) {
      if (isSelected) {
        // Remove the specific value from the "sort" query parameter
        const updatedSort = selectedSort.filter(
          (sortValue) => sortValue !== value
        );
        queryParams.delete("sort");
        updatedSort.forEach((sortValue) =>
          queryParams.append("sort", sortValue)
        );
      } else {
        // Update the existing "sort" query parameter with the new value
        queryParams.set("sort", value);
      }
    } else {
      // If the "sort" query parameter is not present, simply append it with the new value
      queryParams.append("sort", value);
    }

    const currentPath = router.asPath.split("?")[0];
    const newUrl = `${currentPath}?${queryParams.toString()}`;
    router.push(newUrl);
  };

  return (
    <div className="divide-y divide-slate-200">
      <div className="relative flex flex-col pb-4">
        <h3 className="font-semibold mb-2.5 text-lg">Sub Category</h3>
        <div className="flex flex-col">
          {subCategory.map((item, index) => (
            <div className="inline-flex items-center mt-0 -ml-3" key={index}>
              <Checkbox
                name={item.name}
                slug={item.slug}
                type="subcategory"
                onCheckboxClick={handleClick}
              />
            </div>
          ))}
        </div>
      </div>
      {COLORS.Colors.length > 0 && (
        <div className="relative flex flex-col py-4">
          <h3 className="font-semibold mb-2.5 text-lg">Colors</h3>
          <div className="flex flex-col">
            {COLORS?.Colors?.map((item, index) => (
              <div className="inline-flex items-center mt-0 -ml-3" key={index}>
                <Checkbox
                  name={item}
                  slug={item}
                  type="color"
                  onCheckboxClick={handleClick}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {SIZES.Sizes.length > 0 && (
        <div className="relative flex flex-col py-4">
          <h3 className="font-semibold mb-2.5 text-lg">Sizes</h3>
          <div className="flex flex-col">
            {SIZES.Sizes.map((item, index) => (
              <div className="inline-flex items-center mt-0 -ml-3" key={index}>
                <Checkbox
                  name={item}
                  slug={item}
                  type="size"
                  onCheckboxClick={handleClick}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative flex flex-col py-4 pr-3">
        <PriceFilter
          minValue={PRICERANGE.minPrice}
          maxValue={PRICERANGE.maxPrice}
          value={[minValue, maxValue]}
          onRangeChange={handleRangeChange}
          handleSlide={handleRangeSlide}
        />
      </div>
      <div className="py-4">
        <div className="flex fle justify-between items-center space-x-2 ">
          <div>
            <label className="text-neutral-900 font-semibold text-lg">
              On sale!
            </label>
            <p className="text-neutral-500 text-sm ">
              Products currently on sale
            </p>
          </div>
          <Switch
            checked={onSale}
            onChange={(e) => {
              setOnSale(!onSale);
              handleClick("true", "onsale");
            }}
            variant="primary"
          />
        </div>
      </div>
      <div className="relative flex flex-col py-4">
        <h3 className="font-semibold mb-2.5 text-lg">Sort order</h3>
        {SORTOPTIONS.map((option, index) => (
          <div className="inline-flex items-center -ml-3 mt-0" key={index}>
            <RadioButton
              value={option.value}
              name={option.label}
              onbuttonClick={handleSortClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterOptions;
