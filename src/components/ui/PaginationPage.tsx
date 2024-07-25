import _ from "lodash";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "./pagination";
import './paginationStyles.css'

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
          <PaginationItem className={currentPage === 1 ? "disabled" : ""}>
            <PaginationPrevious
              href="#"
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink href="#" onClick={() => onPageChange(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem
            className={currentPage === pagesCount ? "disabled" : ""}
          >
            <PaginationNext
              href="#"
              onClick={() =>
                currentPage < pagesCount && onPageChange(currentPage + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
  );
};

export default PaginationPage;
