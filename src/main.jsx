import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import BusinessPage from "./business/BusinessPage.jsx";
import AuthPage from "./auth/AuthPage.jsx";
import CustomerPage from "./customer/CustomerPage.jsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {CssBaseline} from "@mui/material";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!</div>,
    },
    {
        path: "/customer",
        element: <CustomerPage/>,
    },
    {
        path: "/business",
        element: <BusinessPage/>,
    },
    {
        path: "/auth",
        element: <AuthPage/>,
    },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CssBaseline />
        <RouterProvider router={router}/>
    </React.StrictMode>
)
