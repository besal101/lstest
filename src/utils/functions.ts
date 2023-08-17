import { Product, ProductVariation } from "@query/types";

import SimpleCrypto from "simple-crypto-js";
import { API_URL } from "./routes";

interface Counts {
  color: number;
  size: number;
}

type ColorCounts = {
  Colors: string[];
};

type SizesCounts = {
  Sizes: string[];
};

type PriceRange = {
  minPrice: number;
  maxPrice: number;
};

export const countUniqueNamesAndSizes = (
  products: ProductVariation[]
): Counts => {
  const nameCounts: { [color: string]: number } = {};
  const sizeCounts: { [size: string]: number } = {};

  products?.forEach((product) => {
    // Count unique names
    if (!nameCounts[product.name]) {
      nameCounts[product.name] = 1;
    } else {
      nameCounts[product.name]++;
    }

    // Count unique sizes (if size exists)
    if (product.size !== undefined) {
      if (!sizeCounts[product.size]) {
        sizeCounts[product.size] = 1;
      } else {
        sizeCounts[product.size]++;
      }
    }
  });

  return {
    color: Object.keys(nameCounts).length,
    size: Object.keys(sizeCounts).length,
  };
};

export const countUniqueColors = (products: Product[]): ColorCounts => {
  const colors: string[] = products?.reduce((acc: string[], obj) => {
    obj.variations?.forEach((variation) => {
      if (variation.name && !acc.includes(variation.name)) {
        acc.push(variation.name);
      }
    });
    return acc;
  }, []);

  return {
    Colors: colors,
  };
};

export const countUniqueSizes = (products: Product[]): SizesCounts => {
  const sizes: string[] = products?.reduce((acc: string[], obj) => {
    obj.variations?.forEach((variation) => {
      if (variation.size && !acc.includes(variation.size)) {
        acc.push(variation.size);
      }
    });
    return acc;
  }, []);

  sizes.sort((a, b) => a.localeCompare(b));

  return {
    Sizes: sizes,
  };
};

export const findPriceRange = (products: Product[]): PriceRange => {
  let minPrice = Number.MAX_SAFE_INTEGER;
  let maxPrice = Number.MIN_SAFE_INTEGER;

  products?.forEach((product) => {
    if (product.price < minPrice) {
      minPrice = product.price;
    }
    if (product.price > maxPrice) {
      maxPrice = product.price;
    }
  });

  return {
    minPrice,
    maxPrice,
  };
};

const secretKey = "your-secret-key";

// Create a SimpleCrypto instance with the secret key
const simpleCrypto = new SimpleCrypto(secretKey);

// Function to encrypt a value
export function encryption(value: any) {
  return simpleCrypto.encrypt(value);
}

// Function to decrypt an encrypted value
export function decryption(encryptedValue: any) {
  return simpleCrypto.decrypt(encryptedValue);
}

export async function downloadInvoice(orderId: number) {
  try {
    const response = await fetch(`${API_URL}/invoice/${orderId}`, {
      method: "GET",
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${orderId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      throw new Error("Error generating invoice");
    }
  } catch (error) {
    console.error("Error downloading invoice:", error);
    throw error;
  }
}
