import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ApolloProvider } from "@apollo/client/react";
import client from "./apolloClient";
import {BrowserRouter} from 'react-router-dom'
import './index.css'
createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>

)
