import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { TMDB_API_KEY } from '../../../config';
import Link from "next/link";
import "./HeroImage.scss";

const HeroImage = ({ movieInfo }) => {
  const { title, overview, release_date, backdrop_path, id } = movieInfo;
  const overviewMaxLength = 300;
  const overviewLength = overview.length;
  const exceededLength = overviewLength > overviewMaxLength;
  const [shouldReadMore, changeReadMore] = useState(exceededLength);
  const [genres, setGenres] = useState([]);
  const reducedOverview =
    overview.substring(0, overviewMaxLength).replace(/\w+[.!?]?$/, "") + " ...";

  const changeOverview = () => {
    changeReadMore(!shouldReadMore);
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`)
    .then(res => res.json())
    .then(info => {
      let newGenres = info.genres.slice(0, 3);
      setGenres(newGenres);
    })
  }, []);

  return (
    <div
      className="hero-container"
      style={{
        backgroundImage: `url(http://image.tmdb.org/t/p/original${backdrop_path})`
      }}
    >
      <div className="hero-info">
        <h1>{title}</h1>
        <h3 className="extra-info">
          {release_date}
          <div className="genres">
            {genres &&
                genres.map(genre => {
                  return (
                    <div key={genre.id} className="genre">
                      {genre.name}
                    </div>
                  );
            })}
          </div>
        </h3>
        <p>
          {shouldReadMore ? reducedOverview : overview}
          <br />
          {exceededLength ? (
            shouldReadMore ? (
              <button className="readMoreBtn" onClick={changeOverview}>
                Read More
                <i className="arrow material-icons">arrow_drop_down</i>
              </button>
            ) : (
              <button className="readMoreBtn" onClick={changeOverview}>
                Read Less
                <i className="arrow material-icons">arrow_drop_up</i>
              </button>
            )
          ) : null}
        </p>
        <div className="buttons-container">
          <Link href={`/filmDetails?id=${id}`} as={`/filmDetails/${id}`}>
            <Button className="button1" variant="contained" color="secondary">
              More Info
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
