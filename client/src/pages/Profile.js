import React from 'react';
import { Jumbotron, Container, Button, Col, Row, Card, ListGroup, Nav, Image, Tab, Fade } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_CITY } from '../utils/mutations';
import { removeCityId } from '../utils/localStorage';
import Auth from '../utils/auth';
import { Bar } from 'react-chartjs-2'
import CityTable from '../components/Table';

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
                        <Card border="info royal" >
                            <Card.Header><h2>{`The cover for ${userData.username}`}</h2></Card.Header>
                            <Card.Body className="m-3">
                                <Card.Text className="mb-2" >{`Homecity: ${userData.homeCity}`}</Card.Text >
                                <Card.Text className="mb-2">{`Email: ${userData.email}`}</Card.Text >
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                                {/* <Card.Image src="holder.js/100px180" height="250" width="250" /> */}
                                <ListGroup variant="flush" className="m-3 ">
                                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                        <Card className="overlay  text-white" height="250" width="250">
                            <Card.Img src={city} alt="Card image" height="250" width="250" />
                            <Card.ImgOverlay className="p-5">
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.
                                </Card.Text>
                                <Card.Text>Last updated 3 mins ago</Card.Text>
                            </Card.ImgOverlay>
                        </Card>

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
                                {/* <h4> Compare City Costs </h4>
                                            <CityTable /> */}


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