import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import ErrorMessage from "../../utils/ErrorMessage";
import expenseCategory from "./expenseCategory";
import { useCallback, useEffect } from "react";
import { fetchDatForEditId } from "../../Firebase/fireStore";
import { ExpenseIncome } from "../IncomeExpenseList/IncomeExpenseList";

interface Props {
  onSubmit: (data: FormDataExpense) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editId: string | null;
  expenses: ExpenseIncome[];
}

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Please input the name of the transaction!" }),
  amount: z
    .number({ invalid_type_error: "Please input the expense amount!" })
    .min(0.01)
    .max(1000000),
  date: z.string().min(1, { message: "Please select the expense date!" }),
  tag: z.enum(expenseCategory, {
    errorMap: () => ({ message: "Please select the tag!" }),
  }),
});

export type FormDataExpense = z.infer<typeof schema>;

const TotalExpensesForm = ({
  onSubmit,
  open,
  onOpenChange,
  editId,
  expenses,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormDataExpense>({ resolver: zodResolver(schema) });

  const totalExpense = expenses
    .reduce((prevVal, currVal) => currVal.amount + prevVal, 0)
    .toFixed(2);

  const fetchData = useCallback(
    async (editId: string) => {
      try {
        const data = await fetchDatForEditId(editId);
        setValue("name", data.name);
        setValue("date", data.date);
        setValue("amount", data.amount);
        setValue("tag", data.tag);
      } catch (err) {
        console.error("Error fetching document:", err);
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (editId) {
      fetchData(editId);
    } else {
      reset();
    }
  }, [editId, fetchData, reset]);

  return (
    <section className="bg-white rounded-md shadow-lg p-6 flex-1 min-w-[400px] flex flex-col gap-4">
      <h1 className=" font-medium text-lg">Total Expenses</h1>
      <p>Rs {totalExpense}</p>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <button className="bg-blue-500 rounded-lg text-white text-base w-full px-4 py-2 hover:bg-white hover:text-customBlue hover:border hover:border-customBlue transition-all duration-200 ease-in">
            Add Expenses
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
          <DialogTitle>Expense Form</DialogTitle>
          <form
            method="post"
            className="p-3"
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
              reset();
            })}
          >
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block text-base font-medium text-gray-700"
              >
                Name
                <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="amount"
                className="block text-base font-medium text-gray-700"
              >
                Amount
                <span className="text-red-500">*</span>
              </label>
              <input
                {...register("amount", { valueAsNumber: true })}
                type="number"
                id="amount"
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.amount && (
                <ErrorMessage>{errors.amount.message}</ErrorMessage>
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="date"
                className="block text-base font-medium text-gray-700"
              >
                Date
              </label>
              <input
                {...register("date")}
                type="date"
                id="date"
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.date && (
                <ErrorMessage>{errors.date.message}</ErrorMessage>
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="tag"
                className="block text-base font-medium text-gray-700"
              >
                Tag
              </label>
              <select
                {...register("tag")}
                id="tag"
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value=""></option>
                {expenseCategory.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.tag && <ErrorMessage>{errors.tag.message}</ErrorMessage>}
            </div>
            <button className="bg-blue-500 rounded-lg text-white text-base w-full px-4 py-2 hover:bg-white hover:text-customBlue hover:border hover:border-customBlue transition-all duration-200 ease-in mt-3">
              {editId ? "Update Expenses" : "Add Expenses"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TotalExpensesForm;
