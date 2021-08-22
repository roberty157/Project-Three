import React from 'react'
import { Container, Table, Col, Row, Button } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const CityTable = () => {

    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || [];

      // if data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <Container>
            <Row className="p-3">

                <Col>         
                    


                </Col>
                
            </Row>


             <h2>
            {userData.savedCities?.length
            ? `Viewing ${userData.savedCities.length} saved ${userData.savedCities.length === 1 ? 'city' : 'cities'}.`
            : 'You have no saved cities.'}
            </h2>


            {userData.savedCities?.map((city) => {
                return (
                    <h2 key={city._id}>{city._id}</h2>
                );
             })}   

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>State 1</th>
                        <th>State 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Population</td>
                        <td></td>
                        <td></td>
                    </tr>
                   <tr>
                        <td>Healthcare</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Taxation</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Education</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Housing</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Living</td>
                        <td></td>
                        <td></td>
                    </tr>
                     <tr>
                        <td>Safety</td>
                        <td></td>
                        <td></td>
                    </tr>
                     <tr>
                        <td>Environment</td>
                        <td></td>
                        <td></td>
                    </tr> 
                    <tr>
                        <td>Economy</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>





        </Container>

    )
}


export default CityTable