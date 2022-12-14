import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../api/axiosPublic";

const useServices = () => {
  const {
    data: services,
    isLoading,
    isError,
    refetch,
  } = useQuery(["services"], () =>
    axiosPublic(`/service`).then((res) => res.data)
  );
  return { services, isLoading, refetch };
};

export default useServices;
