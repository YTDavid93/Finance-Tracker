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

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [search, setSeaarch] = useState("");

  const [expenses, setExpenses] = useState<ExpenseIncome[]>([]);

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

  // filter loic
  /*   const visibleExpenseIncome =
    selectedCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.type === selectedCategory);

  
   // search by name logic
    const visibleSearchByName = search
      ? expenses.filter((expense) =>
          expense.type.includes(search)
        )
      : expenses; */

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
      <div className=" flex items-center">
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
