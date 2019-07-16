import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import FavoritesPage from "../components/FavoritesPage/FavoritesPage";

class Favorites extends Component {
  state = {
    loading: false
  };

  render() {
    const { loading } = this.state;
    return (
      <React.Fragment>
        {loading ? (
          <LoadingPage />
        ) : (
          <div>
            <Navbar />
            <FavoritesPage />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Favorites;
