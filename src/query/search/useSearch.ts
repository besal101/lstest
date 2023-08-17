import { useQuery } from "@tanstack/react-query";

async function fetchKeywords(query: string) {
  const response = await fetch(`/api/keywords?q=${query}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export function useKeywordSearch(query: string) {
  return useQuery(["keywords", query], () => fetchKeywords(query), {
    enabled: Boolean(query),
  });
}
