import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface ExpenseIncome {
  id: number;
  name: string;
  amount: number;
  date: string;
  tag: string;
}

interface Props {
  expensesincomes: ExpenseIncome[];
}

const IncomeExpenseList = ({ expensesincomes }: Props) => {
  return (
    <Table>
      <TableCaption>My Transactions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Tag</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expensesincomes.length > 0 ? (
          expensesincomes.map((el) => (
            <TableRow key={el.id}>
              <TableCell className="font-medium">{el.name}</TableCell>
              <TableCell>{el.amount}</TableCell>
              <TableCell>{el.date}</TableCell>
              <TableCell>{el.tag}</TableCell>
              <TableCell>
                <button>Delete</button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="text-center">No Records Found</TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            {expensesincomes
              .reduce((prevVal, currVal) => currVal.amount + prevVal, 0)
              .toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default IncomeExpenseList;
