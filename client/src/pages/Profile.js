import React from 'react';
import { Jumbotron, Container, Button, Col, Row, Card, ListGroup, Nav, Sonnet, Tab } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_CITY } from '../utils/mutations';
import { removeCityId } from '../utils/localStorage';
import Auth from '../utils/auth';
import BarChart from '../components/BarChart';
import CityTable from '../components/Table';
import 'semantic-ui-css/semantic.min.css';





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
                    <Col className="mh-100" xs={5}>
                        <Card className="p-4 ">

                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                        <Card className="bg-dark text-white" style={{ height: '18rem' }}>
                            <Card.Img src="holder.js/100px270" alt="Card image" />
                            <Card.ImgOverlay>
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

                                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                    <Row>
                                        <Col sm={3}>
                                            <Nav variant="pills" className="flex-column" >
                                                <Nav.Item >
                                                    <Nav.Link className="pt-2 pb-2" eventKey="first"> Saved City 1</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link className="pt-2 pb-2" eventKey="second">Saved City 2</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link className="pt-2 pb-2" eventKey="third">Saved City 3</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col sm={9}>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="first">
                                                    <BarChart />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="second">
                                                    <BarChart />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="third">
                                                    <BarChart />
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                                <h4> Compare City Costs </h4>
                                <CityTable />


                            </Container>
                        </Col>
                        {/* <Col className="d-flex"> <BarChart /></Col> */}

                        <Row className="g-2">
                            <Col md>



                            </Col>

                        </Row>
                    </Col>
                </Row>

            </Jumbotron>



        </>
    );
};

export default Profile;