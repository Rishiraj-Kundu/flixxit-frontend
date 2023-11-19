import React from 'react';

function MovieDetail({movieData}) {
    return (
        <div>
            <img src = {`https://image.tmdb.org/t/p/original${movieData.poster_path}`} alt={`poster_path`} />
        </div>
    );
}

export default MovieDetail;