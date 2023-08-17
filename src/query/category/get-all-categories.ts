import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "@query/constants";
import { CategoryType, CategoryOptionType } from "@query/types";
import { API_ENDPOINTS } from "@utils/routes";

async function FetchAllCategories(options: CategoryOptionType) {
  const { limit } = options;
  const response = await fetch(`${API_ENDPOINTS.CATEGORIES}?limit=${limit}`);
  return response.json();
}

const useCategoriesQuery = (options: CategoryOptionType) => {
  return useQuery<{ data: CategoryType[] }, Error>({
    queryKey: [QUERYKEYS.GETCATEGORY],
    queryFn: () => FetchAllCategories(options),
  });
};

export { useCategoriesQuery };
