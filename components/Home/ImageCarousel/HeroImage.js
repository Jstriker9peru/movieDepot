import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Link from "next/link";
import "./HeroImage.scss";

const HeroImage = ({ movieInfo }) => {
  const {
    title,
    overview,
    release_date,
    backdrop_path,
    id
  } = movieInfo;
  const overviewMaxLength = 300;
  const overviewLength = overview.length;
  const exceededLength = overviewLength > overviewMaxLength;
  const [shouldReadMore, changeReadMore] = useState(exceededLength);
  const reducedOverview =
    overview.substring(0, overviewMaxLength).replace(/\w+[.!?]?$/, "") + " ...";

  const changeOverview = () => {
    changeReadMore(!shouldReadMore);
  };

  return (
    <div
      className="hero-container"
      style={{
        backgroundImage: `url(http://image.tmdb.org/t/p/original${backdrop_path})`
      }}
    >
      <div className="hero-info">
        <h1>{title}</h1>
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
