import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {useFirebaseApp, useFirestore, useFirestoreCollectionData, useFirestoreDocData, useSigninCheck} from 'reactfire';
import {collection, deleteDoc, doc, query} from "firebase/firestore";
import {Box, Button, CircularProgress, IconButton} from '@mui/material';
import {format} from "date-fns";
import DeleteIcon from '@mui/icons-material/Delete';
import {getAuth} from "firebase/auth";
import {useEffect, useState} from 'react';
import Countdown from './Countdown';

export default function BasicTable() {
    const firestore = useFirestore();
    const offerCollection = collection(firestore, 'offers');
    const offersQuery = query(offerCollection);

    const {status, data} = useFirestoreCollectionData(offersQuery, {
        idField: 'id', // this field will be added to the object created from each document
    });

    const authInstance = getAuth(useFirebaseApp());

    const deleteOffer = async (id) => {
        console.log(id);
        await deleteDoc(doc(firestore, "offers", id));
    }

    const db = useFirestore();
    const {data: signInCheckResult} = useSigninCheck();

    const docRef = doc(db, 'users', signInCheckResult?.user?.uid);
    const response = useFirestoreDocData(docRef);

    const [companyName, setCompanyName] = useState(<CircularProgress/>);

    const [countdownChange, setCountDownChange] = useState({});

    useEffect(() => {
        response?.data && setCompanyName(response?.data?.business?.name);
    }, [response?.data]);

    return (
        <><Button onClick={() => authInstance.signOut()} variant="contained"
                  sx={{backgroundColor: "red", position: "absolute", top: 20, right: 20}}>Log Out</Button>
            {status === "loading" &&
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    width: "100vw"
                }}>
                    <CircularProgress/>
                </Box>}
            {status !== "loading" &&
                <><Typography component="h1" variant="h3"
                              sx={{textAlign: 'center', margin: "30px 0"}}>{companyName}</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{
                            width: '80vw',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                               aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Offer Name</TableCell>
                                    <TableCell align="right">Start Time</TableCell>
                                    <TableCell align="right">End Time</TableCell>
                                    <TableCell align="right">Discount Amount</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Time remaining</TableCell>
                                    <TableCell align="right">Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {status === 'loading' ? <CircularProgress/> : data.map((offer) => (
                                    <TableRow
                                        key={offer.id}
                                        sx={{backgroundColor: countdownChange[offer.id] <= 0 ? "lightgray": "inherit"}}>
                                        <TableCell align="right">{offer.offerName}</TableCell>
                                        <TableCell
                                            align="right">{(format((offer.start?.toDate()), "yyyy-MM-dd HH:mm"))}</TableCell>
                                        <TableCell
                                            align="right">{(format((offer.end?.toDate()), "yyyy-MM-dd HH:mm"))}</TableCell>
                                        <TableCell align="right">{offer.discount}</TableCell>
                                        <TableCell align="right">{offer.description}</TableCell>
                                        <TableCell align="right">
                                            <Countdown
                                                targetDate={offer.end?.toDate()}
                                                onCountdownChange={(change) => {
                                                    setCountDownChange((prev) => ({
                                                        ...prev,
                                                        [offer.id]: change
                                                    }))
                                                }}/>
                                        </TableCell>
                                        <TableCell align="right"><IconButton aria-label="delete" onClick={() => {
                                            deleteOffer(offer.id)
                                        }}><DeleteIcon/></IconButton></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer></>
            }</>
    );
}
