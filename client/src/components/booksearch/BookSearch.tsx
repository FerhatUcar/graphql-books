import React, { ChangeEvent } from "react";
import { FilterSearch } from "./BookSearch.style";

interface BookSearchType {
  filterBooks: (event: ChangeEvent<HTMLInputElement>) => void;
}

const BookSearch = ({ filterBooks }: BookSearchType): JSX.Element => {
  return (
    <FilterSearch
      type="text"
      placeholder="Search"
      onChange={(e) => filterBooks(e)}
    />
  );
};

export default BookSearch;
