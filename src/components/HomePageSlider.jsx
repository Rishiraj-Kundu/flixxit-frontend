import React, { useEffect, useState } from 'react';
import CardSlider from './CardSlider';
import { useDispatch } from 'react-redux';
import { getGenres } from '../store';
import axios from "../utils/axios"

export default React.memo (function HomePageSlider({title, currUrl}) {
    const [movies, setMovies] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getGenres())
    },[])


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(currUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [currUrl]);

    return (
        <div>
            <CardSlider title={title} data={movies}/>
        </div>
    );
}
)