import React from 'react';
import { Route } from 'react-router-dom';

import ListsPage from "./ListsPage";
import './App.css';

const App = () => (
  <Route path="/:term?/:brandTerm?/:style?" component={ListsPage}/>
);

export default App;
