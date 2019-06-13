import React from "react";
import Link from 'next/link';
import Card from "@material-ui/core/Card";
import CastCard from "../CastCard/CastCard";
import SinglePosterCard from '../SinglePosterCard/SinglePosterCard';
import "./FilmDetails.scss";

const FilmDetails = ({ info, actors, similar, directors, genres }) => {
  const {
    original_title,
    overview,
    poster_path,
    release_date,
    runtime
  } = info;
  actors = actors.slice(0, 17);
  similar = similar.length ? similar.slice(0, 9) : null;
  genres = genres.slice(0, 3);
  return (
    <div className="film-details">
      <div className="description-container">
        <h1 className="description-title">{original_title}</h1>
        <Card className="description-box">
            {poster_path &&
            <img
            className="poster"
            height="auto"
            width="320"
            src={`http://image.tmdb.org/t/p/w500${poster_path}`}
            />
            }
            <div className="description">
                <div className="release-date"><span className="tag">Release Date<br></br> </span>  {release_date}</div>
                <div className="overview"><span className="tag">Plot<br></br> </span> {overview}</div>
                <div className="genres">
                    {genres && genres.map(genre => {
                        return (
                            <div key={genre.id} className="genre">{genre.name}</div>
                        )                
                    })}
                </div>
                <div className="runtime">
                    <h4 className="number">
                        {runtime}
                    </h4>
                    <span className="min">Min</span>
                </div>
                <div>
                <p></p>
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

                return <CastCard key={id} name={name} photo={profile_path} role={job} />;
            })}
            {actors &&
            actors.map(actor => {
                const { name, profile_path, character, id } = actor;
                return (
                <CastCard key={id} name={name} photo={profile_path} role={character} />
                );
            })}
        </div>
      </div>
      {similar && (
      <div className="similar-container">
        <h1>Similar Movies</h1>
        <div className="similar-box">
            {similar.map(movie => {
                const { poster_path: similarPoster, original_title: similarTitle, id } = movie;
                return (
                    <SinglePosterCard key={id} id={id} poster_path={similarPoster} original_title={similarTitle} />
                )

            })}
        </div>
      </div>)}
    </div>
  );
};

export default FilmDetails;
