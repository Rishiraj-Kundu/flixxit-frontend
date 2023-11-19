import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Flixxit from './pages/Flixxit';
import Player from './pages/Player';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import UserLiked from './pages/UserLiked';
import Profile from './pages/Profile';
import AboutUs from './pages/aboutUs';

function App() {

  return (
    <BrowserRouter>
        <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path='/' element = {<Profile />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/player" element={<Player />}/>
        <Route exact path="/movies" element={<Movies />}/>
        <Route exact path="/tv" element={<TVShows />}/>
        <Route exact path="/mylist" element = {<UserLiked />} />
        <Route exact path="/aboutUs" element={<AboutUs />} />
        <Route exact path="/home" element={<Flixxit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;