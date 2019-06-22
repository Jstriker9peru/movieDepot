import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import withRedux from "next-redux-wrapper";
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import CssBaseline from "@material-ui/core/CssBaseline";
import { configureStore } from "../modules/utils/configureStore";
// import firebase from 'firebase/app';
// import 'firebase/auth';
import { myFirebase } from '../lib/db';

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  // updateProfileOnLogin: false
};

const rrfProps = {
  firebase: myFirebase,
  config: rrfConfig,
  dispatch: configureStore().dispatch,
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
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
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

export default withRedux(configureStore)(MyApp)