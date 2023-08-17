const fs = require("fs");
const globby = require("globby");
const {
  FetchAllCategories,
  FetchAllProductByCategory,
} = require("./http.helper");

function addPage(page, slug = "") {
  const path = page
    .replace("src/pages", "")
    .replace(".tsx", "")
    .replace("[slug]", slug);
  const route = path === "/index" ? "" : path;

  return `<url>
    <loc>${`${process.env.NEXT_PUBLIC_AUTH_URL}${route}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`;
}

async function GenerateSitemap(directory, filename, data = []) {
  const pages = await globby(directory);

  const sitemap =
    data && data[0]
      ? `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${data.map((item) => addPage(pages[0], item.slug))}
    </urlset>`
      : `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map((page) => addPage(page))}
    </urlset>`;
  fs.writeFileSync(`public/${filename}`, sitemap);
}

async function fetchData() {
  const categories = await FetchAllCategories();
  const products = [];

  for (category of categories) {
    products.push(await FetchAllProductByCategory(category.slug));
  }

  return {
    categories,
    products: products.flat(),
  };
}

async function startGenerator() {
  const { categories, products } = await fetchData();

  GenerateSitemap(
    ["src/pages/category/**/*.tsx"],
    "category-sitemap.xml",
    categories
  );
  GenerateSitemap(
    ["src/pages/product/**/*.tsx"],
    "product-sitemap.xml",
    products
  );
  GenerateSitemap(
    [
      "src/pages/**/*.tsx",
      "!src/pages/_*.tsx",
      "!src/pages/api",
      "!src/pages/category",
      "!src/pages/product",
    ],
    "main-sitemap.xml"
  );
}

startGenerator();
