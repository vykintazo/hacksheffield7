import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import BusinessPage from "./business/BusinessPage.jsx";
import AuthPage from "./auth/AuthPage.jsx";
import CustomerPage from "./customer/CustomerPage.jsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CssBaseline } from "@mui/material";
import { FirebaseAppProvider, FirestoreProvider, useFirebaseApp, AuthProvider, useSigninCheck } from "reactfire";
import { firebaseConfig } from "../firebaseConfig.js";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import 'mapbox-gl/dist/mapbox-gl.css';

import SignInChecker from "./SignInChecker"
import InitialForm from './InitialForm';
import Form from "./Form";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <SignInChecker />,
            errorElement: <Navigate to="/auth" replace={true} />
        },
        {
            path: "/initial-form",
            element: <InitialForm />,
            errorElement: <Navigate to="/" replace={true} />
        },
        {
            path: "/form",
            element: <Form />,
            errorElement: <Navigate to="/" replace={true} />
        },
        {
            path: "/customer",
            element: <CustomerPage />,
            errorElement: <Navigate to="/" replace={true} />
        },
        {
            path: "/business",
            element: <BusinessPage />,
            errorElement: <Navigate to="/" replace={true} />
        },
        {
            path: "/auth",
            element: <AuthPage />,
            errorElement: <Navigate to="/" replace={true} />
        },
        {
            path: "*",
            element: <Navigate to="/" replace={true} />
        }
    ]);

    const firebaseApp = useFirebaseApp()
    const auth = getAuth(firebaseApp);
    const firestoreInstance = getFirestore(firebaseApp);

    return (
        <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CssBaseline />
                    <RouterProvider router={router} />
                </LocalizationProvider>
            </FirestoreProvider>
        </AuthProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <App />
        </FirebaseAppProvider>
    </React.StrictMode>
);
