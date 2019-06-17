import React, { Component } from 'react';
import Link from 'next/link';
import Card from "@material-ui/core/Card";
import Button from '@material-ui/core/Button';
import SinglePosterCard from '../../SinglePosterCard/SinglePosterCard';
import './CardContainer.scss';

class CardContainer extends Component {

    componentDidMount() {
        this.props.getResults();
    }

    render() {
        const { title, results } = this.props;
        let linkTitle = title.toLowerCase();
        if (linkTitle === 'top rated') {
            linkTitle = 'toprated'
        }
        return (
            <section className="category-section">
                <h1>{title} Films</h1>
                <div className="card-container">
                    {results &&
                    results.map(movie => {
                        const { poster_path, original_title, id } = movie;
                        return (
                            <SinglePosterCard movieInfo={movie} key={id} id={id} poster_path={poster_path} original_title={original_title} />
                        );
                    })}
                </div>
                <Link href={`/${linkTitle}`} as={`/${linkTitle}`}>
                    <Button variant="contained" color="secondary" >
                        See All {title}
                    </Button>
                </Link>
            </section>
        )
    }
}

export default CardContainer;
