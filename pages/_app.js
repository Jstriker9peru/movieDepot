import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import withRedux from "next-redux-wrapper";
import { initStore } from '../modules/utils/store';
import { Provider } from 'react-redux';
import CssBaseline from "@material-ui/core/CssBaseline";

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
       <link rel="stylesheet" href="carousel.css"/>
      </Head>
    );
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          {this.renderHead()}
          <CssBaseline />
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp)