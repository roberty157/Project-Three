import Card from "react-bootstrap/Card"

const bannerCard = ({ headerIcon, title, text}) => {
    return (
        <Card bg="light" text="dark" style={{ width: '18rem', margin: '10px', textAlign: "center" }}>
            <Card.Header>
                {headerIcon}
                <Card.Title>{title}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default bannerCard;