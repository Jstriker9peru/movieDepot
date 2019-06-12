import React, { Component } from 'react';
import Link from 'next/link';
import Card from "@material-ui/core/Card";
import Button from '@material-ui/core/Button';
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
        console.log(linkTitle);
        return (
            <section className="category-section">
                <h1>{title} Films</h1>
                <div className="card-container">
                    {results &&
                    results.map(movie => {
                        const { poster_path, original_title, id } = movie;
                        return (
                            <Link key={id} href={`/filmDetails?id=${id}`} as={`/filmDetails/${id}`}>    
                                <Card className="card">
                                    <img
                                    className="card-poster-single"
                                    src={`http://image.tmdb.org/t/p/w500${poster_path}`}
                                    alt={`${original_title} Poster`}
                                    />
                                </Card>
                            </Link>
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
