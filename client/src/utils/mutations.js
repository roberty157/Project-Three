import { gql } from '@apollo/client';

// define mutaion for login
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;






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


// define mutation for adding a user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// define mutation for saving a city
export const SAVE_CITY = gql`
  mutation saveCity($cityToSave: CityInput) {
    saveCity(cityToSave: $cityToSave) {
      _id
      username
      cityCount
      savedCities {
        name
        image
        healthcare
        taxation
        education
        housing
        costOfLiving
        safety
        environmentalQuality
        economy
        population
        region
      }
    }
  }
`;

// define mutation for removing a city
export const REMOVE_CITY = gql`
  mutation removeCity($cityId: ID!) {
    removeCity(cityId: $cityId) {
       _id
      username
      cityCount
      savedCities {
        name
        image
        healthcare
        taxation
        education
        housing
        costOfLiving
        safety
        environmentalQuality
        economy
        population
        region
      }
    }
  }
`;
