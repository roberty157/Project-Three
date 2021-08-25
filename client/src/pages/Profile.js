import React from 'react';
import { Jumbotron, Container, Button, Col, Row, Card, ListGroup, Nav, Tab, Fade } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_CITY } from '../utils/mutations';
import { removeCityId } from '../utils/localStorage';
import Auth from '../utils/auth';
import { Bar } from 'react-chartjs-2'
import CityTable from '../components/Table';
import 'semantic-ui-css/semantic.min.css';


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
            <Jumbotron fluid >
                {/* Stack the columns on mobile by making one full-width and the other half-width */}
                <Row sm={1} md={2}>
                    <Col sm={12} md={5} className="mt-3">
                        <Card border="info royal" >
                            <Card.Header><h2>{`Welcome ${userData.username}1`}</h2></Card.Header>
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
                    <Col sm={12} md={7} className="mt-3">
                        <Container className="data"> <h2> Your {userData.cityCount} Saved Cities!</h2> </Container>

                        <Container className="scores">
                            <Tab.Container className="" sm={12} id="left-tabs-example" >
                                <Row >
                                    <Col md={3} sm={12}>
                                        {userData.savedCities.map((city) => {
                                            return (
                                                <Nav defaultActiveKey={city.cityId} variant="pills" className="flex-column" >
                                                    <Nav.Item >
                                                        <Nav.Link className="p-2 pb-2" eventKey={city.cityId}> {city.name}</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>)
                                        })}
                                    </Col>
                                    <Col md={9} sm={12}>
                                        <Tab.Content>
                                            {userData.savedCities.map((city) => {
                                                return (
                                                    <Tab.Pane eventKey={city.cityId} transition={Fade}>
                                                        <Row className="CityChartName">
                                                            <h3> Viewing {city.name}                                 <Button variant="outline-danger delete" size="sm" onClick={() => handleDeleteCity(city.cityId)}>
                                                                Delete this City!
                                                            </Button></h3>

                                                        </Row>
                                                        <Bar className="mb-3"
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
                        </Container>
                        <Container className="scores">
                            <h3> Compare Cities</h3>
                            <CityTable />
                        </Container>
                    </Col>

                </Row>
            </Jumbotron>
        </>
    );
};

export default Profile;