import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
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
    <Container className="text-center">
      <h2>Countries</h2>
    </Container>
  );
}

export default App;
