import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ApolloProvider } from "@apollo/client/react";
import client from "./apolloClient";
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import {TrainerProvider} from './context/TrainerContext.jsx'
createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <TrainerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TrainerProvider>
  </ApolloProvider>

)
