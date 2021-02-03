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
  const [nameError, setNameError] = useState(false);
  const [genreError, setGenreError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

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

      if (name === "") setNameError(true);
      if (genre === "") setGenreError(true);
      if (authorId === "") {
        setAuthorError(true);
        return;
      }

      props.addBookMutation({
        variables: { name, genre, authorId },
        refetchQueries: [{ query: getBooksQuery }],
      });
    },
    [props, state]
  );

  const addBookName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, name: e.target.value });
      setNameError(false);
    },
    [state, setState]
  );

  const addGenreName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, genre: e.target.value });
      setGenreError(false);
    },
    [state, setState]
  );

  const addAuthor = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setState({ ...state, authorId: e.target.value });
      setAuthorError(false);
    },
    [state, setState]
  );

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input
          className={nameError ? "error" : "input"}
          type="text"
          onChange={(e) => addBookName(e)}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          className={genreError ? "error" : "input"}
          type="text"
          onChange={(e) => addGenreName(e)}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          className={authorError ? "error" : "input"}
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
