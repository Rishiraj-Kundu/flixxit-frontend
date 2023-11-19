import React, { useRef, useState, useEffect } from 'react';
import Card from "./Card";
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import _ from 'lodash';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default React.memo(function CardSlider({data, title}) {

    const cardRef = useRef();

 

 const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5.5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1.5
    }
  };
    

    

    return (
        <Container className="flex column">
            <h1>{title}</h1>
            <div className="wrapper">
                <Carousel responsive={responsive} infinite={true} partialVisible= {true}	>
                    {
                      data.map((movie, index) => {
                          return <Card movieData={movie} index={index} key={movie.id} ref={cardRef}/>
                      })
                    }
                </Carousel>
            </div>
        </Container>
    );
}
)

const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1{
    margin-left: 50px;
  }
`;
