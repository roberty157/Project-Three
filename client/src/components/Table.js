import React from 'react'
import { Container, Table, Col, Row, Button } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'

const cityTable = () => {
    
    


    return (
        <Container>
            <Row className="p-3">

                <Col>         
                    
                </Col>
                
            </Row>
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


export default cityTable