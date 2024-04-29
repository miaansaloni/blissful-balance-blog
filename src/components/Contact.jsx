import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ContactsComponent() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <h4 className="text-center">How can we help you?</h4>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" placeholder="Surname" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Indirizzo email</Form.Label>
              <Form.Control type="email" placeholder="email@email.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Messaggio</Form.Label>
              <Form.Control as="textarea" row={5} placeholder="Type your message" />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button type="submit">Invia</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactsComponent;
