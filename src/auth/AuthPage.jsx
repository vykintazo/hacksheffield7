import React from "react";
import StyledFirebaseAuth from "./StyledFirebaseAuth";
import { getAuth } from "firebase/auth";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useFirebaseApp } from "reactfire";

// // compat SDK needed for FirebaseUI
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

export default function AuthPage() {


    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                console.log(authResult);
                return false;
            },
            uiShown: function () {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        // signInFlow: 'popup',
        // signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            GoogleAuthProvider.PROVIDER_ID,
            //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
            EmailAuthProvider.PROVIDER_ID,
            //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: 'https://www.google.com/',
        // Privacy policy url.
        privacyPolicyUrl: 'https://www.google.com/'
    };

    return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth(useFirebaseApp())} className="login-container" />
    );
}
