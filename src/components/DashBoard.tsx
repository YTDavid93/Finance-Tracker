import TotalExpensesForm from "./totalExpenses/TotalExpensesForm";
import TotalIncomeForm from "./totalIncome/TotalIncomeForm";

const Dashboard = () => {
  return (
    <>
      <TotalIncomeForm onSubmit={(data) => console.log(data)} />
      <TotalExpensesForm />
    </>
  );
};

export default Dashboard;
