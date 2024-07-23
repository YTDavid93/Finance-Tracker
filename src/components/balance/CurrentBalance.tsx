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
    <div>
      <h1>Current Balance</h1>
      <p>Rs{totalCurrentBalance}</p>
    </div>
  );
};

export default CurrentBalance;
