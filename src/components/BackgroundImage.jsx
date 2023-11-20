import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_KEY } from '../utils/constraints';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase_config';

export default function BackgroundImage() {
  const [isLiked, setIsLiked] = useState(false);
  const [email, setEmail] = useState(undefined)
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if(currentUser) setEmail(currentUser.email);
    else navigate("/login");
})

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }

    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  const addToList = async () => {
    try{
        await axios.post("https://flixxit-server-zatq.onrender.com/api/user/add", {email, data:movie});
        setIsLiked(true);
    }catch(err) {
        console.log(err);
    }
}

  return (
    <Container>
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button" onClick={() => navigate("/player")}>Play</button>
          {
            isLiked ? (<button className='banner_button' onClick={() => navigate("/mylist")}>Added</button>) : (<button className="banner_button" onClick={addToList}>+ My List</button>)
          }
        </div>
        <h1 className="banner_desc">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner_fadeBottom" />
    </header>
    </Container>
  );
}
const Container = styled.div`
.banner {
  position: relative;
  top: 0px;
  height: 448px;
  color: white;
  object-fit: contain;
}

.banner_contents {
  margin-left: 30px;
  padding-top: 140px;
  height: 190px;
}

.banner_title {
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
}

.banner_desc {
  width: 45rem;
  line-height: 1.3;
  padding-top: 1rem;
  font-size: 0.8rem;
  max-width: 360px;
  height: 80px;
}

.banner_fadeBottom {
  height: 16.5rem;
  background-image: linear-gradient(
      180deg,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
  );
}

.banner_button {
  cursor: pointer;
  color: #fff;
  outline: none;
  border: #fff;
  font-weight: 700;
  border-radius: 0.2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  background-color: rgba(51, 51, 51, 0.5);
  padding-bottom: 0.5rem;
}

.banner_button:hover {
  color: #000;
  background-color: #e6e6e6;
  transition: all 0.5s;
}
`;