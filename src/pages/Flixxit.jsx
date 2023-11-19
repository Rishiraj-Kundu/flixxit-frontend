import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import HomePageSlider from '../components/HomePageSlider';
import { API_KEY } from "../utils/constraints";
import BackgroundImage from '../components/BackgroundImage';

export default function Flixxit() {

    const [isScrolled, setIsScrolled] = useState(false);
   

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }

    return (
        <Container>
            <Navbar isScrolled = {isScrolled} />
            <BackgroundImage/>
            <HomePageSlider title = "Trending" currUrl = {`/trending/all/week?api_key=${API_KEY}&language=en-US`}/>
            <HomePageSlider title = "Flixxit Orginials" currUrl = {`/discover/tv?api_key=${API_KEY}&with_networks=213`} />
            <HomePageSlider title = "Top Rated" currUrl = {`/movie/top_rated?api_key=${API_KEY}&language=en-US`} />
            <HomePageSlider title = "Action" currUrl = {`/discover/movie?api_key=${API_KEY}&with_genres=28`} />
            <HomePageSlider title = "Comedy" currUrl = {`/discover/movie?api_key=${API_KEY}&with_genres=35`} />
            <HomePageSlider title = "Horror" currUrl = {`/discover/movie?api_key=${API_KEY}&with_genres=27`} />
            <HomePageSlider title = "Romance" currUrl = {`/discover/movie?api_key=${API_KEY}&with_genres=10749`} />
            <HomePageSlider title = "Documentries" currUrl = {`/discover/movie?include_adult=false&api_key=${API_KEY}&with_genres=99`} />
        </Container>
    );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
        filter: brightness(60%);
    }
    img {
        height: 100vh;
        width: 100vw;
    }
    .container {
        position: absolute;
        bottom: 5rem;
        .logo {
            img {
                width: 100%;
                height: 100%;
                margin-left: 5rem;
            }
        }
        .buttons {
            margin: 5rem;
            gap: 2rem;
            button {
                font-size: 1.4rem;
                gap: 1rem;
                border-radius: 0.2rem;
                padding: 0.5rem;
                padding-left: 2rem;
                padding-right: 2.4rem;
                border: none;
                cursor: pointer;
                transition: 0.3s ease-in-out;
                &:hover {
                    opacity: 0.8;
                }
                &:nth-of-type(2) {
                    background-color: rgba(109, 109, 110, 0.7);
                    color: white;
                    svg {
                        font-size: 1.8rem;
                    }
                }
            }
        }
    }
  }
`;