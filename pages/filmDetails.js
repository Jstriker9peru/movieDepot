import React, { Component } from "react";
import { withRouter } from "next/router";
import { TMDB_API_KEY } from "../config.js";
import Footer from '../components/Footer/Footer';
import Navbar from "../components/Navbar/Navbar";
import FilmDetails from "../components/FilmDetails/FilmDetails";

class filmDetails extends Component {
  state = {
    info: [],
    actors: [],
    similar: [],
    directors: [],
    genres: [],
    upcoming: []
  };

  fetchMovieData(id) {
    try {
      Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        )
      ])
        .then(results => Promise.all(results.map(result => result.json())))
        .then(([info, cast, similar]) => {
          const directors = cast.crew.filter(
            member => member.job === "Director"
          );

          this.setState({
            info,
            actors: cast.cast,
            similar: similar.results,
            directors,
            genres: info.genres
          }, () => {
            if (similar.results.length === 0) {
              fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=US`)
              .then(res => res.json())
              .then(upcomingMovies => {
                let upcoming = upcomingMovies.results;
                upcoming = upcoming.slice(0, 9);
                this.setState({
                  upcoming
                })
              })
            }
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    const { id } = this.props.router.query;
    this.fetchMovieData(id);
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.router.query;
    if (prevProps.router.query.id !== id) {
      this.fetchMovieData(id);
    }
  }

  render() {
    const { info, actors, similar, upcoming, directors, genres } = this.state;
    return (
      <div>
        <Navbar />
        <FilmDetails
          fetchData={this.fetchMovieData}
          info={info}
          actors={actors}
          similar={similar}
          directors={directors}
          genres={genres}
          upcoming={upcoming}
        />
        <Footer />
      </div>
    );
  }
}

export default withRouter(filmDetails);
