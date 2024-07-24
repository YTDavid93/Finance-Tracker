import _ from "lodash";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "./pagination";

interface Props {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationPage = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
}: Props) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null; // Don't show pagination if only one page
  const pages = _.range(1, pagesCount + 1);

  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => onPageChange(currentPage - 1)}
          />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href="#" onClick={() => onPageChange(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationPage;
