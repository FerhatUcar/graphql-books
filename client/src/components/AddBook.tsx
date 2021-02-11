import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";
import { AuthorType } from "../types/types";

const AddBook = ({
  getAuthorsQuery,
  addBookMutation,
}: PropsWithChildren<any>): JSX.Element => {
  const [state, setState] = useState({
    name: "",
    genre: "",
    authorId: "",
  });
  const [error, setError] = useState({
    name: false,
    genre: false,
    authorId: false,
  });

  const displayAuthors = () => {
    const { loading, authors } = getAuthorsQuery;

    if (loading) {
      return <option disabled>Loading authors...</option>;
    } else {
      return authors.map((author: AuthorType) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const submitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      const { name, genre, authorId } = state;

      e.preventDefault();

      if (name === "") {
        setError({ ...error, name: true });
      } else if (genre === "") {
        setError({ ...error, genre: true });
      } else if (authorId === "") {
        setError({ ...error, authorId: true });
      } else {
        addBookMutation({
          variables: { name, genre, authorId },
          refetchQueries: [{ query: getBooksQuery }],
        });
      }
    },
    [addBookMutation, state, error]
  );

  const addBookName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, name: e.target.value });
      setError({ ...error, name: false });
    },
    [state, setState, error]
  );

  const addGenreName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, genre: e.target.value });
      setError({ ...error, genre: false });
    },
    [state, setState, error]
  );

  const addAuthor = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setState({ ...state, authorId: e.target.value });
      setError({ ...error, authorId: false });
    },
    [state, setState, error]
  );

  return (
    <form onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input
          className={error.name ? "error" : "input"}
          type="text"
          onChange={(e) => addBookName(e)}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          className={error.genre ? "error" : "input"}
          type="text"
          onChange={(e) => addGenreName(e)}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          className={error.authorId ? "error" : "input"}
          onChange={(e) => addAuthor(e)}
        >
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>Add book</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
