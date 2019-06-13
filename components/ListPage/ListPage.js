import React, { Component } from 'react';
import { withRouter } from "next/router";
import Link from 'next/link';
import Card from "@material-ui/core/Card";
import { Button } from "@material-ui/core";
import SinglePosterCard from '../SinglePosterCard/SinglePosterCard';
import './ListPage.scss';

class ListPage extends Component {  
    render() {
        const { list, loadMore } = this.props;
        return (
            <div className="list-page-body">
                <div className="list-container">
                    {list && list.map((movie, index) => {
                        const { poster_path, original_titles, id } = movie;
                        return (
                            <SinglePosterCard key={index} id={id} poster_path={poster_path} original_title={original_title} />
                        )    
                    })}
                </div>
                <Button variant="contained" color="secondary" onClick={loadMore} >
                    See More Popular
                </Button>
            </div>
        )
    }
}

export default withRouter(ListPage);
