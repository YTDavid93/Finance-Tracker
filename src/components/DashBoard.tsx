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

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [expenses, setExpenses] = useState<ExpenseIncome[]>([]);
  console.log(expenses);

  const onSubmitIncome: SubmitHandler<FormDataIncome> = (data) => {
    setExpenses([
      ...expenses,
      { ...data, id: expenses.length + 1, type: "Income" },
    ]);
  };

  const onSubmitExpense: SubmitHandler<FormDataExpense> = (data) => {
    setExpenses([
      ...expenses,
      { ...data, id: expenses.length + 1, type: "Expense" },
    ]);
  };

  const visibleExpenseIncome =
    selectedCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.type === selectedCategory);

  return (
    <>
      <TotalIncomeForm onSubmit={onSubmitIncome} />
      <TotalExpensesForm onSubmit={onSubmitExpense} />
      <ExpenseFilter
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <IncomeExpenseList
        expensesincomes={visibleExpenseIncome}
        onDelete={(id) => setExpenses(expenses.filter((el) => el.id !== id))}
      />
    </>
  );
};

export default Dashboard;
