import * as React from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import userManager from './userManager';
import { User, UserManager } from 'oidc-client';
import { push } from 'connected-react-router';
import { Dispatch } from 'redux';


interface CallbackPageProps {
    dispatch: Dispatch;
    signInParams: string;
}

const Callback = (props: CallbackPageProps) => {

    console.log('Render Callback');

    const successCallback = (user: User) => {
        // get the user's previous location, passed during signinRedirect()
        const redirectPath = user.state as string;
        console.log(redirectPath);
        props.dispatch(push('/flashcards'));
    };

    const errorCallback = (error: Error) => {
        console.log(error);
        props.dispatch(push('/'));
    };

    // by default userManager gets params from the current route
    // eg. 'localhost:5100/callback#token_id=...&session_state=...
    //                              ------------------------------
    // this doesn't work when using hash history as the first hash messed up the process
    // eg. 'localhost:5100/#/callback#token_id=...&session_state=...
    // need to pass the token manually to signinRedirectCallback function
    useEffect(() => {
        new UserManager({ response_mode: "query" })
            .signinRedirectCallback()
            .then(user => successCallback(user))
            .catch(error => errorCallback(error));
    });

    return <div>Loading...</div>;
};

export default connect()(Callback);
