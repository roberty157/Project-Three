import { searchCityData, searchBlank } from '../utils/API';
import { numbersWithCommas } from '../utils/helpers'
import React, { useState } from 'react';
import { Form, Button,} from 'react-bootstrap';

const Search = () => {
  const [searchedCities, setSearchedCities] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      // perform API call to teleport
      const response = await searchCityData(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      // get returned data store to variable to pass into the useState hook
       const cityList = await response.json();
       const cityData = cityList._embedded['city:search-results'];

       // storing the population data as it also lives in an embedded directory
      const pop = cityData[0]._embedded["city:item"].population;
      cityData[0].['population'] = numbersWithCommas(pop);

      // store the category data into an array
      const uaScores = cityData[0]._embedded["city:item"]._embedded["city:urban_area"]._embedded["ua:scores"].categories;
      cityData[0].['uaScores'] = uaScores;
      console.log('urban area scores:', uaScores);
      // store the link for the image in a variable 
      const regionLink = cityData[0]._embedded["city:item"]._embedded["city:urban_area"]._links["ua:images"].href;
      // API call to retrieve the image link
      const getImageResponse = await searchBlank(regionLink);
      if (!getImageResponse.ok) {
          throw new Error('something went wrong!');
      }
      const regionImage = await getImageResponse.json();
      // get the image link and store the string value in the cityData object 
      const imageLink = regionImage.photos[0].image.web;
      cityData[0].['image'] = imageLink;

      const regionName = cityData[0]._embedded["city:item"]._embedded["city:urban_area"].full_name;
      cityData[0].['region'] = regionName;

      // Update the hook and empty the search field
      setSearchedCities(cityData);
      setSearchInput('');
        
    } catch (err) {
        console.error(err);
    }
  };

  return (
      <>
        <h1>Search for your future home city</h1>
        <Form onSubmit={handleFormSubmit}>
            <Form.Row>
                <Form.Label>City, State </Form.Label>
                <Form.Control
                name='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type='text'
                placeholder='Example: New York, NY'
                />
                <Button type='submit'>
                Search
                </Button>
        </Form.Row></Form>
        <div>
          {searchedCities.map(city => <div key={city.matching_full_name}>
          <div>
            <span className="bold">Location: </span>{city.matching_full_name}
            </div>
          <div>
           <span className="bold">Population: </span>{city.population}
           </div>
           <div>
           <span className="bold">Region: </span>{city.region}
           <img alt="city" src={city.image}></img>
           </div>
          </div>)}
          
        </div>
        </>
      );
};

export default Search;