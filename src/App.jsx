import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Input, Card, CardBody, Row, Col } from "reactstrap";
function App() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        setCountries(res.data);
        setSearchList(res.data);
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

  function convertTime(offset) {
    var d = new Date();
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;
    var nd = new Date(utc + 3600000 * offset);
    return nd.toLocaleString();
  }

  return (
    <Container style={{ maxWidth: 700 }}>
      <h2 className="text-center">Countries</h2>
      <Input
        type="text"
        placeholder="Please Search here...."
        onChange={(e) =>
          setCountries(
            searchList.filter((country) =>
              country.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
          )
        }
      />
      {countries.map((country) => (
        <Card className="mb-2 mt-2">
          <CardBody>
            <Row>
              <Col md="4">
                <img
                  src={country.flag}
                  style={{ maxWidth: 200, maxHeight: 180, minHeight: 180 }}
                />
              </Col>
              <Col md="8">
                <h3>{country.name}</h3>
                <p>
                  Currency : {country.currencies[0].name} (
                  {country.currencies[0].symbol}){" "}
                </p>
                <p>
                  Current date and time:{" "}
                  {convertTime(
                    country.timezones[0].substring(
                      3,
                      country.timezones[0].length
                    )
                  )}
                </p>
                <a
                  href={`https://www.google.com/maps/?q=${country.name}`}
                  className="w-100 btn btn-outline-primary btn-block"
                >
                  Show Map
                </a>
              </Col>
            </Row>
          </CardBody>
        </Card>
      ))}
    </Container>
  );
}

export default App;
