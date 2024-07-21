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
import { MdOutlineDelete } from "react-icons/md";

export interface ExpenseIncome {
  id: string;
  name: string;
  amount: number;
  type: string;
  date: string;
  tag: string;
}

interface Props {
  expensesincomes: ExpenseIncome[];
  onDelete: (id: string) => void;
}

const IncomeExpenseList = ({ expensesincomes, onDelete }: Props) => {
  return (
    <section className="px-8">
      <Table className="bg-white rounded-md">
        {/* <TableCaption>My Transactions</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
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
                <TableCell>{el.type}</TableCell>
                <TableCell>{el.date}</TableCell>
                <TableCell>{el.tag}</TableCell>
                <TableCell>
                  <button>
                    <MdOutlineDelete
                      className="text-red-500"
                      size={20}
                      onClick={() => onDelete(el.id)}
                    />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
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
