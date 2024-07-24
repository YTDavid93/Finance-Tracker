import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { FormDataIncome } from "../components/totalIncome/TotalIncomeForm";
import { addFinance, updateReceipt } from "../Firebase/fireStore";
import useAuth from "./useAuth";
import useFetchExpenses from "./useFetchExpenses";
import { toast } from "react-toastify";
import { ToastError } from "../utils/ToastError";
import { FormDataExpense } from "../components/totalExpenses/TotalExpensesForm";

const useHandleFormSubmission = () => {
  const { user } = useAuth();
  const { expenses, setExpenses } = useFetchExpenses();
  const [incomeId, setIncomeId] = useState<string | null>(null);
  const [openIncome, setOpenIncome] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);
  const [expenseId, setExpenseId] = useState<string | null>(null);

  const handleSubmitIncome: SubmitHandler<FormDataIncome> = async (data) => {
    try {
      if (incomeId) {
        await updateReceipt(
          user?.uid,
          incomeId,
          data.name,
          data.amount,
          data.date,
          data.tag,
          "Income"
        );
        const updatedExpenses = expenses.map((expense) =>
          expense.id === incomeId
            ? { ...expense, ...data, type: "Income" }
            : expense
        );
        console.log("Updated Expenses (Income):", updatedExpenses);
        setExpenses(updatedExpenses);
        toast.success("Income Updated Successfully");
      } else {
        const docRef = await addFinance(
          user?.uid,
          data.name,
          data.amount,
          data.date,
          data.tag,
          "Income"
        );

        if (!docRef) {
          throw new Error("Document reference is not available");
        }
        const newIncome = {
          ...data,
          id: docRef.id,
          type: "Income",
        };
        const updatedExpenses = [...expenses, newIncome];
        console.log("Updated Expenses (New Income):", updatedExpenses);
        setExpenses(updatedExpenses);
        toast.success("Income created Successfully");
      }
    } catch (error) {
      if (error instanceof Error) {
        ToastError.serialize(error);
      }
    } finally {
      setOpenIncome(false);
      setIncomeId(null);
    }
  };

  const handleSubmitExpense: SubmitHandler<FormDataExpense> = async (data) => {
    try {
      if (expenseId) {
        await updateReceipt(
          user?.uid,
          expenseId,
          data.name,
          data.amount,
          data.date,
          data.tag,
          "Expense"
        );
        const updatedExpenses = expenses.map((expense) =>
          expense.id === expenseId
            ? { ...expense, ...data, type: "Expense" }
            : expense
        );
        console.log("Updated Expenses (Expense):", updatedExpenses);
        setExpenses(updatedExpenses);
        toast.success("Expense Updated Successfully");
      } else {
        const docRef = await addFinance(
          user?.uid,
          data.name,
          data.amount,
          data.date,
          data.tag,
          "Expense"
        );

        if (!docRef) {
          throw new Error("Document reference is not available");
        }

        const newExpense = {
          ...data,
          id: docRef.id,
          type: "Expense",
        };
        const updatedExpenses = [...expenses, newExpense];
        console.log("Updated Expenses (New Expense):", updatedExpenses);
        setExpenses(updatedExpenses);
        toast.success("Expense created Successfully");
      }
    } catch (error) {
      if (error instanceof Error) {
        ToastError.serialize(error);
      }
    } finally {
      setOpenExpense(false);
      setExpenseId(null);
    }
  };

  return {
    handleSubmitIncome,
    handleSubmitExpense,
    setIncomeId,
    setExpenseId,
    setOpenExpense,
    setOpenIncome,
    openIncome,
    openExpense,
    expenseId,
    incomeId,
    expenses,
    setExpenses
  };
};

export default useHandleFormSubmission;
