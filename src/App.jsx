import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Layout from "./Components/Layout";

const baseURL = "https://ahmed-elgarhy-test-server.herokuapp.com";

const App = () => {
  const [data, setData] = useState([]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home baseURL={baseURL} />} />
          <Route path="/signup" element={<Signup baseURL={baseURL} />} />
          <Route path="/login" element={<Signin baseURL={baseURL} />} />
          <Route path="/create" element={<Create baseURL={baseURL} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
