import React from 'react';
import SinglePosterCard from '../SinglePosterCard/SinglePosterCard';
import { firestoreConnect, isEmpty, useFirestore } from "react-redux-firebase";
import { compose } from 'redux';
import { connect } from 'react-redux';
import './FavoritesPage.scss';

const FavoritesPage = ({ currentUser }) => {
    const firestore = useFirestore();
    console.log('This is favorites page firestore', firestore)
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

const mapStateToProps = (state) => ({
    currentUser: state.auth.currentUser,

});
const mapDispatchToProps = null;

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(FavoritesPage);
