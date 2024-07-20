import { useRef } from "react";
import { IoIosSearch } from "react-icons/io";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
      className="w-full"
    >
      <div className="relative ">
        <IoIosSearch className="absolute bottom-3 left-2" />
        <input
          ref={ref}
          type="search"
          placeholder="Search by Type..."
          className="w-full px-8 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
    </form>
  );
};

export default SearchInput;
