'use strict'

const User = use('App/Models/User')
const Post = use('App/Models/Post')
const slugify = require('slugify')

// The sole purpose of a resolver function is to fetch the data for its field.
const resolvers = {
  Query: {
    // Fetch all users
    async allUsers() {
      const users = await User.all()
      return users.toJSON()
    },

    // Get a particular user
    async fetchUser(_, { id }) {
      const user = await User.find(id)
      return user.toJSON()
    },

    // Get all Posts
    async allPosts() {
      const posts = await Post.all()
      return posts.toJSON()
    },

    // Get a particular post
    async fetchPost(_, { id }) {
      const post = await Post.find(id)
      return post.toJSON()
    }
  },

  Mutation: {
    async login(_, { email, password }, { auth }) {
      const { token } = auth.attempt(email, password)
      return token
    },

    // Create a new user
    async createUser(_, { username, email, password }) {
      return await User.create({ username, email, password })
    },

    async addPost(_, { title, content }, { auth }) {
      try {
        // Check if user is logged in
        await auth.check()

        // Get the authenticated user
        const user = await auth.getUser()

        // Add a new post
        await Post.create({
          user_id: user.id,
          title,
          slug: slugify(title, { lower: true }),
          content
        })

      } catch (error) {
        throw new Error('Missing or invalid jwt token')
      }
    } 
  }
}