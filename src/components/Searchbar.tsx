import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>();
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm !== undefined) {
      navigate(`/?query=${searchTerm}`);
    }
  }

  return (
    <Container id="searchBar">
      <Row>
        <Col id="searchBar">
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search by BAN, external ID or subscriber number"
              className="me-2 boxShadow"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <Button id="navBtn">
              <FaSearch />
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
