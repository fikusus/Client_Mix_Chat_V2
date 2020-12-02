import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Chat from "./components/Chat/Chat";

const App = () => (
  <Router>
    <Route path="/Client_Mix_Chat_V2" exact component={Chat} />
  </Router>
);

export default App;
