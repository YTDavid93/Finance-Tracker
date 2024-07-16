import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastError } from "../utils/ToastError";
import { UserCredential } from "firebase/auth";

interface Props {
  authAction: () => Promise<UserCredential>;
  successMessage: string;
  redirectPath: string;
}

const useAuthAction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAction = async ({ 
    authAction, successMessage, redirectPath
  }:Props) => {
    setLoading(true);
    try {
      await authAction();
      toast.success(successMessage);
      navigate(redirectPath);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    handleAction,
    loading,
    error,
  };
};

export default useAuthAction;
