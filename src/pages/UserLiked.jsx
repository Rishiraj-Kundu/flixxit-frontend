import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserLikedMovies } from '../store';
import { firebaseAuth } from '../utils/firebase_config';
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';
import Card from '../components/Card';


export default function UserLiked() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState(undefined);
    const navigate = useNavigate();
    const movies = useSelector((state) => state.flixxit.movies);
    const dispatch = useDispatch();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(currentUser) setEmail(currentUser.email);
        else navigate("/login");
    })

    useEffect(() => {
        if(email) {
            dispatch(getUserLikedMovies(email))
        }
    },[email])


    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }
   
    return (
        <Container>
            <Navbar isScrolled={isScrolled}/>
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {movies?.length > 0 ? movies.map((movie, index) => {
                        return <Card movieData = {movie} index= {index} key={movie.id} isLiked={true}/>
                    }) : <h1>You have not added any movies to your list</h1>}
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
 .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
        margin-left: 3rem;
    }
    .grid {
        flex-wrap: wrap;
        gap: 1rem;
    }
 }
`;