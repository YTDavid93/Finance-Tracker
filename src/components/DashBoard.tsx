import { useState } from "react";
import TotalIncomeForm, { FormDataIncome } from "./totalIncome/TotalIncomeForm";
import IncomeExpenseList, {
  ExpenseIncome,
} from "./IncomeExpenseList/IncomeExpenseList";
import { SubmitHandler } from "react-hook-form";
import TotalExpensesForm, {
  FormDataExpense,
} from "./totalExpenses/TotalExpensesForm";

const Dashboard = () => {
  // const [selectedCategory, setSelectedCategory] = useState("");

  const [expenses, setExpenses] = useState<ExpenseIncome[]>([]);
  // const visibleExpenseIncome = selectedCategory ? expenses.filter((expense) => expense.ta)

  const onSubmitIncome: SubmitHandler<FormDataIncome> = (data) => {
    setExpenses([...expenses, { ...data, id: expenses.length + 1 }]);
  };

  const onSubmitExpense: SubmitHandler<FormDataExpense> = (data) => {
    setExpenses([...expenses, { ...data, id: expenses.length + 1 }]);
  };


  return (
    <>
      <TotalIncomeForm onSubmit={onSubmitIncome} />
      <TotalExpensesForm onSubmit={onSubmitExpense} />
      <IncomeExpenseList
        expensesincomes={expenses}
        onDelete={(id) => setExpenses(expenses.filter((el) => el.id !== id))}
      />
    </>
  );
};

export default Dashboard;
