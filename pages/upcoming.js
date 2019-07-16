import React, { Component } from "react";
import { TMDB_API_KEY } from "../config";
import Navbar from "../components/Navbar/Navbar";
import ListPage from "../components/ListPage/ListPage";
import LoadingPage from "../components/LoadingPage/LoadingPage";

class Upcoming extends Component {
  state = {
    upcoming: [],
    currentPage: 0,
    loading: true,
    disabled: false
  };

  componentDidMount() {
    if (sessionStorage.getItem("UpcomingState")) {
      const state = JSON.parse(sessionStorage.getItem("UpcomingState"));
      this.setState({ ...state });
    } else {
      const endpoint = `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=US`;
      this.getUpcoming(endpoint);
    }
  }

  getUpcoming = endpoint => {
    fetch(endpoint)
      .then(res => res.json())
      .then(upcomingMovies => {
        let upcoming = upcomingMovies.results;
        let disabled = false;
        if (upcoming.length === 0) {
          disabled = true;
        }
        let currentPage = upcomingMovies.page;
        this.setState(
          prevState => ({
            upcoming: [...prevState.upcoming, ...upcoming],
            currentPage,
            loading: false,
            disabled
          }),
          () => {
            sessionStorage.setItem("UpcomingState", JSON.stringify(this.state));
          }
        );
      });
  };

  loadMoreUpcoming = () => {
    let endpoint = `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=${this
      .state.currentPage + 1}&region=US`;
    this.getUpcoming(endpoint);
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
              list={this.state.upcoming}
              loadMore={this.loadMoreUpcoming}
              name="Upcoming"
            />
          </div>
        )}
      </div>
    );
  }
}

export default Upcoming;
