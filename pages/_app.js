import React from "react";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import { myFirebase } from "../lib/db";
import App, { Container } from "next/app";
import { createFirestoreInstance } from "redux-firestore";
import { configureStore } from "../modules/utils/configureStore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

const myStore = configureStore();

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
  firebaseStateName: "firebase"
};

const rrfProps = {
  firebase: myFirebase,
  config: rrfConfig,
  dispatch: myStore.dispatch,
  createFirestoreInstance
};

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  renderHead() {
    return (
      <Head>
        <title>MovieInfo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
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

export default MyApp;
