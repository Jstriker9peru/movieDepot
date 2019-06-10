import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import FilmDetails from '../components/FilmDetails/FilmDetails';


class filmDetails extends Component {
    state = {
        info: [],
        actors: [],
        directors: [] 
    }

    componentDidMount() {
        const { id } = this.props.router.query;
        console.log(id);
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=6db3cd67e35336927891a72c05c595cc&language=en-US`
          )
            .then(res => res.json())
            .then(info => {
              this.setState({ info }, () => {
                fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=6db3cd67e35336927891a72c05c595cc`)
                .then(result => result.json())
                .then(result => {
                    const directors = result.crew.filter(member => member.job === "Director");

                    this.setState({
                        actors: result.cast,
                        directors,
                    })
                })
              });
            });
    }

    render() {
        const { info, actors, directors } = this.state;
        return (
            <div>
                <h1>Hello this is what this is</h1>
                <p>This is for the description of the film</p>
                <FilmDetails info={info} actors={actors} directors={directors} />
            </div>
        )
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
