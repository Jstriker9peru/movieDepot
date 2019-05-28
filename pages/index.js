import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { incrementCounter, decrementCounter } from '../modules/actions/countActions';
import { Button } from '@material-ui/core';
import Navbar from '../components/Navbar/Navbar';
import '../styles.scss';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function IndexPage(props) {
  const { counter, incrementCounter, decrementCounter } = props;
  return (
    <div>
      <Navbar />
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-image">
            <img src="https://image.tmdb.org/t/p/w500/vOipe2myi26UDwP978hsYOrnUWC.jpg" alt="The Jungle Book"></img>
          </div>
          <div className="hero-info">
            <h1>The Jungle Book</h1>
            <h3>2016 | Family, Adventure, Drama, Fantasy</h3>
            <p>After a threat from the tiger Shere Khan forces him to flee the jungle, a man-cub named Mowgli embarks on a journey of self discovery with the help of panther, Bagheera, and free spirited bear, Baloo.</p>
            <div className="buttons-container">
              <Button className="button1" variant="contained" color="secondary">Buy Now</Button>
              <Button className="button2" variant="contained" color="primary">Add to Favorites</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="popular">
        <h1>Most Popular</h1>
      </section>
    </div>
  );
}

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapState = state => ({
  counter: state.fakeData.data,
})

const mapDispatchToProps = (dispatch) => {
  return {
    incrementCounter: () => { dispatch(incrementCounter()) },
    decrementCounter: () => { dispatch(decrementCounter()) }
  }
}

export default compose(
  connect(mapState, mapDispatchToProps),
  withStyles(styles)
  )(IndexPage);