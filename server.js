import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/styles';
import MyApp from './pages/_app';

  function renderFullPage(html, css) {
      return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>My page</title>
          <style id="jss-server-side">${css}</style>
        </head>
        <body>
          <div id="root">${html}</div>
        </body>
      </html>
    `;
  }
  
  function handleRender(req, res) {
    const sheets = new ServerStyleSheets();

    const html = ReactDOMServer.renderToString(
      sheets.collect(
        <MyApp />
      )
    )

    const css = sheets.toString();

    res.send(renderFullPage(html, css))
  }
  
  const app = express();

  app.use('/build', express.static('build'))
  
  // This is fired every time the server-side receives a request.
  app.use(handleRender);
  
  const port = 3000;
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });