import React, { Component } from "react";
import { TMDB_API_KEY } from "../config";
import Footer from '../components/Footer/Footer';
import Navbar from "../components/Navbar/Navbar";
import ListPage from "../components/ListPage/ListPage";
import LoadingPage from "../components/LoadingPage/LoadingPage";

class Popular extends Component {
  state = {
    popular: [],
    currentPage: 0,
    loading: true,
    disabled: false
  };

  componentDidMount() {
    if (sessionStorage.getItem("PopularState")) {
      const state = JSON.parse(sessionStorage.getItem("PopularState"));
      this.setState({ ...state });
    } else {
      const endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
      this.getPopular(endpoint);
    }
  }

  getPopular = endpoint => {
    fetch(endpoint)
      .then(res => res.json())
      .then(popularMovies => {
        let popular = popularMovies.results;
        let disabled = false;
        if (popular.length === 0) {
          disabled = true;
        }
        let currentPage = popularMovies.page;
        this.setState(
          prevState => ({
            popular: [...prevState.popular, ...popular],
            currentPage,
            loading: false,
            disabled
          }),
          () => {
            sessionStorage.setItem("PopularState", JSON.stringify(this.state));
          }
        );
      });
  };

  loadMorePopular = () => {
    let endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${this
      .state.currentPage + 1}`;
    this.getPopular(endpoint);
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
              list={this.state.popular}
              loadMore={this.loadMorePopular}
              name="Popular"
            />
            <Footer />
          </div>
        )}
      </div>
    );
  }
}

export default Popular;
