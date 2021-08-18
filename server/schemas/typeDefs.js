const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedCities: [City]
  }
  type City{
    _id:ID!
    name:String!
    healthcare: Float
    taxation: Float
    education: Float
    housing: Float
    cost-of-living: Float
    safety: Float
    environmental quality: Float
    economy: Float

  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User

  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
