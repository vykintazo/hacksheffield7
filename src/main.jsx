import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BusinessPage from "./business/BusinessPage.jsx";
import AuthPage from "./auth/AuthPage.jsx";
import CustomerPage from "./customer/CustomerPage.jsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CssBaseline } from "@mui/material";
import { FirebaseAppProvider, FirestoreProvider, useFirebaseApp, AuthProvider } from "reactfire";
import { firebaseConfig } from "../firebaseConfig.js";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!</div>,
    },
    {
        path: "/customer",
        element: <CustomerPage />,
    },
    {
        path: "/business",
        element: <BusinessPage />,
    },
    {
        path: "/auth",
        element: <AuthPage />,
    },
]);

function App() {
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
