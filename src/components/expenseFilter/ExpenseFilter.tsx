import filterCategory from "./filterCategory";

interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <select onChange={(e) => onSelectCategory(e.target.value)}>
      <option value="">All</option>
      {filterCategory.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default ExpenseFilter;
