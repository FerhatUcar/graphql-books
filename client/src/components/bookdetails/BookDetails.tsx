import React, { createRef, LegacyRef, useEffect } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../../queries/queries";
import { BookDetailsType } from "../../types/types";
import { BookDetailsBox, Box } from "./BookDetails.style";

const BookDetails = ({ data, change }: BookDetailsType): JSX.Element => {
  const ref: LegacyRef<HTMLDivElement> = createRef();
  const { book } = data;

  useEffect(() => {
    const div = ref.current;

    if (change) {
      div && div.classList.remove("fade");

      setTimeout(() => {
        div && div.classList.add("fade");
      }, 250);
    }
  }, [ref, change]);

  return (
    <BookDetailsBox className="fadeRight">
      {book ? (
        <Box id={book.name} ref={ref}>
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
        </Box>
      ) : (
        <div>No book selected...</div>
      )}
    </BookDetailsBox>
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
