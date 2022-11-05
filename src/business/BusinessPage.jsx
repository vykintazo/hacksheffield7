import Dashboard from "./Dashboard";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";

export default function BusinessPage({ prop1 }) {

    return (
        <>
            <div><Dashboard/></div>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            >
                <Button variant="contained" sx={{alignText: "center", marginTop: "15px"}}>Add New</Button>
            </Box>
        </>
    )
}