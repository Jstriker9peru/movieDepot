import React, { Component } from "react";
import { withRouter } from "next/router";
import { TMDB_API_KEY } from "../config";
import Footer from '../components/Footer/Footer';
import Navbar from "../components/Navbar/Navbar";
import ListPage from "../components/ListPage/ListPage";
import LoadingPage from "../components/LoadingPage/LoadingPage";

class Results extends Component {
  state = {
    results: [],
    loading: true,
    disabled: false,
    currentPage: 0,
    resultNumber: 0
  };

  componentDidMount() {
    const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${
      this.props.router.query.query
    }&page=1&include_adult=false`;
    this.getResults(endpoint);
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props.router.query;
    if (prevProps.router.query.query !== query) {
      this.setState({
        results: [],
        loading: true,
        disabled: false,
        currentPage: 0,
        resultNumber: 0
      });
      let endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
      this.getResults(endpoint);
    }
  }

  getResults = endpoint => {
    fetch(endpoint)
      .then(res => res.json())
      .then(results => {
        let queryResults = results.results;
        if (queryResults) {
          let disabled = false;
          if (queryResults.length < 20) {
            disabled = true;
          }
          let currentPage = results.page;
          let resultNumber = results["total_results"];
          this.setState(
            prevState => ({
              results: [...prevState.results, ...queryResults],
              currentPage,
              resultNumber,
              loading: false,
              disabled
            }),
            () => {
              sessionStorage.setItem(
                "QueryResults",
                JSON.stringify(this.state)
              );
            }
          );
        }
      });
  };

  loadMoreResults = () => {
    let endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${
      this.props.router.query.query
    }&page=${this.state.currentPage + 1}&include_adult=false`;
    this.getResults(endpoint);
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
              name="Results"
              isDisabled={this.state.disabled}
              list={this.state.results}
              loadMore={this.loadMoreResults}
              resultNumber={this.state.resultNumber}
            />
            <Footer />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Results);
