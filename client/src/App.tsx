import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHookProvider } from "@apollo/react-hooks";

// components
import BookList from "./components/BookList";
// import AddBook from './components/AddBook';

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloHookProvider client={client as any}>
        <div id="main">
          <h1>Book app</h1>
          <BookList />
        </div>
      </ApolloHookProvider>
    </ApolloProvider>
  );
}

export default App;
