import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <Container id="searchBar">
      <Row>
        <Col id="searchBar">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search by BAN, external ID or subscriber number"
              className="me-2 boxShadow"
            />
            <Button id="navBtn">
              <FaSearch />
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}