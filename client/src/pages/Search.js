import React, { useState, useEffect } from 'react';
import { searchCityData, searchBlank } from '../utils/API';
import { useMutation ,useQuery} from '@apollo/client';
import { SAVE_CITY, SAVE_HOME_CITY } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { numbersWithCommas } from '../utils/helpers'
import { Jumbotron, Form} from 'react-bootstrap';
import Auth from '../utils/auth';
import { Bar } from 'react-chartjs-2'

import { Container,Button,Grid } from 'semantic-ui-react';

const Search = () => {
  const {loading, error, data} = useQuery(QUERY_ME,{});
  console.log(error);
  const [searchedCities, setSearchedCities] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const [savedCityIds, setSavedCityIds] = useState([]);

  // set up useEffect hook to save `savedCityIds` list to localStorage on component unmount
  useEffect(() => {
    if (!loading && data?.me?.savedCities) {
      const cityIds = data.me.savedCities.map(({ cityId }) => cityId)
      console.log("saved city ids from db --- ", cityIds)
      setSavedCityIds(cityIds)
    }
  }, [loading]);

  // set mutation for saving City


  const [saveHomeCity, { saveHomeError }] = useMutation(SAVE_HOME_CITY);

  const [saveCity] = useMutation(SAVE_CITY
  );


  // create method to search for city and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      // perform API call to teleport
      const response = await searchCityData(searchInput);
      console.log(response);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // get returned data store to variable to pass into the useState hook
      const cityList = await response.json();
      const cityData = cityList._embedded['city:search-results'];

      // storing the population data as it also lives in an embedded directory
      const pop = cityData[0]._embedded["city:item"].population;
      cityData[0]['population'] = numbersWithCommas(pop);

      // store the category data into an array
      const uaScores = cityData[0]._embedded["city:item"]._embedded["city:urban_area"]._embedded["ua:scores"].categories;
      cityData[0].housing = Math.round(uaScores[0].score_out_of_10);
      cityData[0].costOfLiving = Math.round(uaScores[1].score_out_of_10);
      cityData[0].safety = Math.round(uaScores[7].score_out_of_10);
      cityData[0].healthcare = Math.round(uaScores[8].score_out_of_10);
      cityData[0].education = Math.round(uaScores[9].score_out_of_10);
      cityData[0].environmentalQuality = Math.round(uaScores[10].score_out_of_10);
      cityData[0].economy = Math.round(uaScores[11].score_out_of_10);
      cityData[0].taxation = Math.round(uaScores[12].score_out_of_10);
      cityData[0].cityId = cityData[0]._embedded["city:item"].geoname_id;
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
      cityData[0]['image'] = imageLink;


      const regionName = cityData[0]._embedded["city:item"]._embedded["city:urban_area"].full_name;
      cityData[0]['region'] = regionName;

      // Update the hook and empty the search field
      setSearchedCities(cityData);
      // setSearchedChart(cityData);
      setSearchInput('');


    } catch (err) {
      console.error(err);
    }
  };
  const homeCityEqualsCurrent = (homeCity, city) => {
    //checks if current search result is saved as the users home city
    if (homeCity === null) {
      return false;
    }
    else {
      //console.log('home city', homeCity);
      //console.log('city',city);
      if (homeCity.name === city.matching_full_name) {
        return true;
      } else {
        return false;
      }
    }
  }
  const handleSaveHomeCity = async (cityId) => {
    const cityToSave = searchedCities.find((city) => city.cityId === cityId);
    //console.log('setting as home city', cityToSave);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const cityData = {
        cityId: cityToSave._embedded["city:item"].geoname_id.toString(),
        name: cityToSave.matching_full_name,
        healthcare: cityToSave.healthcare,
        taxation: cityToSave.taxation,
        education: cityToSave.education,
        costOfLiving: cityToSave.costOfLiving,
        housing: cityToSave.housing,
        safety: cityToSave.safety,
        environmentalQuality: cityToSave.environmentalQuality,
        economy: cityToSave.economy,
        image: cityToSave.image,
        region: cityToSave.region,
        population: parseInt(cityToSave.population.replace(/\,/g, ''), 10)
      }
      console.log(cityData);
      const response = await saveHomeCity({
        variables: { homeCity: cityData },
      });
      console.log('save home error', saveHomeError);
      if (!response.data) {
        throw new Error('something went wrong!');
      }
      const btn = document.getElementById('saveHomeCityBtn')
      btn.innerHTML = 'this city is currently your home city';
      btn.setAttribute('disabled', true);
    } catch (err) {
      console.error(err);
    }
  }

  const handleSaveCity = async (cityId) => {

    // find the city in `searchedcities` state by the matching id
    const cityToSave = searchedCities.find((city) => city.cityId === cityId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // save city
    try {
      console.log(cityToSave);
      const cityData = {
        cityId: cityToSave._embedded["city:item"].geoname_id.toString(),
        name: cityToSave.matching_full_name,
        healthcare: cityToSave.healthcare,
        taxation: cityToSave.taxation,
        education: cityToSave.education,
        costOfLiving: cityToSave.costOfLiving,
        housing: cityToSave.housing,
        safety: cityToSave.safety,
        environmentalQuality: cityToSave.environmentalQuality,
        economy: cityToSave.economy,
        image: cityToSave.image,
        region: cityToSave.region,

        //change population(which has commas) into an integer
        population: parseInt(cityToSave.population.replace(/,/g,''),10)






      }

      const response = await saveCity({
        variables: { city: cityData },
      });
      console.log(saveCity);


      if (!response.data) {
        throw new Error('something went wrong!');
      }

      setSavedCityIds([...savedCityIds, cityData.cityId]);
      const btn = document.getElementById('saveCityBtn')
      btn.innerHTML = 'This city has already been saved!';
      btn.setAttribute('disabled', true);
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <>

      <Jumbotron fluid className='text-light jumboGrad '>

        <Container style={{ width: '70rem' }} className='p-5 jumbo'>

          <Form className='p-5' onSubmit={handleFormSubmit}>
            <h1 style={{ textAlign: 'center' }}>Search for your future home city</h1>

            <Form.Row>
              <Form.Label>City, State </Form.Label>
              <Form.Control
                size="lg"
                name='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type='text'
                placeholder='Example: New York, NY'
              />
              <Button primary className="mt-10" type='submit'>
                Search
              </Button>
            </Form.Row></Form>
        </Container>

      </Jumbotron>

      <Container className='p-5'>
        {searchedCities.map(city => {
          console.log(city);
          return <div key={city.matching_full_name}>
            <Grid stackable columns={2}>
              <Grid.Column>
                <div >
                  <h2>
                    City: {city.matching_full_name}
                  </h2>
                  <h3>
                    <span className="bold">Population: </span><span>{city.population}</span>
                  </h3>
                  <div>
                    <span className="bold">Region: </span><span>{city.region}</span>
                  </div>
                  <div>
                    <span className="bold">Healthcare: </span><span>{city.healthcare} of 10</span>
                  </div>
                  <div>
                    <span className="bold">Taxation: </span><span>{city.taxation} of 10</span>
                  </div>
                  <div>
                    <span className="bold">Education: </span><span>{city.education} of 10</span>
                  </div>
                  <div>
                    <span className="bold">Housing: </span><span>{city.housing} of 10</span>
                  </div>
                  <div>
                    <span className="bold">Cost of Living: </span><span>{city.costOfLiving} of 10</span>
                  </div>
                  <div>
                    <span className="bold">Safety: </span><span>{city.safety} of 10</span>
                  </div>
                  <div>
                    <span className="bold">Environmental Quality: </span><span>{city.environmentalQuality} of 10</span>
                  </div>
                  <div>
                    <span className="bold">Economy: </span><span>{city.economy} of 10</span>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column className="image-cropper">
                <img src={city.image} className="city-pic" alt="img not found"></img>



              </Grid.Column>
            </Grid>


            <Container className='p-5'>
              <div>
                <Bar
                  data={{
                    labels: ['Healthcare', 'Taxation', 'Education', 'Housing', 'Living', 'Safety', 'Environment', 'Economy'],
                    datasets: [
                      {
                        label: 'Score',
                        data: [`${city.healthcare}`, `${city.taxation}`, `${city.education}`, `${city.housing}`, `${city.costOfLiving}`, `${city.safety}`, `${city.environmentalQuality}`, `${city.economy}`],

                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                      }]

                  }}
                  height={400}
                  width={500}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        suggestedMin: 0,
                        suggestedMax: 10
                      }
                    }
                  }}
                />
              </div>
              {
                Auth.loggedIn() &&
                <Button primary
                  disabled={savedCityIds.includes(city.cityId + '')}
                  className='btn-block btn-info'
                  id="saveCityBtn"
                  onClick={() => handleSaveCity(city.cityId)}>
                  {savedCityIds.includes(city.cityId + '')
                    ? 'This city has already been saved!'
                    : 'Save this City!'}
                </Button>

              }

              {
                (Auth.loggedIn() && !loading && error === undefined) &&
                <Button disabled={homeCityEqualsCurrent(data.me.homeCity, city)}
                  id="saveHomeCityBtn"
                  primary onClick={() => handleSaveHomeCity(city.cityId)}>
                  {homeCityEqualsCurrent(data.me.homeCity, city)
                    ? 'this city is currently your home city'
                    : 'Set this city as home'
                  }

                </Button>

              }


            </Container>
          </div>
        })}

      </Container>


    </>
  );
};

export default Search;