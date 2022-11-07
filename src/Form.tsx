import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useSigninCheck, useFirestore, useFirestoreDocData, useFirebaseApp } from "reactfire";
import { useNavigate, Navigate } from "react-router-dom";
import BusinessForm from "./forms/BusinessForm";


export default () => {
    const db = useFirestore();
    const { data: signInCheckResult } = useSigninCheck();

    const navigateTo = useNavigate();
    signInCheckResult?.signedIn === false && navigateTo("/auth");

    const authInstance = getAuth(useFirebaseApp());

    const docRef = doc(db, 'users', signInCheckResult?.user?.uid);
    const response = useFirestoreDocData(docRef);

    const [userType, setUserType] = useState(false);

    useEffect(() => {
        if (userType === false) {
            if (response?.data?.userRole === "customer") {
                navigateTo("/customer");
            } else if (response?.data?.userRole === "business") {
                setUserType("business");
            } else if (response?.data?.userRole === false) {
                navigateTo("/inital-form");
            }
        }
    }, [response?.data?.userRole]);


    return <Box sx={{ display: "flex", height: "100vh", width: "100vw", alignItems: "center", justifyContent: "center" }}>
        <Button onClick={() => authInstance.signOut()} variant="contained" sx={{ backgroundColor: "red", position: "absolute", top: 20, right: 20 }}>Log Out</Button>
        {userType === false && <CircularProgress />}
        {userType === "business" && <BusinessForm />}
    </Box>
}