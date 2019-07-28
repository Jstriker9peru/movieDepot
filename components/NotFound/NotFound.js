import React from "react";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import "./NotFound.scss";

const NotFound = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1>Oops!</h1>
        <h3>Could not find the page you were looking for</h3>
        <Button
          className="return-btn"
          color="secondary"
          variant="contained"
          onClick={handleClick}
        >
          Return to home page
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
