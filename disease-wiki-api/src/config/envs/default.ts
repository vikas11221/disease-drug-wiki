export const config = {
  graphql: {
    debug: true,
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    autoSchemaFile: true,
    autoTransformHttpErrors: true
  },
  elastic: {
    node: "",
    username: "",
    password: ""
  }
};
