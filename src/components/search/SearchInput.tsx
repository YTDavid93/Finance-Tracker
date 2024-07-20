import { useRef } from "react";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        if (ref.current) onSearch(ref.current.value) 
    }}>
      <div>
        <input ref={ref} type="search" placeholder="Search by Type..." />
      </div>

    </form>
  );
};

export default SearchInput;
