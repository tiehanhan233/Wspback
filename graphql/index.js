const { ApolloServer, gql } = require('apollo-server-koa');
const typeDefs = require('./schema');
const resolvers = require('./root');
const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;
