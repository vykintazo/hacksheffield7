import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// Just add some dummy data
function createData(
  businessName,
  offerName,
  offerType,
  startTime,
  endTime,
  amount,
  numAvailable,
  description
) { return {businessName, offerName, offerType, startTime, endTime, amount, numAvailable, description}; }

const rows = [
  createData('businessName1', '2 for 1', 'BOGOF', "05.11.2022 08:00", "05.11.2022 23:59", 7, 100, "Buy one burrito, get one free. His and hers, matching burritos"),
  createData('businessName2', '3 for 1', 'Free item', "05.11.2022 08:00", "05.11.2022 23:59", 7, 100, "Buy one burrito, get one free. His and hers, matching burritos"),
  createData('businessName3', '4 for 1', 'Bulk buy', "05.11.2022 08:00", "05.11.2022 23:59", 7, 100, "Buy one burrito, get one free. His and hers, matching burritos"),
  createData('businessName4', '5 for 1', 'Price slash', "05.11.2022 08:00", "05.11.2022 23:59", 7, 100, "Buy one burrito, get one free. His and hers, matching burritos"),
  createData('businessName5', '6 for 1', 'Exclusive item', "05.11.2022 08:00", "05.11.2022 23:59", 7, 100, "Buy one burrito, get one free. His and hers, matching burritos"),
];

export default function BasicTable() {
  return (
    <>
        <Typography variant="h1" sx={{textAlign: 'center'}}>Company Name</Typography>;

        <TableContainer component={Paper}>
            <Table sx={{
                    width: '80vw',
                    marginLeft: 'auto',
                    marginRight: 'auto' }}
                    aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>businessName</TableCell>
                    <TableCell align="right">offerName</TableCell>
                    <TableCell align="right">offerType</TableCell>
                    <TableCell align="right">startTime</TableCell>
                    <TableCell align="right">endTime</TableCell>
                    <TableCell align="right">amount</TableCell>
                    <TableCell align="right">numAvailable</TableCell>
                    <TableCell align="right">description</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow>
                        <TableCell align="right">{row.businessName}</TableCell>
                        <TableCell align="right">{row.offerName}</TableCell>
                        <TableCell align="right">{row.offerType}</TableCell>
                        <TableCell align="right">{row.startTime}</TableCell>
                        <TableCell align="right">{row.endTime}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">{row.numAvailable}</TableCell>
                        <TableCell align="right">{row.description}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
  );
}