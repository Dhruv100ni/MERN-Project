import React, {useState, useEffect} from 'react';
import './App.css';
import {Container} from '@material-ui/core';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
const App = () => (
        <BrowserRouter>
        <Container maxWidth="lg">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                {/* <Route path="/" exact component={Home} />
                <Route path="/auth" exact component={Auth} /> */}
            </Routes>
            {/* <Home /> */}
        </Container>
        </BrowserRouter>
    );


export default App;
