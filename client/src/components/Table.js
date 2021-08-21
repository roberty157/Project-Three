import React from 'react'
import { Container, Table, Dropdown, Col, Row } from 'react-bootstrap'
const cityTable = () => {
    return (
        <Container>
            <Row className="p-3">

                <Col>            <Dropdown>
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                        City Dropdown
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown></Col>
                <Col>            <Dropdown>
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                        City Dropdown
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown></Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mark</td>
                    </tr>
                    <tr>
                        <td>Jacob</td>
                    </tr>
                    <tr>
                        <td>3</td>
                    </tr>
                </tbody>
            </Table>






        </Container>

    )
}


export default cityTable