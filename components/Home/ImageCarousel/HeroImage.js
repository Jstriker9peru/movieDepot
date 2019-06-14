import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./HeroImage.scss";

const HeroImage = ({ movieInfo }) => {
  const { poster_path, original_title, overview, release_date, backdrop_path } = movieInfo;
  const overviewMaxLength = 300;
  const overviewLength = overview.length;
  const exceededLength = overviewLength > overviewMaxLength;
  const reducedOverview =
    overview.substring(0, overviewMaxLength).replace(/\w+[.!?]?$/, "") + " ...";
  const [shouldReadMore, changeReadMore] = useState(exceededLength);

  const changeOverview = () => {
      changeReadMore(!shouldReadMore);
  }

  return (
    <div className="hero-container" style={{ backgroundImage: `url(http://image.tmdb.org/t/p/original${backdrop_path})`}}>
      <div className="hero-info">
        <h1>{original_title}</h1>
        <h3>{release_date} | Family, Adventure, Drama, Fantasy</h3>
        <p>
          {shouldReadMore ? reducedOverview : overview}
          <br />
          {exceededLength ? (
            shouldReadMore ? (
              <button className="readMoreBtn" onClick={changeOverview}>
                Read More
                <i className="material-icons">arrow_drop_down</i>
              </button>
            ) : (
              <button className="readMoreBtn" onClick={changeOverview}>
                Read Less
                <i className="material-icons">arrow_drop_up</i>
              </button>
            )
          ) : null}
        </p>
        <div className="buttons-container">
          <Button className="button1" variant="contained" color="secondary">
            More Info
          </Button>
          <Button className="button2" variant="contained" color="primary">
          <i class="material-icons test-icon">
            star
          </i>
            Add to Favorites
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
