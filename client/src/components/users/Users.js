import React, { useEffect, useState } from 'react'
import CustomizedTables from './Table'
import baseAxios from '../../api/baseAxios'
import './users.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { selectUser,addUser } from '../../features/userSlice'
import { useNavigate } from 'react-router-dom'

function Users() {


    const users = useSelector(selectUser)
  const navigate = useNavigate()
   

  return (
      <div className='users'> 
          
      {
        users.length !== 0 ? <CustomizedTables users={users} /> : <>
        
          <h2>Opps no users Found</h2>
          <button className='createBtn '  onClick={()=>navigate('/create')}>Add users</button>
        </>
       }
          
      </div>
  )
}

export default Users