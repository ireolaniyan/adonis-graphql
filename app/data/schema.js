'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

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

  type Query {
    allUsers: [User]
    fetchUser(id: Int!): User
    allPosts: [Post]
    fetchPost(id: Int!): Post
  }
  
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String
    addPost(title: String!, content: String!): Post
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })