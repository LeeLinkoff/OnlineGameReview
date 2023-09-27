import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'

import EditGameReview from './EditGameReview';


const response = await fetch('http://127.0.0.1:81/games');
var rows = await response.json();
 

export default function GameDataTable()
{
  const [open, setOpen] = React.useState(false) 
  const [selectedId, setSelectedId] = React.useState(0);
  const [selectedName, setSelectedName] = React.useState("");    
  const [selectedUrl, setSelectedUrl] = React.useState("");
  const [selectedRating, setSelectedRating] = React.useState("");

  let dataExists = rows.length > 0 ? true : false;
  
  async function handleClickRemove(id) {
   await fetch ("http://127.0.0.1:81/games/" + id, { method: 'DELETE' })
   console.log("http://127.0.0.1:81/games/" + id)
   window.location.reload();
  };

  function handleClickEdit(id, name, url, rating) {
    // "template literal" - enclosed in backtick (`) with variable names enclosed using ${variableName} translated to their values
    console.log(`GameDataTable,  Setting (in handleClickEdit) => id: ${id}, name: ${name}, url: ${url}, rating: ${rating}`);
    setSelectedId(id);
    setSelectedName(name);
    setSelectedUrl(url);
    setSelectedRating(rating);
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
  };

   return (
    <TableContainer component={Paper}>
      <Table width="100" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name </TableCell>
            <TableCell align="left">url</TableCell>
            <TableCell align="center">rating</TableCell>
            <TableCell align="center" colSpan={2}>action</TableCell>
          </TableRow>
        </TableHead >
        { dataExists
           ? (<TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.url}</TableCell>
                <TableCell align="center">{row.rating}</TableCell>
                <TableCell align="right"><Button onClick={() => handleClickEdit(row.id, row.name, row.url, row.rating)} variant="contained">edit</Button></TableCell>
                <TableCell align="left"><Button onClick={() => handleClickRemove(row.id)} variant="contained">remove</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
           ):(<TableCell align="center" colSpan={4}>No Data</TableCell>)
        }
        <EditGameReview
        selectedId={selectedId}
        selectedName={selectedName}
        selectedUrl={selectedUrl}
        selectedRating={selectedRating}
        open={open}
        onClose={handleClose}
      />
      </Table>
    </TableContainer>
  );
}