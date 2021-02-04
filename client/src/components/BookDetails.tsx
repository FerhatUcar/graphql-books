import React, { createRef, LegacyRef, useEffect } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

interface IBookDetails {
  data: {
    book: {
      name: string;
      genre: string;
      author: {
        name: string;
        books: string[];
      };
    };
  };
  change: boolean;
}

const BookDetails = ({ data, change }: IBookDetails): JSX.Element => {
  const ref: LegacyRef<HTMLDivElement> = createRef();
  const { book } = data;

  useEffect(() => {
    const div = ref.current;
    div && div.classList.remove("fade");

    if (change) {
      setTimeout(() => {
        div && div.classList.add("fade");
      }, 250);
    }
  }, [ref, change]);

  return (
    <div id="book-details" className="fadeRight">
      {book ? (
        <div className="box" id={book.name} ref={ref}>
          <h2>{book.name}</h2>
          <p>
            Genre: {book.genre} | Author: {book.author.name}
          </p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map((item: any) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      ) : (
        <div>No book selected...</div>
      )}
    </div>
  );
};

export default graphql(getBookQuery, {
  options: ({ bookId }: any) => {
    return {
      variables: {
        id: bookId,
      },
    };
  },
})(BookDetails);
