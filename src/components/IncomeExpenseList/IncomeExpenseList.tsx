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

export interface ExpenseIncome {
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
    <section className="px-8">
      <Table className="bg-white rounded-md">
        {/* <TableCaption>My Transactions</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
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
              <TableCell colSpan={5} className="text-center py-4">
                No Records Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>
              Rs
              {expensesincomes
                .reduce((prevVal, currVal) => currVal.amount + prevVal, 0)
                .toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
};

export default IncomeExpenseList;
