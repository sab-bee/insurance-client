import { useEffect } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPublic } from "../api/axiosPublic";
import { auth } from "../auth/firebase.init";

const useFirebase = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, cUser, cLoading, cError] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [signInWithEmailAndPassword, eUser, eLoding, eError] =
    useSignInWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const [user] = useAuthState(auth);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (user) {
      toast.success("logged in");
      navigate(from, { replace: true });
      const email = user?.email;

      axiosPublic
        .post(`/users/${email}`, { name: user?.displayName })
        .then((res) => console.log(res));
    }
  }, [user]);

  useEffect(() => {
    if (eError) {
      const message = eError.message.split(" ");
      toast.error(message.at(-1).replace(/auth|[)-/(]/g, " "));
    }
  }, [eError]);

  const handleGoogleSign = () => {
    signInWithGoogle();
  };

  const handleCreate = async ({ name, email, password }) => {
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
  };

  const handleLogin = ({ email, password }) => {
    signInWithEmailAndPassword(email, password);
  };

  return {
    google: { handleGoogleSign, gLoading },
    create: { handleCreate, cLoading },
    login: { handleLogin, eLoding },
  };
};

export default useFirebase;
