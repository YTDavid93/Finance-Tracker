import { ExpenseIncome } from "../IncomeExpenseList/IncomeExpenseList";

interface Props {
  incomes: ExpenseIncome[];
  expenses: ExpenseIncome[];
}

const CurrentBalance = ({ incomes, expenses }: Props) => {
  const totalIncome = incomes.reduce(
    (prevVal, currVal) => currVal.amount + prevVal,
    0
  );

  const totalExpense = expenses.reduce(
    (prevVal, currVal) => currVal.amount + prevVal,
    0
  );

  const totalCurrentBalance = totalIncome - totalExpense;

  return (
    <div className="bg-white rounded-md shadow-lg p-6 min-w-[400px] flex-1 flex flex-col gap-4">
      <h1 className="font-medium text-lg">Current Balance</h1>
      <p>Rs {totalCurrentBalance.toFixed(2)}</p>
    </div>
  );
};

export default CurrentBalance;
