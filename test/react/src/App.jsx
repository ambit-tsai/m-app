import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
} from 'react-router-dom';
import logo from './logo.svg';
import './app.css';


const BASE_PATH = location.pathname.replace(/\/[^/]+$/, '');


export default function App() {
    return <Router basename={BASE_PATH}>
        <div className="app">
            <Link to="/" className="logo">
                <img src={logo} />
            </Link>

            <div className="links">
                <Link to="/user">/user</Link>
                <Link to="/about">/about</Link>
            </div>

            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/user" component={User}/>
                <Route path="/about" component={About}/>
            </Switch>
        </div>
    </Router>
}


function Home() {
    return <h2>The router is using "history" mode</h2>
}
function User() {
    return <h2>User</h2>
}
function About() {
    return <h2>About</h2>
}