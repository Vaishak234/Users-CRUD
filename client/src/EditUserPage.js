import React, { useEffect, useState } from 'react'
import UpdateForm from './components/updateForm/UpdateForm';
import baseAxios from './api/baseAxios';
import { useParams } from 'react-router-dom';

function EditUserPage() {

    const { id } = useParams()
    const [user, setUser] = useState()
    
     async function getEditUser() {
        try {
            const res = await baseAxios.get('/user/' + id)
            console.log(res.data);
            setUser(res.data)
            console.log(user);
           
        } catch (error) {
            console.log(error.response.data);
        } 
    }
       
    useEffect(() => {
        getEditUser()
    },[])

  return (
      <div>
          <UpdateForm user={user} />
     </div>
  )
}

export default EditUserPage