import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./routes";
import Layout from './Layout';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Layout>
        <RoutesComponent />
      </Layout>
    </Router>
  );
};

export default App;