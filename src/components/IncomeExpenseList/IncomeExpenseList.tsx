import { useState } from "react";
import DeleteDialog from "../ui/DeleteDialog";
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
import { MdEdit } from "react-icons/md";
import { paginate } from "../../utils/paginate";
import Paginationnext from "../ui/PaginationPage";
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
  onEdit: (id: string) => void;
}

const IncomeExpenseList = ({ expensesincomes, onDelete, onEdit }: Props) => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const movies = paginate(expensesincomes, currentPage, pageSize);

  return (
    <section className="px-8">
      <Table className="bg-white rounded-md">
        <TableCaption className="flex"></TableCaption>
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
          {movies.length > 0 ? (
            movies.map((el) => (
              <TableRow key={el.id}>
                <TableCell className="font-medium">{el.name}</TableCell>
                <TableCell>{el.amount}</TableCell>
                <TableCell>{el.type}</TableCell>
                <TableCell>{el.date}</TableCell>
                <TableCell>{el.tag}</TableCell>
                <TableCell>
                  <DeleteDialog onDelete={() => onDelete(el.id)} />
                  <button>
                    <MdEdit
                      className="text-blue-400"
                      size={20}
                      onClick={() => onEdit(el.id)}
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
      <Paginationnext
        itemsCount={expensesincomes.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </section>
  );
};

export default IncomeExpenseList;
