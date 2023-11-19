import React, {useMemo, useCallback} from 'react';

import CardSlider from './CardSlider';

export default React.memo (function Slider({movies}) {

    function getMoviesFromRange(from, to) {
        return movies.slice(from, to);
    };


    return (
        <div>
            <CardSlider title="Trending Now" data={getMoviesFromRange(0, 15)}/>
            <CardSlider title="New Releases" data={getMoviesFromRange(15, 30)}/>
            <CardSlider title="BlockBuster" data={getMoviesFromRange(30, 45)}/>
            <CardSlider title="Popular" data={getMoviesFromRange(45, 60)}/>
        </div>
    );
}
)