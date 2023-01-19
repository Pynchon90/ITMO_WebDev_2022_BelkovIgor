import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://welcome-pony-27.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': '2ER7DPVz2aJuWuGDgztj3tH8565Hvxo7sveRYAzWKifMdGOsLljGHRflBvZeHwCQ',
  },
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default apolloClient;
