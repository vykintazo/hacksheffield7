import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useSigninCheck, useFirestore, useFirestoreDocData, useFirebaseApp } from "reactfire";
import { useNavigate } from "react-router-dom";


export default () => {
    const db = useFirestore();
    const { data: signInCheckResult } = useSigninCheck();

    const navigateTo = useNavigate();
    signInCheckResult?.signedIn === false && navigateTo("/auth");

    const authInstance = getAuth(useFirebaseApp());

    const docRef = doc(db, 'users', signInCheckResult?.user?.uid);
    const response = useFirestoreDocData(docRef);

    const [displayUserRoleSelection, setDisplayUserRoleSelection] = useState(false);

    useEffect(() => {
        if (!displayUserRoleSelection && !(response?.status === "loading") && !response?.data) {
            (async () => {
                await setDoc(doc(db, "users", signInCheckResult.user.uid), {
                    displayName: signInCheckResult.user.displayName,
                    email: signInCheckResult.user.email,
                    uid: signInCheckResult.user.uid,
                    userRole: false
                });

                setDisplayUserRoleSelection(true);
            })();
        }

        if (!(response?.status === "loading") && response?.data?.userRole === false) {
            setDisplayUserRoleSelection(true);
        }

        if (!(response?.status === "loading") && response?.data?.userRole !== false) {
            navigateTo("/form");
        }
    }, [response?.status, response?.data]);

    const handleCustomer = async () => {
        await updateDoc(doc(db, "users", signInCheckResult.user.uid), {
            userRole: "customer"
        });

        navigateTo("/form");
    }

    const handleBusiness = async () => {
        await updateDoc(doc(db, "users", signInCheckResult.user.uid), {
            userRole: "business"
        });

        navigateTo("/form");
    }

    return <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw", padding: "50px" }}>
        <Button onClick={() => authInstance.signOut()} variant="contained" sx={{ backgroundColor: "red", position: "absolute", top: 20, right: 20 }}>Log Out</Button>
        {!displayUserRoleSelection ? <CircularProgress /> : <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Typography sx={{ marginBottom: "60px" }} component="h1" variant="h3">Who do you want to be?</Typography>
            <Button sx={{ marginBottom: "20px" }} variant="contained" onClick={handleCustomer}>
                Customer
            </Button>
            <Button variant="contained" onClick={handleBusiness}>
                Business
            </Button>
        </Box>
        }
    </Box >
}