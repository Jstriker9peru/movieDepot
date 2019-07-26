import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <section className="footer-section">
      <div className="content">
        <p>Movie data powered by</p>
        <img className="TMDB-logo" alt="TMDB Logo" src="/static/TMDBLogo.svg" />
      </div>
    </section>
  );
};

export default Footer;
