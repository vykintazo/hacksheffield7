import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { collection, query, doc, deleteDoc } from "firebase/firestore";
import { CircularProgress } from '@mui/material';
import { format } from "date-fns";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BasicTable() {
    // [DEBUG] log the data
    //   useEffect(() => {
    //     console.log(data);
    //   }), [data];

    const firestore = useFirestore();
    const offerCollection = collection(firestore, 'offers');
    const offersQuery = query(offerCollection);

    const { status, data } = useFirestoreCollectionData(offersQuery, {
        idField: 'id', // this field will be added to the object created from each document
    });

    const deleteOffer = async (id) => {
        console.log(id);
        await deleteDoc(doc(firestore, "offers", id));
    }

    return (
        <>
            <Typography variant="h1" sx={{ textAlign: 'center' }}>Company Name </Typography>
            {status === 'loading' ? <CircularProgress /> :

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
                                <TableCell align="right">End TIme</TableCell>
                                <TableCell align="right">Discount Amount</TableCell>
                                <TableCell align="right">Number Available</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {status === 'loading' ? <CircularProgress /> : data.map((offer, i) => (
                                <TableRow
                                    key={i} >
                                    <TableCell align="right">{offer.offerName}</TableCell>
                                    <TableCell align="right">{(format((offer.start?.toDate()), "yyyy-MM-dd HH:mm"))}</TableCell>
                                    <TableCell align="right">{(format((offer.end?.toDate()), "yyyy-MM-dd HH:mm"))}</TableCell>
                                    <TableCell align="right">{offer.discount}</TableCell>
                                    <TableCell align="right">{offer.availability}</TableCell>
                                    <TableCell align="right">{offer.description}</TableCell>
                                    <TableCell align="right"><IconButton aria-label="delete" onClick={() => { deleteOffer(offer.id) }}><DeleteIcon /></IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}

        </>

    );
}