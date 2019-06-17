import React, { useState } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import {
    addFavorite,
    removeFavorite
  } from '../../modules/actions/favoritesActions';
import Link from 'next/link';
import Card from "@material-ui/core/Card";
import './SinglePosterCard.scss';

const SinglePosterCard = ({ id, poster_path, original_title, addFavorite, removeFavorite, movieInfo }) => {
    const [favorited, changeFavorited] = useState(false);
    const toggleFavorited = (info) => {
        if (favorited) {
            changeFavorited(false);
            removeFavorite(info)
        } else {
            changeFavorited(true);
            addFavorite(info)
        }
        
    }
    return (
        <React.Fragment>
                    <div className="single-poster-container">
                        <Link href={`/filmDetails?id=${id}`} as={`/filmDetails/${id}`}>
                            <Card className="card">
                                <img
                                className="card-poster-single"
                                src={poster_path ? `http://image.tmdb.org/t/p/w500${poster_path}` : '/static/noImageFound.jpg'}
                                alt={`${original_title} Poster`}
                                />
                            </Card>
                        </Link>
                        <Link href={`/filmDetails?id=${id}`} as={`/filmDetails/${id}`}>
                            <div className="single-card-overlay">
                                <div className="overlay-title">
                                    <h4>{original_title}</h4>
                                </div>
                            </div>
                        </Link>
                        <div className="favorite-icon-container" onClick={() => {
                    return toggleFavorited(movieInfo);
                }}>
                            {favorited ? 
                                <i className="material-icons favorite-icon-full">
                                    star
                                </i>
                                : 
                                <i className="material-icons favorite-icon">
                                    star_border
                                </i>
                            }
                        </div>
                    </div>    
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
      addFavorite: (movieInfo) => {      
        dispatch(addFavorite(movieInfo));
      },
      removeFavorite: (movieInfo) => {
        dispatch(removeFavorite(movieInfo));
      }
    };
};

export default compose(
    connect(null, mapDispatchToProps)
)(SinglePosterCard);
