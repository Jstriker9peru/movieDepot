import React, { Component } from 'react'
import Navbar from '../components/Navbar/Navbar';
import ListPage from '../components/ListPage/ListPage';

class Upcoming extends Component {
    state = {
        upcoming: [],
        currentPage: 0
    }

    componentDidMount() {
        if (localStorage.getItem('UpcomingState')) {
            const state = JSON.parse(localStorage.getItem('UpcomingState'));
            this.setState({ ...state });
        } else {
            const endpoint = "https://api.themoviedb.org/3/movie/upcoming?api_key=6db3cd67e35336927891a72c05c595cc&language=en-US&page=1";
            this.getUpcoming(endpoint);
        }
    }

    getUpcoming = (endpoint) => {
        fetch(endpoint)
          .then(res => res.json())
          .then(upcomingMovies => {
            let upcoming = upcomingMovies.results;
            let currentPage = upcomingMovies.page;
            this.setState(prevState => ({ upcoming: [...prevState.upcoming, ...upcoming], currentPage }), () => { localStorage.setItem('UpcomingState' , JSON.stringify(this.state)); });
          });
    };

    loadMoreUpcoming = () => {
        let endpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=6db3cd67e35336927891a72c05c595cc&language=en-US&page=${this.state.currentPage + 1}`;
        this.getUpcoming(endpoint);
    }

    render() {
        return (
            <div className="list-page">
                <Navbar />
                <ListPage list={this.state.upcoming} loadMore={this.loadMoreUpcoming} />
            </div>
        )
    }
}

export default Upcoming;
