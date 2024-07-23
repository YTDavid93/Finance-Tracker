import { useEffect, useState } from "react";
import TotalIncomeForm, { FormDataIncome } from "./totalIncome/TotalIncomeForm";
import IncomeExpenseList, {
  ExpenseIncome,
} from "./IncomeExpenseList/IncomeExpenseList";
import { SubmitHandler } from "react-hook-form";
import TotalExpensesForm, {
  FormDataExpense,
} from "./totalExpenses/TotalExpensesForm";
import ExpenseFilter from "./expenseFilter/ExpenseFilter";
import SearchInput from "./search/SearchInput";
import {
  addFinance,
  deleteReceipt,
  getFinance,
  updateReceipt,
} from "../Firebase/fireStore";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { ToastError } from "../utils/ToastError";
import CurrentBalance from "./balance/CurrentBalance";

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSeaarch] = useState("");
  const [expenses, setExpenses] = useState<ExpenseIncome[]>([]);
  const { user } = useAuth();
  const [openIncome, setOpenIncome] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);
  const [incomeId, setIncomeId] = useState<string | null>(null);
  const [expenseId, setExpenseId] = useState<string | null>(null);

  const fetchData = async (uid: string | undefined) => {
    try {
      const data = await getFinance(uid);
      setExpenses(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    } 
  };

  useEffect(() => {
    if (user?.uid) {
      fetchData(user.uid);
    }
  }, [user, fetchData]);

  const onSubmitIncome: SubmitHandler<FormDataIncome> = async (data) => {
    try {
      if (incomeId) {
        updateReceipt(
          user?.uid,
          incomeId,
          data.name,
          data.amount,
          data.date,
          data.tag,
          "Income"
        );
        const upatedExpenses = expenses.map((expense) =>
          expense.id === incomeId
            ? { ...expense, ...data, type: "Income" }
            : expense
        );
        setExpenses(upatedExpenses);
        toast.success("Income Updated Successfully");
      } else {
        const newIncome = {
          ...data,
          id: `${expenses.length + 1}`,
          type: "Income",
        };
        setExpenses([...expenses, newIncome]);
        await addFinance(
          user?.uid,
          data.name,
          data.amount,
          data.date,
          data.tag,
          "Income"
        );
        toast.success("Income created Successfully");
        setIncomeId(null);
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

  const onSubmitExpense: SubmitHandler<FormDataExpense> = async (data) => {
    try {
      if (expenseId) {
        updateReceipt(
          user?.uid,
          expenseId,
          data.name,
          data.amount,
          data.date,
          data.tag,
          "Expense"
        );
        const updateExpense = expenses.map((expense) =>
          expense.id === expenseId
            ? { ...expense, ...data, type: "Income" }
            : expense
        );
        setExpenses(updateExpense);
        toast.success("Expense Updated Successfully");
      } else {
        await addFinance(
          user?.uid,
          data.name,
          data.amount,
          data.date,
          data.tag,
          "Expense"
        );
        const newExpense = {
          ...data,
          id: `${expenses.length + 1}`,
          type: "Expense",
        };
        setExpenses([...expenses, newExpense]);
        toast.success("Expense created Successfully");
      }
    } catch (error) {
      if (error instanceof Error) {
        ToastError.serialize(error);
      }
    }
    setOpenExpense(false);
    setIncomeId(null);
  };

  // searching and filtering logic
  const visibleExpenseIncome = expenses.filter((expense) => {
    const matchesCategory =
      selectedCategory === "All" || expense.type === selectedCategory;
    const matchesSearch =
      search === "" ||
      expense.type.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Separate expenses and incomes
  const expensesOnly = expenses.filter((expense) => expense.type === "Expense");
  const incomesOnly = expenses.filter((expense) => expense.type === "Income");

  // edit logic
  const handleEdit = (id: string) => {
    const dataToEdit = expenses.find((expense) => expense.id === id);
    if (dataToEdit) {
      if (dataToEdit.type === "Income") {
        setIncomeId(id);
        setOpenIncome(true);
      } else {
        setExpenseId(id);
        setOpenExpense(true);
      }
    }
  };

  //Delete logic
  const handleDelete = async (id: string) => {
    try {
      await deleteReceipt(id);
      setExpenses(expenses.filter((el) => el.id !== id));
      toast.success("Data deleted Successfully");
    } catch (error) {
      if (error instanceof Error) {
        ToastError.serialize(error);
      }
    }
  };

  const handleIncomeModal = (open: boolean) => {
    setIncomeId(null);
    setOpenIncome(open);
  };

  const handleExpenseModal = (open: boolean) => {
    setExpenseId(null);
    setOpenExpense(open);
  };

  return (
    <>
      <TotalIncomeForm
        open={openIncome}
        onOpenChange={handleIncomeModal}
        onSubmit={onSubmitIncome}
        editId={incomeId}
        incomes={incomesOnly}
      />
      <TotalExpensesForm
        open={openExpense}
        onOpenChange={handleExpenseModal}
        onSubmit={onSubmitExpense}
        editId={expenseId}
        expenses={expensesOnly}
      />
      <CurrentBalance incomes={incomesOnly} expenses={expensesOnly} />
      <div className=" flex items-center justify-between px-8 gap-x-4">
        <SearchInput onSearch={(serchText) => setSeaarch(serchText)} />
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <IncomeExpenseList
        onEdit={handleEdit}
        expensesincomes={visibleExpenseIncome}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Dashboard;
