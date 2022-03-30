export const config = {
  graphql: {
    debug: false,
    playground: false,
  },
  elastic: {
    node: process.env.ELASTICSEARCH_NODE,
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD
  }
};
