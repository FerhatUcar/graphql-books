import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// components
import BookList from "./components/booklist/BookList";
import AddBook from "./components/AddBook";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

const App = () => (
  <ApolloProvider client={client}>
    <main id="main">
      <h1>Books</h1>
      <BookList />
      <AddBook />
    </main>
  </ApolloProvider>
);

export default App;
