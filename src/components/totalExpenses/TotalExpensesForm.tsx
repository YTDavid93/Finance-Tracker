import { useState } from "react";
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
import filterCategory from "../expenseFilter/filterCategory";

interface Props {
  onSubmit: (data: FormDataExpense) => void;
}

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Please input the name of the transaction!" }),
  amount: z
    .number({ invalid_type_error: "Please input the expense amount!" })
    .min(0.01)
    .max(1000000),
  type: z.enum(filterCategory, {
    errorMap: () => ({ message: "Please select the type!" }),
  }),
  date: z.string().min(1, { message: "Please select the expense date!" }),
  tag: z.enum(expenseCategory, {
    errorMap: () => ({ message: "Please select the tag!" }),
  }),
});

export type FormDataExpense = z.infer<typeof schema>;

const TotalExpensesForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataExpense>({ resolver: zodResolver(schema) });

  const [open, setOpen] = useState(false);

  return (
    <section className="p-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Add Expenses
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
          <DialogTitle>Add Expenses</DialogTitle>
          <form
            method="post"
            className="p-3"
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
              reset();
              setOpen(false);
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
                htmlFor="type"
                className="block text-base font-medium text-gray-700"
              >
                Type
              </label>
              <select
                {...register("type")}
                id="type"
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value=""></option>
                {filterCategory.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.type && (
                <ErrorMessage>{errors.type.message}</ErrorMessage>
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
              Add Expenses
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TotalExpensesForm;
