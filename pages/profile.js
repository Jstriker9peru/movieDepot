import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar";
import ProfilePage from "../components/ProfilePage/ProfilePage";

class Profile extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <ProfilePage />
      </div>
    );
  }
}

export default Profile;
