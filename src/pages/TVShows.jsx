import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';
import styled from 'styled-components';
import NotAvailable from '../components/NotAvailable';
import Slider from '../components/Slider';
import SelectGenre from '../components/SelectGenre';

export default function TVShows() {
    const [isScrolled, setIsScrolled] = useState(false);
    const genresLoaded = useSelector((state) => state.flixxit.genresLoaded);
    const movies = useSelector((state) => state.flixxit.movies);
    const genres = useSelector((state) => state.flixxit.genres);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres())
    },[])

    useEffect(() => {
        if(genresLoaded) dispatch(fetchMovies({type: "tv"}));
    }, [genresLoaded])

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }


    return (
        <Container>
            <div className="navbar">
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className="data">
                <SelectGenre genres={genres} type="tv"/>
                {
                    movies.length ? <Slider movies= {movies} /> : <NotAvailable />
                }
            </div>
        </Container>
    );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
        text-align: center;
        color: white;
        margin-top: 4rem;
    }
  }
`;