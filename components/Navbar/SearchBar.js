import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Link from "next/link";
import { compose } from "redux";
import { useRouter } from "next/router";
import { TMDB_API_KEY } from "../../config";
import { Field, reduxForm } from "redux-form";

const SearchBar = ({ handleSubmit }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  const search = query => {
    if (query !== "") {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

      fetch(url)
        .then(res => res.json())
        .then(searchResults => {
          searchResults = searchResults.results;
          setSearchResults(searchResults);
        });
    } else {
      setSearchResults(null);
    }
  };

  const node = useRef();
  useEffect(() => {
    search(searchTerm);
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = e => {
    if (node.current && node.current.contains(e.target)) {
      // inside click
      return;
    } else {
      setSearchResults(null);
      setSearchTerm("");
      return;
    }
  };

  const formSubmit = values => {
    router.push(`/results/${searchTerm}`);
  };

  return (
    <React.Fragment>
      <form
        className="search-form"
        ref={node}
        onSubmit={handleSubmit(formSubmit)}
        style={{
          height: "2.6em",
          display: "flex",
          alignItems: "center",
          border: "1px solid black",
          borderRadius: "2px",
          background: "white"
        }}
      >
        <div style={{ background: "white" }}>
          <SearchIcon className="search-icon" />
        </div>
        <Field
          name="Search"
          className="search-input"
          component="input"
          type="text"
          placeholder="Find a Movie..."
          autoComplete="off"
          value={searchTerm}
          onChange={handleChange}
          style={{ border: "none", height: "100%", paddingLeft: "0.4em" }}
        />
        <button
          type="submit"
          className="submit-btn"
          style={{
            height: "100%",
            width: "auto",
            border: "none",
            color: "white",
            background: "black",
            padding: "5px"
          }}
        >
          Search
        </button>
        {searchResults && (
          <div className="search-results">
            {searchResults.slice(0, 5).map(result => {
              const { id, title } = result;
              return (
                <Link
                  key={id}
                  as={`/details/${id}`}
                  href={`/filmDetails?id=${id}`}
                >
                  <div className="single-result"> {title}</div>
                </Link>
              );
            })}
          </div>
        )}
      </form>
    </React.Fragment>
  );
};

export default compose(
  reduxForm({
    form: "SearchForm"
  })
)(SearchBar);
