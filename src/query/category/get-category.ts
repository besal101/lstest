import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "@query/constants";
import { API_ENDPOINTS } from "@utils/routes";

type CategoryOption = {
  slug: string; // Change "string" to string
};

type SearchOption = {
  slug: string; // Change "string" to string
};

async function FetchSingleCategory(options: CategoryOption) {
  const { slug } = options;
  const response = await fetch(`${API_ENDPOINTS.CATEGORIES}/${slug}`);
  return response.json();
}

const useGetSingleCategory = (options: CategoryOption) => {
  return useQuery({
    queryKey: [QUERYKEYS.GETSINGLECATEGORY, options],
    queryFn: () => FetchSingleCategory(options),
  });
};

async function FetchFromSearch(options: CategoryOption) {
  const { slug } = options;
  const response = await fetch(`${API_ENDPOINTS.SEARCH}?q=${slug}`);
  return response.json();
}

const useGetFromSearch = (options: SearchOption) => {
  return useQuery({
    queryKey: [QUERYKEYS.GETFROMSEARCH, options],
    queryFn: () => FetchFromSearch(options),
  });
};

export { useGetSingleCategory, useGetFromSearch };
