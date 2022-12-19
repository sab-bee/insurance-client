import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { axiosPrivate } from "../api/axiosPrivate";
import { auth } from "../auth/firebase.init";

export const useAdmin = () => {
  const [user] = useAuthState(auth);
  const { data, isLoading } = useQuery(["user"], () =>
    axiosPrivate(`/user/info/${user.email}`).then((res) => {
      return res.data;
    })
  );

  return { data, isLoading };
};
