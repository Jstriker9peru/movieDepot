import React, { Component } from "react";
import { TMDB_API_KEY } from "../config";
import Footer from '../components/Footer/Footer';
import Navbar from "../components/Navbar/Navbar";
import ListPage from "../components/ListPage/ListPage";
import LoadingPage from "../components/LoadingPage/LoadingPage";

class TopRated extends Component {
  state = {
    topRated: [],
    currentPage: 0,
    loading: true,
    disabled: false
  };

  componentDidMount() {
    if (sessionStorage.getItem("TopRatedState")) {
      const state = JSON.parse(sessionStorage.getItem("TopRatedState"));
      this.setState({ ...state });
    } else {
      const endpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
      this.getTopRated(endpoint);
    }
  }

  getTopRated = endpoint => {
    fetch(endpoint)
      .then(res => res.json())
      .then(topRatedMovies => {
        let topRated = topRatedMovies.results;
        let disabled = false;
        if (topRated.length === 0) {
          disabled = true;
        }
        let currentPage = topRatedMovies.page;

        this.setState(
          prevState => ({
            topRated: [...prevState.topRated, ...topRated],
            currentPage,
            loading: false,
            disabled
          }),
          () => {
            sessionStorage.setItem("TopRatedState", JSON.stringify(this.state));
          }
        );
      });
  };

  loadMoreTopRated = () => {
    let endpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${this
      .state.currentPage + 1}`;
    this.getTopRated(endpoint);
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="list-page">
            <Navbar />
            <ListPage
              isDisabled={this.state.disabled}
              list={this.state.topRated}
              loadMore={this.loadMoreTopRated}
              name="Top Rated"
            />
            <Footer />
          </div>
        )}
      </div>
    );
  }
}

export default TopRated;
