import React, { Component } from 'react'
import ProfilePage from '../components/ProfilePage/ProfilePage';
import Navbar from '../components/Navbar/Navbar';

class Profile extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <ProfilePage />
            </div>
        )
    }
}

export default Profile;
