'use strict'

const { makeExecutableSchema } = require('graphql-tools')

// Defining the Schema using GraphQL SDL
const typeDefs = `
  type User {
    id: Int!
    email: String!
    username: String!
    posts: [Post]!
  }
  
  type Post {
    id: Int!
    title: String!
    content: String!
    slug: String!
    user: User!
  }
`