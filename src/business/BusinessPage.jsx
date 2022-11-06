import { useState, useEffect } from 'react';
import Dashboard from "./Dashboard";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import OfferForm from "./OfferForm";
import { useSigninCheck, useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function BusinessPage() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const db = useFirestore();
    const { data: signInCheckResult } = useSigninCheck();

    const docRef = doc(db, 'users', signInCheckResult?.user?.uid);
    const response = useFirestoreDocData(docRef);

    const navigateTo = useNavigate();
    useEffect(() => {
        response?.data?.userRole === "customer" && navigateTo("/customer");
        response?.data?.business === undefined && navigateTo("/form");
    }, [response?.data]);

    return (
        <>
            <div><Dashboard /></div>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Button variant="contained" sx={{ alignText: "center", marginTop: "15px" }} onClick={handleClickOpen}>Add New</Button>
            </Box>
            <OfferForm open={open} onClose={handleClose} />
        </>
    )
}