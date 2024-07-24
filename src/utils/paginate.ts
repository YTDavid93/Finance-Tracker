import _ from "lodash";
import { ExpenseIncome } from "../components/IncomeExpenseList/IncomeExpenseList";


export const paginate = (items: ExpenseIncome[], pageNumber: number, pageSize: number) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
};
