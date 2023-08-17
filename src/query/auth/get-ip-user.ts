import { QUERYKEYS } from "@query/constants";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async () => {
  const response = await fetch("/api/userip");
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};

const useGetUserIP = () => {
  return useQuery({
    queryKey: [QUERYKEYS.GETFROMSEARCH],
    queryFn: () => fetchUser(),
  });
};

export default useGetUserIP;
