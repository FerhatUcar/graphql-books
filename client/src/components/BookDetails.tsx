import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

const BookDetails = (props: any): JSX.Element => {
  const { book } = props.data;

  return (
    <div id="book-details">
      {book ? (
        <div>
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
