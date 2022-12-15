import { useQuery } from "@tanstack/react-query"
import { axiosPrivate } from "../api/axiosPrivate"

export const useAdmin = (user) => {
  const {
    data: admin,
    isLoading,
    isError,
  } = useQuery(['admin', user.email], () =>
    axiosPrivate(`/admin?email=${user.email}`).then((res) => res.data?.admin)
  )

  return { admin, isLoading, isError }
}