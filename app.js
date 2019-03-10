const Koa = require('koa');
var graphql = require('./graphql');
require('./mongodb');

const app = new Koa();
graphql.applyMiddleware({ app });
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
