import React from 'react';
import Link from 'next/link';
import Card from "@material-ui/core/Card";
import './SinglePosterCard.scss';

const SinglePosterCard = ({ id, poster_path, original_title }) => {
    return (
        <Link key={id} href={`/filmDetails?id=${id}`} as={`/filmDetails/${id}`}>    
            <Card className="card">
                <img
                className="card-poster-single"
                src={`http://image.tmdb.org/t/p/w500${poster_path}`}
                alt={`${original_title} Poster`}
                />
            </Card>
        </Link>
    )
}

export default SinglePosterCard
