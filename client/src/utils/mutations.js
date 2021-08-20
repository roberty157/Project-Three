import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER =gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
              _id
              username
            }
        }
    }
`


export const SAVE_CITY=gql`
    mutation saveCity($cityInput: cityInput!) {
        saveCity(input: $cityInput) {
            username
            savedCities{
                name
            }
            } 
    }
  
`

export const SAVE_HOME_CITY=gql`
    mutation saveHomeCity($cityInput: cityInput!) {
        saveCity(input: $cityInput) {
            username
            savedCities{
                name
            }
            } 
    }
  
`
export const REMOVE_CITY=gql`
    mutation removeCity($cityName:String!){
      removeCity(cityName:$cityName){
        username
        savedCities{
            name

          
        }
      }
    }
`

