module.exports = {
  client: {
    service: {
      name: 'books store',
      // URL to the GraphQL API
      url: 'https://welcome-pony-27.hasura.app/v1/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js'],
  },
};
