import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { TMDB_API_KEY } from "../config";
import { getFavorites } from "../modules/actions/favoritesActions";
import { withFirebase, withFirestore } from "react-redux-firebase";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import CardContainer from "../components/Home/CardContainer/CardContainer";
import ImageCarousel from "../components/Home/ImageCarousel/ImageCarousel";
import "firebase/firestore";
import "../scss/styles.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class IndexPage extends Component {
  state = {
    popular: [],
    upcoming: [],
    topRated: []
  };

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
        <Footer />
      </div>
    );
  }
}

const mapState = state => ({
  favorites: state.favoritesData.favorites
});

const mapDispatchToProps = dispatch => {
  return {
    getFavorites: (firestore, firebase) => {
      dispatch(getFavorites({ firestore, firebase }));
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
