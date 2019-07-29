import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <section className="footer-section">
      <div className="content">
        <div className="content-box">
          <div className="tmdb-tag">
            <p>Movie data powered by</p>
            <img className="TMDB-logo" alt="TMDB Logo" src="/static/TMDBLogo.svg" />
          </div>
          <div className="logo-tag">
            Logo made with{" "}
            <a
              href="https://www.designevo.com/en/"
              title="Free Online Logo Maker"
            >
              DesignEvo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
