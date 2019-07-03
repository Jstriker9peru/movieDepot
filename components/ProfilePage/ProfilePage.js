import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import './ProfilePage.scss';

const ProfilePage = () => {
    return (
        <div className="profile-page-container">
            <div className="profile-page">
                <div className="title">
                    <Avatar className="profile-avatar" src="/static/courage.jpg" />
                    <h1 className="name">Jonathan's Profile</h1>
                    <style jsx>{`
                        Avatar.profile-avatar {
                            width: 3em;
                            height: 3em;
                            border: 1px solid black;
                            margin-right: 5px;
                        }
                    `}</style>
                </div>
                <form className="info-form" >
                    <h3>Basic Info</h3>
                    <TextField
                        className="textField"
                        variant="outlined"
                        required
                        fullWidth
                        id='firstName' 
                        label='First Name'
                        error={false}
                        type="text"
                    />
                    <TextField
                        className="textField"
                        variant="outlined"
                        required
                        fullWidth
                        id='lastName' 
                        label='Last Name'
                        error={false}
                        type="text"
                    />
                    <TextField
                        className="textField"
                        variant="outlined"
                        fullWidth
                        id='dateOfBirth'
                        label="Date Of Birth"
                        error={false}
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                    <TextField
                        autoComplete="country-name"
                        className="textField"
                        variant="outlined"
                        fullWidth
                        id='country' 
                        label='Country'
                        error={false}
                        type="text"
                    />
                    <Button 
                        disabled={true}
                        type="submit"
                        variant="contained"
                        color="primary" 
                    >
                        Submit
                    </Button>
                </form>
                <div>
                    <h3>My Images</h3>
                    <div>
                        <div>Choose a photo</div>

                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        
    }
}

export default connect(mapStateToProps, null)(ProfilePage);
