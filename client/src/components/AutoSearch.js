import React, { useState, useEffect } from 'react';
import { searchCityData, searchBlank } from '../utils/API';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_CITY, SAVE_HOME_CITY } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { numbersWithCommas } from '../utils/helpers'
import { saveCityIds, getSavedCityIds } from '../utils/localStorage';
import { Jumbotron,/* Container, */Form, /*Button*/ } from 'react-bootstrap';
import Auth from '../utils/auth';
import { Bar } from 'react-chartjs-2'

import { Container, Button, Grid,/*Image*/ } from 'semantic-ui-react';
//import './App.css';
const AutoSearch = () => {
    const [searchedCities, setSearchedCities] = useState([]);
    const [searchInput, setSearchInput] = useState('');

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

            setSearchInput('');


        } catch (err) {
            console.error(err);
        }
    };

    const SuggestionsList = props => {
        const {
            suggestions,
            searchInput,
            onSelectSuggestion,
            displaySuggestions,
            selectedSuggestion
        } = props;

        if (searchInput && displaySuggestions) {
            if (suggestions.length > 0) {
                return (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => {
                            const isSelected = selectedSuggestion === index;
                            const classname = `suggestion ${isSelected ? "selected" : ""}`;
                            return (
                                <li
                                    key={index}
                                    className={classname}
                                    onClick={() => onSelectSuggestion(index)}
                                >
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                return <div>No suggestions available...</div>;
            }
        }
        return <></>;
    };


    const [filteredSuggestions, setFilteredSuggestions] = React.useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = React.useState(0);
    const [displaySuggestions, setDisplaySuggestions] = React.useState(false);


    const suggestions = [
        "Los Angeles, CA",
        "Austin, TX",
        "New York City, NY",
        "Des Moines, IA",
        "Seattle, WA",
        "Phoenix, AZ",
        "Boulder, CO"
    ];

    const onChange = event => {
        const value = event.target.value;
        setSearchInput(value);

        const filteredSuggestions = suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredSuggestions(filteredSuggestions);
        setDisplaySuggestions(true);
    };

    const onSelectSuggestion = index => {
        setSelectedSuggestion(index);
        setSearchInput(filteredSuggestions[index]);
        setFilteredSuggestions([]);
        setDisplaySuggestions(false);
    };



    return (
        <>

            <Jumbotron fluid className='text-light jumboGrad '>
                {/* <AutoSearch /> */}

                <Container style={{ width: '70rem' }} className='p-5 jumbo'>
                    <Container className="autoComplete">
                        <h1>React Autocomplete</h1>
                        <Form className='p-5' onSubmit={handleFormSubmit}>
        <Form.Control

            size="lg"
            className="user-input form-control-large"
            type="text"
            onChange={onChange}
            value={searchInput}
            placeholder='Input City Here'
        />
        <SuggestionsList
            searchInput={searchInput}
            selectedSuggestion={selectedSuggestion}
            onSelectSuggestion={onSelectSuggestion}
            displaySuggestions={displaySuggestions}
            suggestions={filteredSuggestions}
        />
                            <Button primary className="mt-10" type='submit'>
                                Search
                            </Button>
                        </Form>
                    </Container>

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




                        </Container>
                    </div>
                })}

            </Container>


        </>
    );

}

export default AutoSearch;





