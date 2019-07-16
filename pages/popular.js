import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import ListPage from '../components/ListPage/ListPage';
import LoadingPage from '../components/LoadingPage/LoadingPage';
import { TMDB_API_KEY } from '../config';

class Popular extends Component {
    state = {
        popular: [],
        currentPage: 0,
        loading: true,
        disabled: false
    }

    componentDidMount() {
        if (sessionStorage.getItem('PopularState')) {
            const state = JSON.parse(sessionStorage.getItem('PopularState'));
            this.setState({ ...state });
        } else {
            const endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
            this.getPopular(endpoint);
        }
    }

    componentWillUnmount() {
        console.log('Popular Component Unmounted');
    }

    getPopular = (endpoint) => {
        fetch(endpoint)
          .then(res => res.json())
          .then(popularMovies => {
              console.log('This is popular', popularMovies)
            let popular = popularMovies.results;
            let disabled = false;
            if (popular.length === 0) {
                disabled = true
            }
            let currentPage = popularMovies.page;
            this.setState(prevState => ({ popular: [...prevState.popular, ...popular], currentPage, loading: false, disabled }), () => { sessionStorage.setItem('PopularState' , JSON.stringify(this.state)); });
          });
    };
    
    loadMorePopular = () => {
        let endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
        this.getPopular(endpoint);
    }

    render() {
        const { loading } = this.state;
        return (
            <div>
                {loading ? ( 
                    <LoadingPage />
                ) : (
                    <div className="list-page">
                        <Navbar />
                        <ListPage isDisabled={this.state.disabled} list={this.state.popular} loadMore={this.loadMorePopular} name="Popular" />
                    </div>
                )}
            </div>
        )
    }
}

export default Popular;