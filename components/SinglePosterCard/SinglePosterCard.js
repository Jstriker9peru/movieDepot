import React, { useState } from 'react';
import Link from 'next/link';
import Card from "@material-ui/core/Card";
import './SinglePosterCard.scss';

const SinglePosterCard = ({ id, poster_path, original_title }) => {
    const [favorited, changeFavorited] = useState(false);
    const toggleFavorited = () => {
        changeFavorited(!favorited);
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
                        <div className="favorite-icon-container" onClick={toggleFavorited}>
                            {favorited ? 
                                <i class="material-icons favorite-icon-full">
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

export default SinglePosterCard
