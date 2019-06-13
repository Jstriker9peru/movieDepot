import React, { Component } from 'react'
import Navbar from '../components/Navbar/Navbar';
import ListPage from '../components/ListPage/ListPage';

class TopRated extends Component {
    state = {
        topRated: [],
        currentPage: 0
    }

    componentDidMount() {
        if (localStorage.getItem('TopRatedState')) {
            const state = JSON.parse(localStorage.getItem('TopRatedState'));
            this.setState({ ...state });
        } else {
            const endpoint = "https://api.themoviedb.org/3/movie/top_rated?api_key=6db3cd67e35336927891a72c05c595cc&language=en-US&page=1";
            this.getTopRated(endpoint);
        }
    }

    getTopRated = (endpoint) => {
        fetch(endpoint)
          .then(res => res.json())
          .then(topRatedMovies => {
            let topRated = topRatedMovies.results;
            let currentPage = topRatedMovies.page;

            this.setState(prevState => ({ topRated: [...prevState.topRated, ...topRated], currentPage }), () => { localStorage.setItem('TopRatedState' , JSON.stringify(this.state)); });
          });
    };

    loadMoreTopRated = () => {
        let endpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=6db3cd67e35336927891a72c05c595cc&language=en-US&page=${this.state.currentPage + 1}`;
        this.getTopRated(endpoint);
    }

    render() {
        return (
            <div className="list-page">
                <Navbar />
                <ListPage list={this.state.topRated} loadMore={this.loadMoreTopRated} />
            </div>
        )
    }
}

export default TopRated;