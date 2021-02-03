import React, {
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useState,
} from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

interface BookType {
  id?: number | null;
  name?: ReactNode | undefined;
  selected: number | undefined | null;
}

const BookList: FC = (props: PropsWithChildren<any>): JSX.Element => {
  const { data } = props;
  const [state, setState] = useState<BookType>({
    selected: null,
  });

  const selectBook = useCallback(
    (book: BookType) => {
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
          data.books.map((book: BookType) => {
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
