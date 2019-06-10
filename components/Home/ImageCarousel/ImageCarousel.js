import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import HeroImage from "./HeroImage";

class ImageCarousel extends Component {    
  constructor(props) {
      super(props);
      this.carouselRef = React.createRef();
  }

  state = {
    newMovies: [],
    hovered: false
  };

  componentDidMount() {
    fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=6db3cd67e35336927891a72c05c595cc&language=en-US&page=1"
        )
        .then(res => res.json())
        .then(newMovies => {
            newMovies = newMovies.results;
            this.setState({ newMovies });   
            this.carouselRef.current.autoPlay();
            console.log(this.carouselRef.current)
        });
  }

  render() {
    const { newMovies } = this.state;
    return (
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        useKeyboardArrows={true}
        stopOnHover={true}
        showThumbs={false}
        showStatus={false}
        interval={5000}
        width="100%"
        ref={this.carouselRef} 
      >
        {newMovies &&
          newMovies.map(movie => {
            return <HeroImage key={movie.id} movieInfo={movie} />;
          })}
      </Carousel>
    );
  }
}

export default ImageCarousel;
