import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Card, CardBody, Col, Row } from "reactstrap";

function Details(props) {
  const countryName = props.match.params.country;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState({});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        setCountries(res.data);
        setCountry(res.data.find((country) => country.name === countryName));
        if (!country) {
          setError("Country Not Available!s");
        }
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
    <Container className="mt-2">
      <Card>
        <CardBody>
          <Row>
            <Col md="4">
              <img
                src={country.flag}
                style={{ maxWidth: 300, maxHeight: 280, minHeight: 280 }}
              ></img>
            </Col>
            <Col md="8">
              <h2>Country Name:- {country.name}</h2>
              <p>Area:- {country.area}</p>
              <p>
                Currency:-
                {country.currencies[0].name} ({country.currencies[0].symbol})
              </p>
              <p>
                Language:-{" "}
                {country.languages.map((language) => ` ${language.name} `)}
              </p>
              <p>Region:- {country.region}</p>
              <p>Population:- {country.population}</p>
              <div className="row align-items-center">
                Border:-
                {country.borders.map((code) => {
                  const country = countries.find(
                    (country) => country.alpha3Code === code
                  );

                  return (
                    <span
                      style={{
                        maxWidth: 100,
                        textAlign: "center",
                        alignItems: "center",
                      }}
                    >
                      <p>{code}</p>
                      <img
                        style={{ maxHeight: 50, maxWidth: 50 }}
                        src={country.flag}
                      />
                    </span>
                  );
                })}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Details;

{
  /* 
          
          
          
          
           */
}
