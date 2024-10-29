import { getAuth, signOut } from "../utils/firebase";

const useLogout = () => {
  const auth = getAuth();

  const logout = async () => {
    try {
      await signOut(auth);
      alert("You have logged out.");
    } catch (error) {
    }
  };

  return logout;
};

export default useLogout;

