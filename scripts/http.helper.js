const { default: axios } = require("axios");

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CATEGORIES_URL = `${API_URL}/category`;
const PRODUCTS_URL = `${API_URL}/category/product`;

async function FetchAllCategories() {
  const response = (await axios.get(CATEGORIES_URL)).data.data;
  return response;
}

async function FetchAllProductByCategory(CATEGORY_NAME) {
  const response = (await axios.get(`${PRODUCTS_URL}/${CATEGORY_NAME}`)).data
    .data;
  return response;
}

module.exports = {
  FetchAllCategories,
  FetchAllProductByCategory,
};
