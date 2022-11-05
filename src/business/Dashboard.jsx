import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { collection, query } from "firebase/firestore"; 
import { CircularProgress } from '@mui/material';

export default function BasicTable() {

    const firestore = useFirestore();
    const offerCollection = collection(firestore, 'offers');
    const offersQuery = query(offerCollection);

    const { status, data } = useFirestoreCollectionData(offersQuery, {
        idField: 'id', // this field will be added to the object created from each document
      });

      return (
        <>
            <Typography variant="h1" sx={{textAlign: 'center'}}>Company Name</Typography>;
            { status === 'loading' ? <CircularProgress/> : 

            <TableContainer component={Paper}>
                <Table sx={{
                        width: '80vw',
                        marginLeft: 'auto',
                        marginRight: 'auto' }}
                        aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">offerName</TableCell>
                        <TableCell align="right">startTime</TableCell>
                        <TableCell align="right">endTime</TableCell>
                        <TableCell align="right">discountAmount</TableCell>
                        <TableCell align="right">numAvailable</TableCell>
                        <TableCell align="right">description</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {status ==='loading' ? <CircularProgress /> : data.map((offer, i) => (
                        <TableRow
                        key={i} >
                            <TableCell align="right">{offer.offerName}</TableCell>

                            <TableCell align="right">{(Date(offer.startTime?.seconds))}</TableCell>
                            <TableCell align="right">{(Date(offer.endTime?.seconds))}</TableCell>
  
                            <TableCell align="right">{offer.discountAmount}</TableCell>
                            <TableCell align="right">{offer.numAvailable}</TableCell>
                            <TableCell align="right">{offer.description}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>}

        </>
    
      );
}