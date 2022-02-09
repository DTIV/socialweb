import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/explorebox.css';
import './css/keyframes.css';
import './css/explorer.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import $, { css } from 'jquery';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        project: {
           merge(existing, incoming){
            return incoming
          }
        }
      }
    }
  }
})


const client = new ApolloClient({
  uri: 'https://api.cybertino.io/connect/',
  cache
});
ReactDOM.render(
  
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
          <App />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
