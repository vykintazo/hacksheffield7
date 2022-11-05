import { useState } from 'react';
import Dashboard from "./Dashboard";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import OfferForm from "./OfferForm";

export default function BusinessPage({ prop1 }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
    return (
        <>
            <div><Dashboard/></div>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            >
                <Button variant="contained" sx={{alignText: "center", marginTop: "15px"}} onClick={handleClickOpen}>Add New</Button>
            </Box>
            <OfferForm open={open} onClose={handleClose}/>
        </>
    )
}