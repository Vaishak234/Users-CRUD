import './App.css';
import Form from './components/form/Form';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Users from './components/users/Users'
import UpdateForm from './components/updateForm/UpdateForm'
import { useEffect } from 'react';
import baseAxios from './api/baseAxios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, selectUser } from './features/userSlice';
import EditUserPage from './EditUserPage'

function App() {


   const dispatch = useDispatch()
   const users = useSelector(selectUser)

  async function fetchUsers() {
      
       try {
           const res = await baseAxios.get('/get-all')
          dispatch(getAllUsers(res.data))
           
       } catch (error) {
          console.log(error.response.data);
       }
  }
  useEffect(() => {
     fetchUsers()
             
  }, [])
  
   
  return (
      <BrowserRouter>
      <div className="app">
        
        
        <Routes>
    
          <Route path="/create" element={
             <Form />
          }>

          </Route>

      
          <Route path="/" element={
             <Users />
          }>

          </Route>

          <Route path="/edit/:id" element={
             <EditUserPage />
          }> 

          </Route>

      
          
        </Routes>


      </div>

      </BrowserRouter>
  );  
}

export default App;
