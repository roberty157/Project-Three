const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input cityInput{
    name: String
    healthcare: Float
    taxation: Float
    education: Float
    housing: Float
    costOfLiving: Float
    safety: Float
    environmentalQuality: Float
    economy: Float
    image: String
    cityId: String
    region: String
    population: Float
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    homeCity: City
    savedCities: [City]
    cityCount: Int
  }
  type City{
     _id: ID
    cityId: String
    name: String
    healthcare: Float
    taxation: Float
    education: Float
    housing: Float
    costOfLiving: Float
    safety: Float
    environmentalQuality: Float
    economy: Float
    image: String
    population: Float
    region: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveHomeCity(input:cityInput):User
    saveCity(city:cityInput):User
    removeCity(cityId:ID!):User
  }
`;

module.exports = typeDefs;