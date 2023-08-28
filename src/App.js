import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navigation from "./Navigation";
import Weather from "./Weather";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Weather city="lisbon" />} />
            <Route path="/paris" element={<Weather city="Paris" />} />
            <Route path="/sydney" element={<Weather city="Sydney" />} />
            <Route
              path="/san-francisco"
              element={<Weather city="San Francisco" />}
            />
          </Route>
        </Routes>
      </Router>
      <div>
        <a
          href="https://github.com/elmira-naghibi/weather-react"
          title="github address"
        >
          Open-source code
        </a>
        &nbsp; by Elmira Naghibi from She Codes
      </div>
    </div>
  );
}

export default App;
