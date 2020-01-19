import React from 'react';
import { Route } from 'react-router-dom';

import ListsPage from "./ListsPage";
import './App.css';

const App = () => (
  <Route path="/" component={ListsPage}/>
);

export default App;
