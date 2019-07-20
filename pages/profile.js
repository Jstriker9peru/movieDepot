import React, { Component } from "react";
import Footer from '../components/Footer/Footer';
import Navbar from "../components/Navbar/Navbar";
import ProfilePage from "../components/ProfilePage/ProfilePage";

class Profile extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <ProfilePage />
        <Footer />
      </div>
    );
  }
}

export default Profile;
