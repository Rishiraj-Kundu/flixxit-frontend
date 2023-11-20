import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {IoPlayCircleSharp} from "react-icons/io5";
import {BsCheck} from "react-icons/bs";
import { AiOutlinePlus } from 'react-icons/ai';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase_config';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { removeFromLikedMovies } from '../store';
import _ from 'lodash';

export default React.memo( function Card({movieData, isLiked = false}) {
    const [isHovered, setIsHovered] = useState(false);
    const [email, setEmail] = useState(undefined);
    const getGenreFromId = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentry",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western"
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(currentUser) setEmail(currentUser.email);
        else navigate("/login");
    })

    const mythrottle = _.throttle(function () {
            setIsHovered(!isHovered);
            console.log('Function is called on the'
                + ' trailing edge of the timeout '
                + 'and throttled after 2000ms!');
        }, 2000, { 'trailing': true });
        

    const addToList = async () => {
        try{
            await axios.post("https://flixxit-server-zatq.onrender.com/api/user/add", {email, data:movieData})
        }catch(err) {
            console.log(err);
        }
    }

    

    return (
        <Container onMouseEnter={mythrottle} onMouseLeave={mythrottle}>
            <img src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path || movieData.image}`} alt="" /> 
            {
                isHovered && (
                    <div className="hover">
                        <div className="image-video-container">
                        <img src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path || movieData.image}`} alt="" onClick= {() => navigate("/player")}/>
                        <video src = {""} autoPlay loop muted onClick= {() => navigate("/player")}/>
                        </div>
                        <div className="info-container flex column">
                            <h3 className="name" onClick={() => navigate("/player")}>{movieData.name || movieData.title || movieData.original_title}</h3>
                            <div className="icons flex j-between">
                                <div className="controls flex">
                                    <IoPlayCircleSharp title="play" onClick={() => navigate("/player")}/>
                                    {
                                        isLiked ? 
                                            (<BsCheck title="Remove From List"  onClick={() => dispatch(removeFromLikedMovies({movieId: movieData.id, email}))}/>) :
                                            (<AiOutlinePlus title="Add to my list" onClick={addToList}/>)
                                        
                                    }
                                </div>
                            </div>
                            <div className="genres flex">
                                {movieData.genre_ids ? (<ul className="flex">{movieData.genre_ids.map((genre) => {
                                    return (getGenreFromId[genre] && <li key={genre}>{getGenreFromId[genre]}</li>);
                                })}</ul>) : (<ul className="flex">{movieData.genres.map((genre) => {
                                    return (<li key={genre}>{genre}</li>);
                                   })}</ul>) }
                            </div>
                        </div>
                    </div>
                )
            }
        </Container>
    );
}
)

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 90;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
        position: relative;
        height: 140px;
        img {
            width: 100%;
            height: 140px;
            object-fit: cover;
            border-radius: 0.3rem;
            top: 0;
            z-index: 4;
            position: absolute;
        }
        video{
            width: 100%;
            height: 140px;
            object-fit: cover;
            border-radius: 0.3rem;
            top: 0;
            z-index: 5;
            position: absolute;
        }
    }
    .info-container {
        padding: 1rem;
        gap: 0.5rem;
    }
    .icons{
        .controls{
            display: flex;
            gap: 1rem;
        }
        svg{
            font-size: 2rem;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            &:hover{
                color: #b8b8b8;
            }
        }
    }
    .genres {
        ul {
            gap: 1rem;
            li {
                padding-right: 0.7rem;
                &:first-of-type{
                    list-style-type: none;
                }
            }
        }
    }
  }
`;

