import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { incrementCounter, decrementCounter } from '../modules/actions/countActions';
import { Button } from '@material-ui/core';
import Navbar from '../components/Navbar/Navbar';
import ImageCarousel from '../components/Home/ImageCarousel/ImageCarousel';
import '../scss/styles.scss';

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
        <ImageCarousel />
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