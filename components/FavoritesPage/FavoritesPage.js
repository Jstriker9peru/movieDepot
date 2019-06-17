import React from 'react';
import SinglePosterCard from '../SinglePosterCard/SinglePosterCard';
import './FavoritesPage.scss';

const FavoritesPage = () => {
    return (
        <div className="favorites-page">
            <h1>My Favorites</h1>
            <h3>Take a look at your full list of favorites</h3>
            <div className="favorites-container">
                <SinglePosterCard original_title={'Toy Story'} />
                <SinglePosterCard original_title={'Toy Story'} />
                <SinglePosterCard original_title={'Toy Story'} />
                <SinglePosterCard original_title={'Toy Story'} />
                <SinglePosterCard original_title={'Toy Story'} />
                <SinglePosterCard original_title={'Toy Story'} />
                <SinglePosterCard original_title={'Toy Story'} />
                <SinglePosterCard original_title={'Toy Story'} />
                <SinglePosterCard original_title={'Toy Story'} />
                <SinglePosterCard original_title={'Toy Story'} />
                <SinglePosterCard original_title={'Toy Story'} />
            </div>
        </div>
    )
}

export default FavoritesPage
