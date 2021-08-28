import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { numbersWithCommas } from '../utils/helpers'

const CityTable = () => {

    const [cityValue, setCityValue] = useState([]);

    const handleChange = (e, { value }) => {
        setCityValue(value);
    }

    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || [];
    // if data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (

        <Container>

            <h3>
                {userData.savedCities?.length > 1
                    ? `Select 2 cities to compare. You have ${userData.savedCities.length} ${userData.savedCities.length === 1 ? 'city' : 'cities'} saved.`
                    : 'You need at least 2 saved cities to compare. Search for more cities'}
            </h3>

            <Dropdown className="mb-10" placeholder='Saved City' onChange={handleChange} fluid multiple selection options={
                userData.savedCities?.map((city) => {
                    return {
                        key: city._id,
                        value: city._id,
                        text: city.name,
                        disabled: cityValue.length > 1 ? true : false
                    }
                })
            } />

            {cityValue?.map((cityInfo, index) => {
                if (cityValue.length === 1) {
                    const city1 = getCityById(cityValue[0]);

                    city1.population = numbersWithCommas(city1[0].population);
                    city1.healthcare = Math.round(city1[0].healthcare);
                    city1.taxation = Math.round(city1[0].taxation);
                    city1.education = Math.round(city1[0].education);
                    city1.housing = Math.round(city1[0].housing);
                    city1.costOfLiving = Math.round(city1[0].costOfLiving);
                    city1.safety = Math.round(city1[0].safety);
                    city1.environmentalQuality = Math.round(city1[0].environmentalQuality);
                    city1.economy = Math.round(city1[0].economy);

                    return (
                        <Table responsive key={city1[0]._id} striped bordered hover>
                            <thead>
                                <tr>
                                    <th>City</th>
                                    <th>{city1[0].name}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Population</td>
                                    <td>{city1.population}</td>
                                </tr>
                                <tr>
                                    <td>Healthcare</td>
                                    <td>{city1.healthcare}</td>
                                </tr>
                                <tr>
                                    <td>Taxation</td>
                                    <td>{city1.taxation}</td>
                                </tr>
                                <tr>
                                    <td>Education</td>
                                    <td>{city1.education}</td>
                                </tr>
                                <tr>
                                    <td>Housing</td>
                                    <td>{city1.housing}</td>
                                </tr>
                                <tr>
                                    <td>Living</td>
                                    <td>{city1.costOfLiving}</td>
                                </tr>
                                <tr>
                                    <td>Safety</td>
                                    <td>{city1.safety}</td>
                                </tr>
                                <tr>
                                    <td>Environment</td>
                                    <td>{city1.environmentalQuality}</td>
                                </tr>
                                <tr>
                                    <td>Economy</td>
                                    <td>{city1.economy}</td>
                                </tr>
                            </tbody>
                        </Table>
                    )

                } else if (cityValue.length === 2) {
                    const city1 = getCityById(cityValue[0]);
                    const city2 = getCityById(cityValue[1]);

                    city1.population = numbersWithCommas(city1[0].population);
                    city2.population = numbersWithCommas(city2[0].population);

                    city1.population = numbersWithCommas(city1[0].population);
                    city1.healthcare = Math.round(city1[0].healthcare);
                    city1.taxation = Math.round(city1[0].taxation);
                    city1.education = Math.round(city1[0].education);
                    city1.housing = Math.round(city1[0].housing);
                    city1.costOfLiving = Math.round(city1[0].costOfLiving);
                    city1.safety = Math.round(city1[0].safety);
                    city1.environmentalQuality = Math.round(city1[0].environmentalQuality);
                    city1.economy = Math.round(city1[0].economy);

                    city2.population = numbersWithCommas(city2[0].population);
                    city2.healthcare = Math.round(city2[0].healthcare);
                    city2.taxation = Math.round(city2[0].taxation);
                    city2.education = Math.round(city2[0].education);
                    city2.housing = Math.round(city2[0].housing);
                    city2.costOfLiving = Math.round(city2[0].costOfLiving);
                    city2.safety = Math.round(city2[0].safety);
                    city2.environmentalQuality = Math.round(city2[0].environmentalQuality);
                    city2.economy = Math.round(city2[0].economy);
                    if (index === 1) {
                        return (
                            <Table responsive key={city1[0]._id} striped bordered hover >
                                <thead>
                                    <tr>
                                        <th>City</th>
                                        <th>{city1[0].name}</th>
                                        <th>{city2[0].name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Population</td>
                                        <td>{city1.population}</td>
                                        <td>{city2.population}</td>
                                    </tr>
                                    <tr>
                                        <td>Healthcare</td>
                                        <td>{city1.healthcare}</td>
                                        <td>{city2.healthcare}</td>
                                    </tr>
                                    <tr>
                                        <td>Taxation</td>
                                        <td>{city1.taxation}</td>
                                        <td>{city2.taxation}</td>
                                    </tr>
                                    <tr>
                                        <td>Education</td>
                                        <td>{city1.education}</td>
                                        <td>{city2.education}</td>
                                    </tr>
                                    <tr>
                                        <td>Housing</td>
                                        <td>{city1.housing}</td>
                                        <td>{city2.housing}</td>
                                    </tr>
                                    <tr>
                                        <td>Living</td>
                                        <td>{city1.costOfLiving}</td>
                                        <td>{city2.costOfLiving}</td>
                                    </tr>
                                    <tr>
                                        <td>Safety</td>
                                        <td>{city1.safety}</td>
                                        <td>{city2.safety}</td>
                                    </tr>
                                    <tr>
                                        <td>Environment</td>
                                        <td>{city1.environmentalQuality}</td>
                                        <td>{city2.environmentalQuality}</td>
                                    </tr>
                                    <tr>
                                        <td>Economy</td>
                                        <td>{city1.economy}</td>
                                        <td>{city2.economy}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )
                    }

                } else {
                    return;
                }

                function getCityById(cityInfo) {
                    return (userData.savedCities?.filter(item => {
                        return item._id === cityInfo;
                    }))
                };

            })}

        </Container>

    )
}


export default CityTable