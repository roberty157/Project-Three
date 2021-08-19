const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }
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
    costOfLiving: Float
    safety: Float
    environmentalQuality: Float
    economy: Float
    image: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
