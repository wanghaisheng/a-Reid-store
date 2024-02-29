import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback='...loading'>
            <App />
          </Suspense>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
