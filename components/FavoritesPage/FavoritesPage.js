import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty, useFirestore } from "react-redux-firebase";
import Pagination from '../Pagination/Pagination';
import SinglePosterCard from '../SinglePosterCard/SinglePosterCard';
import './FavoritesPage.scss';

const FavoritesPage = ({ currentUser, favorites }) => {
    const firestore = useFirestore();
    console.log('This is favorites page favorites', favorites)
    const [currentPage, setCurrentPage] = useState(1);
    const [favoritesPerPage, setFavoritesPerPage] = useState(10);

    const indexOfLastFavorite = currentPage * favoritesPerPage;
    const indexOfFirstFavorite = indexOfLastFavorite - favoritesPerPage;
    const currentFavorites = favorites.slice(indexOfFirstFavorite, indexOfLastFavorite);

    const paginate = (pageNumber) => setCurrentPage(pageNumber) 

    return (
        <div className="favorites-page-container">
            <div className="favorites-page">
                <h1>My Favorites</h1>
                <h3>Take a look at your full list of favorites</h3>
                <div className="favorites-container">
                    <div className="favorites">
                        {favorites.length > 0 ? currentFavorites.map(favorite => {
                            const { id, title, poster} = favorite;
                            return (
                                <SinglePosterCard key={id} movieInfo={favorite} original_title={title} poster_path={poster} id={id} />
                            )
                        }) : (
                            <p style={{ color: 'white', paddingLeft: '1em' }}>You have not added any favorites yet!</p>
                        )}
                    </div>
                    <Pagination postsPerPage={favoritesPerPage} currentPage={currentPage} paginate={paginate} totalPosts={favorites.length} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.currentUser,
    favorites: state.favoritesData.favorites

});
const mapDispatchToProps = (dispatch) => {
    return {
        getFavorites: (firestore, firebase) => {
            dispatch(getFavorites({ firestore, firebase }))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(FavoritesPage);
