import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Details from "../views/Details";
import Home from "../views/Home";

function Navigator() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/details/:country" component={Details} />
    </BrowserRouter>
  );
}

export default Navigator;
