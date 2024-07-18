import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import React, { ReactNode } from 'react';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000',
  }),
  cache: new InMemoryCache(),
});

interface ApolloProviderWrapperProps {
  children: ReactNode;
}

const ApolloProviderWrapper: React.FC<ApolloProviderWrapperProps> = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloProviderWrapper;
