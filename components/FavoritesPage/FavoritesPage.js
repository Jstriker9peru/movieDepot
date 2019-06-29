import React from 'react';
import SinglePosterCard from '../SinglePosterCard/SinglePosterCard';
import { firestoreConnect, isEmpty, useFirestore } from "react-redux-firebase";
import { compose } from 'redux';
import { connect } from 'react-redux';
import './FavoritesPage.scss';

const FavoritesPage = ({ currentUser, favorites }) => {
    const firestore = useFirestore();
    console.log('This is favorites page firestore', firestore)
    return (
        <div className="favorites-page">
            <h1>My Favorites</h1>
            <h3>Take a look at your full list of favorites</h3>
            <div className="favorites-container">
                {favorites && favorites.map(favorite => {
                    const { id, title, poster} = favorite;
                    return (
                        <SinglePosterCard key={id} movieInfo={favorite} original_title={title} poster_path={poster} id={id} />
                    )
                })}
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
