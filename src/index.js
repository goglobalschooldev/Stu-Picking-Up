import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split, HttpLink
} from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { cache } from './function/fn';
import { IS_LOGGED_IN } from './schema/login';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPIONT
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPIONT_SUBSCRIPTION,
  options: {
    reconnect: true
  },
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: cache
});

cache.writeQuery({
    
  query: IS_LOGGED_IN,
  data: {
      isLoggedIn: localStorage.getItem("access_token"),
  },
  
});

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
