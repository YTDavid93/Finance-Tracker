import { useEffect, useState } from "react";
import { getFinance } from "../Firebase/fireStore";
import { ToastError } from "../utils/ToastError";
import useAuth from "./useAuth";
import { ExpenseIncome } from "../components/IncomeExpenseList/IncomeExpenseList";

const useFetchExpenses = () => {
  const [expenses, setExpenses] = useState<ExpenseIncome[]>([]);

  const { user } = useAuth();

  const fetchData = async (uid: string | undefined) => {
    try {
      const data = await getFinance(uid);
      setExpenses(data);
    } catch (error) {
      if (error instanceof Error) {
        ToastError.serialize(error);
      }
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchData(user.uid);
    }
  }, [user]);

  return { expenses, setExpenses };
};

export default useFetchExpenses;
