import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

export const siteSettings = {
  name: "Life Smile",
  phone: "00971521573960",
  description:
    "Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.",
  author: {
    name: "Bishal Kahtri & Ali Hamza",
    websiteUrl: "https://bishalkhatri.com",
    address: "Dubai",
  },
};

export const SITE_URL = process.env.NEXT_PUBLIC_AUTH_URL;

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CDN_URL = "https://cdn.lifesmile.ae";

export const CDN_URL_CATEGORY = "https://cdn.lifesmile.ae/ls/category";

export const CDN_URL_PRODUCT = "https://cdn.lifesmile.ae/ls/product";

export const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51JJaiYDJogiiRoKPz9FQCpbex6qoQeL9kIAmMmnXu6pBTynPoqyuN0QZbCPhITjFQcH3Uw948TmZWLyKdJOs5baV00i9AJ0aJb";

export const ROUTES = {
  HOME: "/",
  PRODUCT: `/product`,
  CART: "/cart",
  CATEGORY: "/category",
  SEARCH: "/search",
  CHECKOUT: "/checkout",
  PRIVACY: "/privacy",
  ACCOUNT_SETTING: "/my-account/account-settings",
  ORDERS: "/my-account/orders",
  WISHLIST: "/my-account/wishlist",
  ADDRESS: "/my-account/address",
  NOTIFICATION: "/my-account/notification",
  LEGAL_NOTICE: "/my-account/legal-notice",
  HELP_CENTER: "/my-account/help-center",
  CHANGE_PASSWORD: "/my-account/change-password",
};

export const MENUROUTES = [
  {
    id: 1,
    path: "pots-and-casserole",
    label: "pots-and-casserole",
  },
  {
    id: 2,
    path: "frying-pans",
    label: "pans",
  },
  {
    id: 3,
    path: "cake-molds",
    label: "cake-molds",
  },
  {
    id: 4,
    path: "plates-and-bowls",
    label: "plates-and-bowls",
  },
  {
    id: 5,
    path: "glass-drinkware",
    label: "glassware",
  },
];

export const API_ENDPOINTS = {
  CATEGORIES: `${API_URL}/category`,
  PRODUCTS: `${API_URL}/product`,
  BEST_SELLER: `${API_URL}/product/best-seller`,
  ADDRESS: `${API_URL}/address`,
  SEARCH: `${API_URL}/search`,
};

export const Category = [
  {
    id: 1,
    slug: "Cookware-Sets",
    name: "Cookware Sets",
    image: "/category/Cookware-Sets.png",
  },
  {
    id: 2,
    slug: "Dinner-Sets",
    name: "Dinner Sets",
    image: "/category/Dinner-Sets.png",
  },
  {
    id: 3,
    slug: "Cutlery-Sets",
    name: "Cutlery Sets",
    image: "/category/Cutlery-Sets.png",
  },
  {
    id: 4,
    slug: "cake-molds",
    name: "Cake Molds",
    image: "/category/Cake-Molds.png",
  },
  {
    id: 5,
    slug: "Coffee-Tea-Set",
    name: "Coffee Tea Set",
    image: "/category/Coffee-Tea-Set.png",
  },
  {
    id: 6,
    slug: "Canister-Sets",
    name: "Canister Sets",
    image: "/category/Canister-Sets.png",
  },
  {
    id: 7,
    slug: "Drying-Dishracks",
    name: "Drying Dish racks",
    image: "/category/Drying-Dishracks.png",
  },
  {
    id: 8,
    slug: "Electric-Items",
    name: "Electric Items",
    image: "/category/Electric-Items.png",
  },
  {
    id: 9,
    slug: "Pots-Casseroles",
    name: "Pots Casseroles",
    image: "/category/Pots-Casseroles.png",
  },
  {
    id: 10,
    slug: "Frying-Pans",
    name: "Frying Pans",
    image: "/category/Frying-Pans.png",
  },
  {
    id: 11,
    slug: "Pressure-Cooker",
    name: "Pressure Cooker",
    image: "/category/Pressure-Cooker.png",
  },
  {
    id: 12,
    slug: "Kitchen-Tools",
    name: "Kitchen Tools",
    image: "/category/Kitchen-Tools.png",
  },
  {
    id: 13,
    slug: "Kettles-Pots",
    name: "Kettles Pots",
    image: "/category/Kettles-Pots.png",
  },
  {
    id: 14,
    slug: "Glass-Drinkware",
    name: "Glass Drinkware",
    image: "/category/Glass-Drinkware.png",
  },
  {
    id: 15,
    slug: "Home-Decor",
    name: "Home Decor",
    image: "/category/Home-Decor.png",
  },
  {
    id: 16,
    slug: "Accessories",
    name: "Accessories",
    image: "/category/Accessories.png",
  },
];

export const LIMITS = {
  PRODUCTS_CAROUSEL: 8,
  CATEGORIES_LIMITS: 18,
};

export const footer = {
  widgets: [
    {
      id: 1,
      widgetTitle: "pages",
      lists: [
        {
          id: 1,
          title: "link-about-us",
          path: "/about-us",
        },
        {
          id: 2,
          title: "link-contact-us",
          path: "/contact-us",
        },
        {
          id: 3,
          title: "link-careers",
          path: "/careers",
        },
        {
          id: 4,
          title: "link-collaborate",
          path: "/collaborate",
        },
      ],
    },
    {
      id: 2,
      widgetTitle: "widget-title-my-account",
      lists: [
        {
          id: 1,
          title: "track-my-order",
          path: "/track-order",
        },
        {
          id: 2,
          title: "view-cart",
          path: "/cart",
        },
        {
          id: 3,
          title: "sign-in",
          path: "/sign-in",
        },
        {
          id: 4,
          title: "my-wishlist",
          path: "/mywishlist",
        },
      ],
    },
    {
      id: 3,
      widgetTitle: "widget-customer-service",
      lists: [
        {
          id: 1,
          title: "shipping-and-delivery",
          path: "/",
        },
        {
          id: 2,
          title: "terms-and-conditions",
          path: "/",
        },
        {
          id: 3,
          title: "help-support",
          path: "/",
        },
        {
          id: 4,
          title: "returns-and-exchanges",
          path: "/",
        },
      ],
    },
    {
      id: 4,
      widgetTitle: "policy",
      lists: [
        {
          id: 1,
          title: "privacy-policy",
          path: "/",
        },
        {
          id: 2,
          title: "cookie-policy",
          path: "/",
        },
      ],
    },
  ],
  payment: [
    {
      id: 1,
      image: "/payment/cash.png",
      name: "cash",
    },
    {
      id: 2,
      image: "/payment/stripe.png",
      name: "stripe",
    },
    {
      id: 3,
      image: "/payment/visa.png",
      name: "visa",
    },
    {
      id: 4,
      image: "/payment/mastercard.png",
      name: "mastercard",
    },
    {
      id: 5,
      image: "/payment/discover.png",
      name: "discover",
    },
  ],
  social: [
    {
      id: 1,
      path: "https://www.facebook.com/lifesmile.ae",
      icon: FaFacebook,
      width: 20,
      height: 20,
    },
    {
      id: 2,
      path: "https://www.youtube.com/channel/UCfqdBgGEKb6KZtl5Pqd7YrA",
      icon: FaYoutube,
      width: 20,
      height: 20,
    },
    {
      id: 3,
      path: "https://www.instagram.com/lifesmile.ae/",
      icon: FaInstagram,
      width: 20,
      height: 20,
    },
    {
      id: 4,
      path: "https://twitter.com/lifesmile_ae",
      icon: FaTwitter,
      width: 20,
      height: 20,
    },
  ],
};

export const fullpageBanner = {
  id: 1,
  slug: "cutlery-sets",
  image: {
    mobile: {
      url: "/adbanner-mobile-new.png",
      width: 450,
      height: 400,
    },
    desktop: {
      url: "/adbanner-1.png",
      width: 1840,
      height: 400,
    },
  },
};

export const RecommendedBanner = [
  {
    id: 1,
    slug: "pots-and-casserole",
    image: "/collection/collection-01-a.png",
    title: "collection-title-one",
    description: "collection-title-one-sub",
  },
  {
    id: 2,
    slug: "plates-and-bowls",
    image: "/collection/collection-02-b.png",
    title: "collection-title-two",
    description: "collection-title-two-sub",
  },
  {
    id: 3,
    slug: "cutlery-sets",
    image: "/collection/collection-03-c.png",
    title: "collection-title-three",
    description: "collection-title-three-sub",
  },
  {
    id: 4,
    slug: "cake-molds",
    image: "/collection/collection-04-d.png",
    title: "collection-title-four",
    description: "collection-title-four-sub",
  },
];

export const TwoGridBanner = [
  {
    id: 1,
    title: "Free delivery from your store",
    slug: "kitchen-tools?subcategory=knife-set",
    image: {
      mobile: {
        url: "/banner/banner-mob-1.png",
        width: 450,
        height: 222,
      },
      desktop: {
        url: "/collection/collection-05.png",
        width: 910,
        height: 450,
      },
    },
  },
  {
    id: 2,
    title: "Fresh Healthy Breakfast food",
    slug: "canister",
    image: {
      mobile: {
        url: "/banner/banner-mob-2.png",
        width: 450,
        height: 222,
      },
      desktop: {
        url: "/collection/collection-06.png",
        width: 910,
        height: 450,
      },
    },
  },
];

export const ThreeGridBanner = {
  id: 2,
  slug: "pots-and-casserole",
  image: {
    mobile: {
      url: "/adbanner-2-mobile.png",
      width: 450,
      height: 400,
    },
    desktop: {
      url: "/adbanner-2-faizu.png",
      width: 1840,
      height: 400,
    },
  },
};

export const SORTOPTIONS = [
  {
    id: 1,
    value: "popularity",
    label: "Most Popular",
  },
  {
    id: 2,
    value: "rating",
    label: "Best rating",
  },
  {
    id: 3,
    value: "date",
    label: "Newest",
  },
  {
    id: 4,
    value: "price",
    label: "Price: low to high",
  },
  {
    id: 5,
    value: "price-desc",
    label: "Price: high to low",
  },
];
