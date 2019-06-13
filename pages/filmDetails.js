import React, { Component } from "react";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import Navbar from "../components/Navbar/Navbar";
import FilmDetails from "../components/FilmDetails/FilmDetails";

class filmDetails extends Component {
  state = {
    info: [],
    actors: [],
    similar: [],
    directors: [],
    genres: []
  };

  fetchMovieData(id) {
    try {
      Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=6db3cd67e35336927891a72c05c595cc&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=6db3cd67e35336927891a72c05c595cc`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=6db3cd67e35336927891a72c05c595cc&language=en-US&page=1`
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
    console.log('Film Details has updated');
  }

  render() {
    const { info, actors, similar, directors, genres } = this.state;
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
        />
      </div>
    );
  }
}

// const mapState = state => ({
//     title: state.filmDetails._source.original_title
// })

export default withRouter(filmDetails);
//     connect(null)()
//     // async (req, { dispatch }) => {
//     //  const filmDetails = dispatch(fetchfilmDetails(get(req, 'query.id')));
//     //  await Promise.all([product]);
//     // },
// );
