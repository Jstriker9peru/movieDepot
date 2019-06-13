import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
// import { withStyles } from "@material-ui/core/styles";
import {
  incrementCounter,
  decrementCounter
} from "../modules/actions/countActions";
// import { Button } from "@material-ui/core";
import Navbar from "../components/Navbar/Navbar";
import ImageCarousel from "../components/Home/ImageCarousel/ImageCarousel";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import CardContainer from "../components/Home/CardContainer/CardContainer";
import "../scss/styles.scss";
import { renderComponent } from "recompose";

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

  getPopular = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=6db3cd67e35336927891a72c05c595cc&language=en-US&page=1"
    )
      .then(res => res.json())
      .then(popularMovies => {
        let popular = popularMovies.results;
        this.setState({ popular });
      });
  };

  getUpcoming = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=6db3cd67e35336927891a72c05c595cc&language=en-US&page=1"
    )
      .then(res => res.json())
      .then(upcomingMovies => {
        let upcoming = upcomingMovies.results;
        this.setState({ upcoming });
      });
  };

  getTopRated = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=6db3cd67e35336927891a72c05c595cc&language=en-US&page=1"
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
      </div>
    );
  }
}

// IndexPage.propTypes = {
//   classes: PropTypes.object.isRequired
// };

const mapState = state => ({
  counter: state.fakeData.data
});

const mapDispatchToProps = dispatch => {
  return {
    incrementCounter: () => {
      dispatch(incrementCounter());
    },
    decrementCounter: () => {
      dispatch(decrementCounter());
    }
  };
};

export default compose(
  connect(
    mapState,
    mapDispatchToProps
  )
)(IndexPage);
