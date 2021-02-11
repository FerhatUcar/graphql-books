import React, { FC, PropsWithChildren, useCallback, useState } from "react";
import { graphql } from "react-apollo";
import {
  getBooksQuery as booksQuery,
  deleteBookMutation,
} from "../../queries/queries";
import BookDetails from "../bookdetails/BookDetails";
import { flowRight as compose } from "lodash";
import { BookType } from "../../types/types";
import { Button, Book } from "./BookList.style";
import BookSearch from "../booksearch/BookSearch";
// import BookSearch from "../booksearch/BookSearch";

const BookList: FC = ({
  getBooksQuery,
  deleteBookMutation,
}: PropsWithChildren<any>): JSX.Element => {
  const { books, loading } = getBooksQuery;
  const noBooks = books && !books.length;
  const [search, setSearch] = useState("");
  const [change, setChange] = useState(false);
  const [state, setState] = useState<BookType>({
    id: null,
    name: null,
    selected: null,
  });

  const selectBook = useCallback(
    (book: BookType) => {
      setState({ ...state, selected: book.id });
      setChange(true);
    },
    [setState, state, setChange]
  );

  const removeBook = useCallback(
    (book: BookType) => {
      setState({ ...state, selected: null });
      deleteBookMutation({
        variables: { id: book.id },
        refetchQueries: [{ query: booksQuery }],
      });
    },
    [deleteBookMutation, state]
  );

  const filterBookInput = useCallback(
    (e) => {
      setSearch(e.target.value);
      setChange(false);
    },
    [setSearch, setChange]
  );

  const filterBook =
    books &&
    books.filter((book: BookType) => {
      return typeof book.name === "string"
        ? book.name?.toLowerCase().includes(search.toLowerCase())
        : null;
    });

  const activeBook = (id: number | null) => {
    return state.selected === id ? "active" : "";
  };

  const ListOfBooks = (): JSX.Element => {
    return noBooks ? (
      <div className="no-books">No books available</div>
    ) : (
      filterBook.map((book: BookType) => {
        return (
          <div className="flex" key={book.id}>
            <Book
              className={activeBook(book.id)}
              onClick={() => selectBook(book)}
            >
              <span>{book.name}</span>
            </Book>
            <Button onClick={() => removeBook(book)} className="remove-book">
              Delete
            </Button>
          </div>
        );
      })
    );
  };

  return (
    <>
      <BookSearch filterBooks={filterBookInput} />
      <ul id="book-list">
        {loading ? <div>Loading books...</div> : <ListOfBooks />}
      </ul>
      <BookDetails change={change} bookId={state.selected} />
    </>
  );
};

export default compose(
  graphql(booksQuery, { name: "getBooksQuery" }),
  graphql(deleteBookMutation, { name: "deleteBookMutation" })
)(BookList);
