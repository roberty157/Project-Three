import React from 'react'
import { Container, Table, Col, Row, Button } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react';
import { useState} from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const CityTable = () => {

    const [cityValue, setCityValue] = useState([]);

    const handleChange = (e, {value}) => {
        setCityValue(value);
        console.log(value);
    }

    const { loading, data } = useQuery(QUERY_ME);

    const userData = data?.me || [];

      // if data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (

        <Container>
            <Row className="p-3">
                <Col></Col>       
            </Row>


             <h2>
            {userData.savedCities?.length
            ? `You have ${userData.savedCities.length} saved ${userData.savedCities.length === 1 ? 'city' : 'cities'} to compare.`
            : 'You have no saved cities.'}
            </h2>

            <Dropdown className="mb-10" placeholder='City to Compare' onChange={handleChange} fluid multiple selection options={
                userData.savedCities?.map((city) => {  
                    return {
                        key: city._id,
                        value: city._id,
                        text: city.name,
                        disabled: cityValue.length > 1 ? true : false
                    }
                })
            } />


            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>${city.name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Population</td>
                        <td>${city.population}</td>
                    </tr>
                   <tr>
                        <td>Healthcare</td>
                        <td>${city.population}</td>
                    </tr>
                    <tr>
                        <td>Taxation</td>
                        <td>${city.taxation}</td>
                    </tr>
                    <tr>
                        <td>Education</td>
                        <td>${city.education}</td>
                    </tr>
                    <tr>
                        <td>Housing</td>
                       <td>${city.population}</td>
                    </tr>
                    <tr>
                        <td>Living</td>
                        <td>${city.costOfLiving}</td>
                    </tr>
                     <tr>
                        <td>Safety</td>
                        <td>${city.safety}</td>
                    </tr>
                     <tr>
                        <td>Environment</td>
                        <td>${city.environment}</td>
                    </tr> 
                    <tr>
                        <td>Economy</td>
                        <td>${city.economy}</td>
                    </tr>
                </tbody>
            </Table> */}





        </Container>

    )
}


export default CityTable