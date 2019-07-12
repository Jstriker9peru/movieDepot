import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { compose } from 'redux';
import withRedux from "next-redux-wrapper";
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider, firebaseConnect } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import CssBaseline from "@material-ui/core/CssBaseline";
import { configureStore } from "../modules/utils/configureStore";
import { myFirebase } from '../lib/db';

const myStore = configureStore();

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
  firebaseStateName: 'firebase'
  // updateProfileOnLogin: false
};

const rrfProps = {
  firebase: myFirebase,
  config: rrfConfig,
  dispatch: myStore.dispatch,
  createFirestoreInstance
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      console.log('hello ssr');
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  componentWillUnmount() {
    console.log('_app unmounting');
  }


  renderHead() {
    return (
      <Head>n
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"></link>
      </Head>
    );
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={myStore}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            {this.renderHead()}
            <CssBaseline />
            <Component {...pageProps} />
          </ReactReduxFirebaseProvider>
        </Provider>
      </Container>
    );
  }
}

export default MyApp