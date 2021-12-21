import React, { Component } from 'react'
import { 
  BrowserRouter as Router,
  Routes, 
  Route 
} from 'react-router-dom'

import Footer from './components/layout/footer/Footer';
import Landing from './components/layout/landing/Landing';
import Navbar from './components/layout/navbar/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={ <Landing /> } />
          <Route path="/register" element={ <Register />} />
          <Route path="/login" element={ <Login />} />
        </Routes>
        <Footer />
      </Router>
    )
  }
}

