import React from 'react';
import './HeroImage.scss';
import { Button } from '@material-ui/core';

const HeroImage = ({ movieInfo }) => {
    // style={{ backgroundImage: `url(http://image.tmdb.org/t/p/w500${backdrop_path})` }}
    const { poster_path, original_title, overview, release_date } = movieInfo;
    return (
        <div className="hero-container"  >
          <div className="hero-image">
            <img src={`http://image.tmdb.org/t/p/w500${poster_path}`} alt={`${original_title} Poster`}></img>
          </div>
          <div className="hero-info">
            <h1>{original_title}</h1>
            <h3>{release_date} | Family, Adventure, Drama, Fantasy</h3>
            <p>{overview}</p>
            <div className="buttons-container">
              <Button className="button1" variant="contained" color="secondary">Buy Now</Button>
              <Button className="button2" variant="contained" color="primary">Add to Favorites</Button>
            </div>
          </div>
        </div>
    )
}

export default HeroImage
