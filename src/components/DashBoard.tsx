import { useState } from "react";
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
import { addFinance } from "../Firebase/fireStore";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [search, setSeaarch] = useState("");

  const [expenses, setExpenses] = useState<ExpenseIncome[]>([]);

  const { user } = useAuth();

  const onSubmitIncome: SubmitHandler<FormDataIncome> = async (data) => {
    try {
      setExpenses([
        ...expenses,
        { ...data, id: expenses.length + 1, type: "Income" },
      ]);
      console.log(addFinance(user?.uid, data.name, data.amount, data.date, data.tag));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };

  const onSubmitExpense: SubmitHandler<FormDataExpense> = (data) => {
    setExpenses([
      ...expenses,
      { ...data, id: expenses.length + 1, type: "Expense" },
    ]);
  };

  const visibleExpenseIncome = expenses.filter((expense) => {
    const matchesCategory =
      selectedCategory === "All" || expense.type === selectedCategory;
    const matchesSearch =
      search === "" ||
      expense.type.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <TotalIncomeForm onSubmit={onSubmitIncome} />
      <TotalExpensesForm onSubmit={onSubmitExpense} />
      <div className=" flex items-center justify-between px-8 gap-x-4">
        <SearchInput onSearch={(serchText) => setSeaarch(serchText)} />
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <IncomeExpenseList
        expensesincomes={visibleExpenseIncome}
        onDelete={(id) => setExpenses(expenses.filter((el) => el.id !== id))}
      />
    </>
  );
};

export default Dashboard;
