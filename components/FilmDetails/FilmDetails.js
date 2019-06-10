import React from 'react';
import './FilmDetails.scss';

const FilmDetails = ({ info, actors, directors }) => {
    const { original_title, release_date, runtime } = info;    
    // const { gender, name, profile_path } = actors;    
    // const { name, profile_path } = directors;    
    return (
        <div className="film-details">
            <div className="title">
                <h1>{original_title}</h1>
            </div>
            <div className="description-box">
                <img src="" />
            </div>
            <div className="cast-box">
                <div>Tom Hanks</div>
            </div>
            
        </div>
    )
}

export default FilmDetails
