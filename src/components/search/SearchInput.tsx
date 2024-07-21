import { IoIosSearch } from "react-icons/io";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  return (
    <div className="w-full">
      <div className="relative ">
        <IoIosSearch className="absolute bottom-3 left-2" />
        <input
          type="search"
          placeholder="Search by Type..."
          className="w-full px-8 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchInput;
