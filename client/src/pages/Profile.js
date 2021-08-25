import React from 'react';
import { Jumbotron, Container, Button, Col, Row, /*Card,*/ ListGroup, Nav, /*Image,*/ Tab, Fade } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_CITY } from '../utils/mutations';
import { removeCityId } from '../utils/localStorage';
import Auth from '../utils/auth';
import { Bar } from 'react-chartjs-2'
import CityTable from '../components/Table';
import 'semantic-ui-css/semantic.min.css';
import { Card,Icon,Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { numbersWithCommas } from '../utils/helpers'

import city from "../assets/images/city.jpg";




const Profile = () => {


    const { loading, data } = useQuery(QUERY_ME);
    console.log(data);

    const userData = data?.me || {};
    console.log(userData);


    const [removeCity] = useMutation(REMOVE_CITY);


    // create function that accepts the city's mongo _id value as param and deletes the book from the database
    const handleDeleteCity = async (cityId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        // remove city
        try {
            const response = await removeCity({
                variables: { cityId },
            });

            if (!response.data) {
                throw new Error('something went wrong!');
            }
            // upon success, remove city's id from localStorage
            removeCityId(cityId);
        } catch (err) {
            console.error(err);
        }
    };
    // if data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
            <Jumbotron fluid className="m-3">
                <Row>

                    <Col className="mb-2 " xs={5}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header><h1>{data.me.username}</h1></Card.Header>
                            <Card.Meta>{data.me.email}</Card.Meta>
                            <Card.Description>
                                {data.me.homeCity &&
                                <h3>{data.me.username} is currently living in {data.me.homeCity.name.split(',')[0]}</h3>}
                                
                            </Card.Description>
                            
                        </Card.Content>
                        <Card.Content extra>
                                <a>
                                    <Icon disabled name='building' size='large'/>
                                    {data.me.savedCities.length} saved cities
                                </a>
                            </Card.Content>
                            {
                                data.me.homeCity &&
                                <Card.Content extra>
                                    <a>
                                        <Icon name='home' size='large'/>
                                        {data.me.homeCity.name}
                                    </a>
                                </Card.Content>
                            }
                        
                        </Card>
                        {
                            data.me.homeCity
                            ? <Card fluid>
                                <Image src={data.me.homeCity.image} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{data.me.homeCity.name.split(',')[0]}</Card.Header>
                                    <Card.Meta>{data.me.homeCity.name}</Card.Meta>
                                    <Card.Description>
                                        population: {numbersWithCommas(data.me.homeCity.population)}
                                    </Card.Description>
                                </Card.Content>
                                
                                </Card>
                            :<Link to="/"><Button variant="danger" ><h1>find your home city</h1></Button></Link>
                        }

                    </Col>
                    <Col className="d-flex">
                        <Col className="d-flex" >

                            <Container>
                                {userData.savedCities.length
                                    ? `Viewing ${userData.savedCities.length} saved ${userData.savedCities.length === 1 ? 'city' : 'cities'}:`
                                    : 'You have no saved cities!'}
                                <h3> You have {userData.cityCount} cities saved!</h3>



                                <Tab.Container id="left-tabs-example" >
                                    <Row>
                                        <Col sm={3}>
                                            {userData.savedCities.map((city) => {
                                                return (
                                                    <Nav defaultActiveKey={city.cityId} variant="pills" className="flex-column" >
                                                        <Nav.Item >
                                                            <Nav.Link className="p-2 pb-2" eventKey={city.cityId}> {city.name}</Nav.Link>
                                                        </Nav.Item>
                                                    </Nav>)
                                            })}
                                        </Col>
                                        <Col sm={9}>
                                            <Tab.Content>
                                                {userData.savedCities.map((city) => {
                                                    return (
                                                        <Tab.Pane eventKey={city.cityId} transition={Fade}>
                                                            <h3> Viewing {city.name}</h3>
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
                                                                height={100}
                                                                width={250}
                                                                options={{
                                                                    responsive: true,
                                                                    maintainAspectRatio: true,
                                                                    scales: {
                                                                        y: {
                                                                            suggestedMin: 0,
                                                                            suggestedMax: 10
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </Tab.Pane>)

                                                })}
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                                <h4> Compare Cities</h4>
                                <CityTable />


                            </Container>
                        </Col>
                    </Col>
                </Row>

                <Container className="g-2">
                    <Col md>



                    </Col>

                </Container>
            </Jumbotron>



        </>
    );
};

export default Profile;