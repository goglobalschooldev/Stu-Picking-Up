import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split, HttpLink,
  ApolloLink
} from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { cache } from './function/fn';
import { IS_LOGGED_IN } from './schema/login';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPIONT
});

const logoutLink = onError((networkError) => {
  if(networkError?.response?.errors[0]?.message==='jwt expired'){
    alert("token expired")
    localStorage.clear()
    // window.location.reload()
    cache.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn:null,
      },
    });
  }
})

const upLoadLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPIONT,
})

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
  upLoadLink
);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('access_token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link:ApolloLink.from([logoutLink,authLink,splitLink]),
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
