
import './App.css';

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
       
        <Routes>
          <Route exact path="/" element={<News pageSize={6} country="in" category = "General"/> }></Route>
          <Route exact path="/Business" element={<News pageSize={6} country="in" category = "Business"/>} ></Route>
          <Route exact path="/Entertainment"element={<News pageSize={6} country="in" category = "Entertainment"/>}> </Route>
          <Route exact path="/Health" element={<News pageSize={6} country="in" category = "Health"/> }></Route>
          <Route exact path="/Science" element={<News pageSize={6} country="in" category = "Science"/>}> </Route>
          <Route exact path="/Sports" element={<News pageSize={6} country="in" category = "Sports"/>} ></Route>
          <Route exact path="/Technology" element={<News pageSize={6} country="in" category = "Technology"/>}> </Route>
        </Routes>
        </Router>
      </div>
    )
  }
}
