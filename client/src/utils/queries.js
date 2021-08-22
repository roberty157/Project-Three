import { gql } from '@apollo/client';

// define query
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      cityCount
      savedCities {
        _id
        cityId
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