import React, { FC, useCallback, useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList: FC = (props: any): JSX.Element => {
  const { data } = props;
  const [state, setState] = useState({
    selected: null,
  });

  const selectBook = useCallback(
    (book) => {
      setState({ selected: book.id });
    },
    [setState]
  );

  return (
    <>
      <ul id="book-list">
        {data.loading ? (
          <div>Loading books...</div>
        ) : (
          data.books.map((book: any) => {
            return (
              <li key={book.id} onClick={() => selectBook(book)}>
                {book.name}
              </li>
            );
          })
        )}
      </ul>
      <BookDetails bookId={state.selected} />
    </>
  );
};

export default graphql(getBooksQuery)(BookList);
