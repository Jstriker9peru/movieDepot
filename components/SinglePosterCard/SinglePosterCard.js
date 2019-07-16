import React from "react";
import ToggleFavorite from "../ToggleFavorite/ToggleFavorite";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import "./SinglePosterCard.scss";

const SinglePosterCard = ({ id, poster_path, title, movieInfo }) => {
  return (
    <React.Fragment>
      <div className="single-poster-container">
        <Link as={`/details/${id}`} href={`/filmDetails?id=${id}`}>
          <Card className="card">
            <img
              className="card-poster-single"
              src={
                poster_path
                  ? `http://image.tmdb.org/t/p/w500${poster_path}`
                  : "/static/noImageFound.jpg"
              }
              alt={`${title} Poster`}
            />
          </Card>
        </Link>
        <Link href={`/filmDetails?id=${id}`} as={`/details/${id}`}>
          <div className="single-card-overlay">
            <div className="overlay-title">
              <h4>{title}</h4>
            </div>
          </div>
        </Link>
        <ToggleFavorite isButton={false} id={id} info={movieInfo} />
      </div>
    </React.Fragment>
  );
};

export default SinglePosterCard;
