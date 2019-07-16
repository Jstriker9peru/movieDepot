import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { myFirebase } from '../lib/db';
import "firebase/firestore";
// import { withStyles } from "@material-ui/core/styles";
import {
  incrementCounter,
  decrementCounter
} from "../modules/actions/countActions";
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { getFavorites } from '../modules/actions/favoritesActions';
import {
  addFavorite
} from '../modules/actions/favoritesActions';
// import { Button } from "@material-ui/core";
import Navbar from "../components/Navbar/Navbar";
import ImageCarousel from "../components/Home/ImageCarousel/ImageCarousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import CardContainer from "../components/Home/CardContainer/CardContainer";
import { TMDB_API_KEY } from '../config';
import "../scss/styles.scss";

// const styles = theme => ({
//   button: {
//     margin: theme.spacing.unit
//   },
//   input: {
//     display: "none"
//   }
// });

class IndexPage extends Component {
  state = {
    popular: [],
    upcoming: [],
    topRated: []
  };

  // static getInitialProps = () => {
  //   return myFirebase.firestore().collection('users')
  //     .get()
  //     .then(snapshot => {
  //       let data = [];
  //       snapshot.forEach(doc => {
  //         data.push({
  //           id: doc.id,
  //           ...doc.data()
  //         })
  //       })
  //       return { userData: data };
  //     })
  // }

  getPopular = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(popularMovies => {
        let popular = popularMovies.results;
        this.setState({ popular });
      });
  };

  getUpcoming = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=US`
    )
      .then(res => res.json())
      .then(upcomingMovies => {
        let upcoming = upcomingMovies.results;
        this.setState({ upcoming });
      });
  };

  getTopRated = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(topRatedMovies => {
        let topRated = topRatedMovies.results;
        this.setState({ topRated });
      });
  };

  componentDidMount() {
    console.log('index firebase',this.props.firebase.auth().currentUser);
    // console.log('index firestore',this.props.firestore);
    // this.props.getFavorites(this.props.firestore, this.props.firebase);
  }

  componentWillUnmount() {
    console.log('index unmounting');
  }

  render() {
    const { popular, upcoming, topRated } = this.state;
    return (
      <div className="index-page">
        <Navbar />
        <section className="hero-section sections">
          <ImageCarousel />
        </section>
        <ContentWrapper>
          <CardContainer
            title="Upcoming"
            getResults={this.getUpcoming}
            results={upcoming}
          />
          <CardContainer
            title="Popular"
            getResults={this.getPopular}
            results={popular}
          />
          <CardContainer
            title="Top Rated"
            getResults={this.getTopRated}
            results={topRated}
          />
        </ContentWrapper>
      </div>
    );
  }
}

// IndexPage.propTypes = {
//   classes: PropTypes.object.isRequired
// };

const mapState = state => ({
  favorites: state.favoritesData.favorites
});

const mapDispatchToProps = dispatch => {
  return {
    getFavorites: (firestore, firebase) => {
      dispatch(getFavorites({ firestore, firebase }))
    }
  };
};

export default compose(
  withFirebase,
  withFirestore,
  connect(
    mapState,
    mapDispatchToProps
  )
)(IndexPage);
