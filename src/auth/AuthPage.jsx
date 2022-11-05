import React, { useState } from "react";
import StyledFirebaseAuth from "./StyledFirebaseAuth";
import { getAuth } from "firebase/auth";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useFirebaseApp, useFirestore, useSigninCheck } from "reactfire";
import { Box, CircularProgress, Typography } from "@mui/material";
// import { doc, setDoc } from "firebase/firestore";
import { Navigate } from 'react-router-dom';

// // compat SDK needed for FirebaseUI
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

export default function AuthPage() {
    // const db = useFirestore();

    const [loaded, setLoaded] = useState(false);

    const { status, data: signInCheckResult } = useSigninCheck();

    const uiConfig = {
        callbacks: {
            // signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            //     // console.log("test");
            //     // (async () => {
            //     //     await setDoc(doc(db, "users", authResult.user.uid), {
            //     //         displayName: authResult.user.displayName,
            //     //         email: authResult.user.email,
            //     //         uid: authResult.user.uid,
            //     //         userRoleAssigned: false
            //     //     });


            //     // })();
            //     // console.log(authResult);
            //     return false;
            // },
            uiShown: function () {
                // The widget is rendered.
                // Hide the loader.
                setLoaded(true);
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        // signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
            EmailAuthProvider.PROVIDER_ID,
            // Leave the lines as is for the providers you want to offer your users.
            GoogleAuthProvider.PROVIDER_ID,
            //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
            //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: 'https://www.google.com/',
        // Privacy policy url.
        privacyPolicyUrl: 'https://www.google.com/'
    };

    return (<Box sx={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <Box sx={{ height: "10vh" }}>
            <Typography variant="h5" component="h1">Welcome to DiscountMapper!</Typography>
        </Box>
        {loaded || <CircularProgress />}
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth(useFirebaseApp())} />
        {signInCheckResult?.signedIn && <Navigate to="/" replace={true} />}
    </Box>
    );
}
