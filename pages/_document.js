import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
            />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
             rel="stylesheet"></link>
            <link rel="stylesheet" href="carousel.css"/>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;