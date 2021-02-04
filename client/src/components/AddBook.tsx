import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const AddBook = (props: any): JSX.Element => {
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
    const data = props.getAuthorsQuery;

    if (data.loading) {
      return <option disabled>Loading authors...</option>;
    } else {
      return data.authors.map((author: any) => {
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
        props.addBookMutation({
          variables: { name, genre, authorId },
          refetchQueries: [{ query: getBooksQuery }],
        });
      }
    },
    [props, state, error]
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
    <form id="add-book" onSubmit={submitForm}>
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
      <button>+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
