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
      e.preventDefault();

      props.addBookMutation({
        variables: {
          name: state.name,
          genre: state.genre,
          authorId: state.authorId,
        },
        refetchQueries: [{ query: getBooksQuery }],
      });
    },
    [props, state]
  );

  const addBookName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, name: e.target.value });
    },
    [state, setState]
  );

  const addGenreName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, genre: e.target.value });
    },
    [state, setState]
  );

  const addAuthor = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setState({ ...state, authorId: e.target.value });
    },
    [state, setState]
  );

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => addBookName(e)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => addGenreName(e)} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => addAuthor(e)}>
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
