import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Input, Card, CardBody, Row, Col, Button } from "reactstrap";
function App() {
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        setCountry(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("There was some error!");
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <h1>Hang On, Loading content...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Container style={{ maxWidth: 600 }}>
      <h2 className="text-center">Countries</h2>
      <Input type="text" placeholder="Please Search here...." />
      <Card className="mb-2 mt-2">
        <CardBody>
          <Row>
            <Col md="4">
              <img src="https://picsum.photos/150/150" />
            </Col>
            <Col md="8">
              <h3>India</h3>
              <p>Currency:Afghan afghani(؋) </p>
              <p>Current date and time: 9/8/2021 : 4:21:14 PM</p>
              <Button className="w-100" block outline color="primary">
                Show Map
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

export default App;
