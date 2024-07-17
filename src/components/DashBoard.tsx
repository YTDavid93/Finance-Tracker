import TotalIncomeForm from "./totalIncome/TotalIncomeForm";

const Dashboard = () => {
  return (
    <>
      <TotalIncomeForm onSubmit={(data) => console.log(data)} />
    </>
  );
};

export default Dashboard;
