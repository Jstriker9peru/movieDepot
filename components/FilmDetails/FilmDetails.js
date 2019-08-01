import React from "react";
import Card from "@material-ui/core/Card";
import CastCard from "../CastCard/CastCard";
import ToggleFavorite from "../ToggleFavorite/ToggleFavorite";
import SinglePosterCard from "../SinglePosterCard/SinglePosterCard";
import "./FilmDetails.scss";

const FilmDetails = ({ info, actors, similar, directors, genres, upcoming }) => {
  const { title, overview, poster_path, release_date, runtime, id } = info;
  const empty = 'N/A';
  actors = (directors.length > 1) ? actors.slice(0, 16) : actors.slice(0, 17);
  similar = similar.length ? similar.slice(0, 9) : null;
  genres = genres.slice(0, 3);


  return (
    <div className="film-details">
      <div className="description-container">
        <h1 className="description-title">{title}</h1>
        <Card className="description-box">
          <div className="poster-container">
            <img
              className="poster"
              alt={`${title} poster`}
              height="auto"
              width="320"
              src={
                poster_path
                  ? `http://image.tmdb.org/t/p/w500${poster_path}`
                  : "/static/noImageFound.jpg"
              }
            />
            <div className="runtime">
              <h4 className="number">{runtime ? runtime : "?"}</h4>
              <span className="min">Min</span>
            </div>
          </div>
          <div className="description">
            <div className="release-date">
              <span className="tag">
                Release Date
                <br />{" "}
              </span>{" "}
              {release_date ? release_date : empty}
            </div>
            <div className="overview">
              <span className="tag">
                Plot
                <br />{" "}
              </span>{" "}
              {overview ? overview : empty}
            </div>
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
            <div className="btn-container">
              <ToggleFavorite isButton={true} id={id} info={info} />
            </div>
          </div>
        </Card>
      </div>
      <div className="cast-container">
        <h1>Cast</h1>
        <div className="cast-box">
          {directors &&
            directors.map(director => {
              const { name, profile_path, job, id } = director;

              return (
                <CastCard
                  key={id}
                  name={name}
                  photo={profile_path}
                  role={job}
                />
              );
            })}
          {actors &&
            actors.map(actor => {
              const { name, profile_path, character, id } = actor;
              return (
                <CastCard
                  key={id}
                  name={name}
                  photo={profile_path}
                  role={character}
                />
              );
            })}
        </div>
      </div>
      {similar ? (
        <div className="similar-container">
          {

          }
          <h1>Similar Movies</h1>
          <div className="similar-box">
            {similar.map(movie => {
              const {
                poster_path: similarPoster,
                title: similarTitle,
                id
              } = movie;
              return (
                <SinglePosterCard
                  key={id}
                  id={id}
                  poster_path={similarPoster}
                  title={similarTitle}
                  movieInfo={movie}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="similar-container">
          <h1>Upcoming Movies</h1>
          <div className="similar-box">
            {upcoming.map(movie => {
              const {
                poster_path: similarPoster,
                title: similarTitle,
                id
              } = movie;
              return (
                <SinglePosterCard
                  key={id}
                  id={id}
                  poster_path={similarPoster}
                  title={similarTitle}
                  movieInfo={movie}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmDetails;
