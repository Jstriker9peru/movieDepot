import React from "react";
import Card from "@material-ui/core/Card";
import "./CastCard.scss";

const CastCard = ({ name, photo, role }) => {
  return (
    <Card className="cast-card">
      <img
        className="card-poster"
        alt={`Image of ${name}`}
        src={
          photo
            ? `http://image.tmdb.org/t/p/w92/${photo}`
            : "/static/noImageFound.jpg"
        }
        alt={`${name} Photo`}
      />
      <div className="actor-info">
        <div className="actor-name">{name}</div>
        <div className="character">{role}</div>
      </div>
    </Card>
  );
};

export default CastCard;
