const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input cityInput{
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
  }
  type City{
    _id:ID
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
    population: String
    region: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me:User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveHomeCity(input:cityInput):User

    saveCity(input:cityInput):User
    removeCity(cityName:String!):User
  }
`;

module.exports = typeDefs;
/*
mutation loginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
     user{
      _id
      email
    }
    token
  } 
}

{
  "email":"roberty@gmail.com",
  "password":"password10"
}
*/
/*
mutation addUserMutation($username:String!,$email: String!, $password: String!) {
    addUser(username:$username,email: $email, password: $password) {
       	user{
          _id
          email
        }
        token
      } 
    }


{
  "username": "roberty",
      "email":"roberty@gmail.com",
  	"password":"password10"
}
*/
