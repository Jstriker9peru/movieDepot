import React, { Component } from 'react';
import { withRouter } from "next/router";
import { Button } from "@material-ui/core";
import SinglePosterCard from '../SinglePosterCard/SinglePosterCard';
import './ListPage.scss';

class ListPage extends Component {  
    render() {
        const { list, loadMore, name } = this.props;
        return (
            <div className="list-page-body">
                <div className="list-container">
                    {list && list.map((movie, index) => {
                        const { poster_path, original_title, id } = movie;
                        return (
                            <SinglePosterCard key={index} movieInfo={movie} id={id} poster_path={poster_path} original_title={original_title} />
                        )
                    })}
                </div>
                <Button className="see-more-btn" variant="contained" color="secondary" onClick={loadMore} >
                    See More {name}
                </Button>
            </div>
        )
    }
}

export default withRouter(ListPage);
