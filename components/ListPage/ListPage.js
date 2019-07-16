import React, { Component } from "react";
import { withRouter } from "next/router";
import { Button } from "@material-ui/core";
import SinglePosterCard from "../SinglePosterCard/SinglePosterCard";
import "./ListPage.scss";

class ListPage extends Component {
  render() {
    const { list, loadMore, name, isDisabled, resultNumber } = this.props;
    return (
      <div className="list-page-body">
        <div className="page-title">
          <div className="ball" />
          <h1>
            {name === "Results"
              ? `${resultNumber} ${name} for "${this.props.router.query.query}"`
              : `${name} Films`}{" "}
          </h1>
          <div className="ball" />
        </div>

        <div className="list-container">
          {list &&
            list.map((movie, index) => {
              const { poster_path, title, id } = movie;
              return (
                <SinglePosterCard
                  key={index}
                  movieInfo={movie}
                  id={id}
                  poster_path={poster_path}
                  title={title}
                />
              );
            })}
        </div>
        <Button
          disabled={isDisabled}
          className="see-more-btn"
          variant="contained"
          color="secondary"
          onClick={loadMore}
        >
          See More {name}
        </Button>
      </div>
    );
  }
}

export default withRouter(ListPage);
