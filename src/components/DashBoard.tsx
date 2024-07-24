import { useState } from "react";
import TotalIncomeForm from "./totalIncome/TotalIncomeForm";
import IncomeExpenseList from "./IncomeExpenseList/IncomeExpenseList";
import TotalExpensesForm from "./totalExpenses/TotalExpensesForm";
import ExpenseFilter from "./expenseFilter/ExpenseFilter";
import SearchInput from "./search/SearchInput";
import { deleteReceipt } from "../Firebase/fireStore";
import { toast } from "react-toastify";
import { ToastError } from "../utils/ToastError";
import CurrentBalance from "./balance/CurrentBalance";
import useHandleFormSubmission from "../hooks/useHandleFormSubmission";

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSeaarch] = useState("");
  const {
    handleSubmitIncome,
    handleSubmitExpense,
    setIncomeId,
    setExpenseId,
    openIncome,
    openExpense,
    setOpenExpense,
    setOpenIncome,
    expenseId,
    incomeId,
    expenses,
    setExpenses,
  } = useHandleFormSubmission();

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
      <div className="flex gap-4 flex-wrap p-6">
        <CurrentBalance incomes={incomesOnly} expenses={expensesOnly} />
        <TotalExpensesForm
          open={openExpense}
          onOpenChange={handleExpenseModal}
          onSubmit={(data) => handleSubmitExpense(data)}
          editId={expenseId}
          expenses={expensesOnly}
        />
        <TotalIncomeForm
          open={openIncome}
          onOpenChange={handleIncomeModal}
          onSubmit={(data) => handleSubmitIncome(data)}
          editId={incomeId}
          incomes={incomesOnly}
        />
      </div>
      <div className=" flex items-center justify-between px-8 gap-x-4 mb-4">
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
