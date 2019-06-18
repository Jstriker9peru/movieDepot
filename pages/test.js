import React, { Component } from 'react';
import SignInModal from '../components/SignIn/SignInModal';
import SignUpModal from '../components/SignUp/SignUpModal';
import TestPage from '../components/Test/Test';

class Test extends Component {
    render() {
        return (
            <div>
                {/* <SignInModal /> */}
                <SignUpModal />
                {/* <TestPage /> */}
            </div>
        )
    }
}

export default Test;
