import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import baseAxios from '../../api/baseAxios';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import {deleteUser} from '../../features/userSlice'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData({firstname,email,mobileNo,city,state,country},i) {
  return { firstname,email,mobileNo,city,state,country,i};
}

var usersArr = []

export default function CustomizedTables({ users }) {

    

    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    users && users.map((user, i) => {
        return (
            usersArr.push(user)
        )
    })
    

    async function deleteUserFnc(id) {
        try {
            const res = await baseAxios.delete('/delete-user/' + id)
            console.log(res.data)
            dispatch(deleteUser(id))
        } catch (error) {
            
        }
    }
      
    async function editUserFnc(id) {
       navigate('/edit/'+id)
  }
  
      
    
  return (
    <TableContainer >
      <button className='createBtn' onClick={() => navigate('/create')}>Add</button>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Mobile-no</StyledTableCell>
            <StyledTableCell align="right">Country</StyledTableCell>
            <StyledTableCell align="right">State</StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
                  {users.map((user, i) => (
         <StyledTableRow key={i}>
             <StyledTableCell >{i+1}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {user.firstname}
              </StyledTableCell>
              <StyledTableCell align="right">{user.email}</StyledTableCell>
              <StyledTableCell align="right">{user.mobileNo}</StyledTableCell>
              <StyledTableCell align="right">{user.country}</StyledTableCell>
              <StyledTableCell align="right">{user.state}</StyledTableCell>
              <StyledTableCell align="right">{user.city}</StyledTableCell>
              <StyledTableCell align="right" onClick={()=>editUserFnc(user._id)}><EditIcon /></StyledTableCell>
              <StyledTableCell align="right" onClick={()=>deleteUserFnc(user._id)}><DeleteIcon /></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}