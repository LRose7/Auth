import React, { Component } from 'react';
import './navbar.css';

// Using class based component because will have Life cycle methods  
class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <a href="" className="navbar-brand">DevConnector</a>
                    <button className="navbar-toggle">
                        <span className="navbar-toggle-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a href="" className="nav-link">Developers</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a href="" className="nav-link">Sign Up</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a href="" className="nav-link">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;