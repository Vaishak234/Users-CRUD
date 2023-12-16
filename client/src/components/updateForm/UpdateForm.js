import React, { useEffect, useState } from 'react'
import './updateForm.css'
import { useNavigate, useParams } from 'react-router-dom'
import { selectUser, updateUser } from '../../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import baseAxios from '../../api/baseAxios';

function UpdateForm() {
    
    const { id } = useParams()
    
    const users = useSelector(selectUser)
     const user = users.find(u=> u._id === id)
  
   
    const [countries, setCountries] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [countryCode,setCountryCode] = useState(null)
    const [states, setStates] = useState([])
    const [cities,setCities] = useState([])
    const [stateCode, setStateCode] = useState(null)
    
   

    const [userData, setUserData] = useState({
        firstname:user?.firstname,
        lastname:user?.lastname,
        email:user?.email,
        mobileNo:user?.mobileNo,
        address1:user?.address1,
        address2:user?.address2,
        country:user?.country,
        city:user?.city,
        state:user?.state, 
        zipCode:user?.zipCode,  
    })
    
 
     var config = {
      cUrl: 'https://api.countrystatecity.in/v1/countries',
      ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
    }
    

    async function fetchCountries() {

        try {
            let apiEndPoint = config.cUrl
            const res = await fetch(apiEndPoint, { headers: { "X-CSCAPI-KEY": config.ckey } })
            const data = await res.json()
            setCountries(data)
          
       } catch (error) {
          console.log(error.response.data);
       }
        
    }


    async function fetchCountryCode() {
        if (userData.country) {
            const cCode = countries.find(c => c.name === userData.country)?.iso2
            setCountryCode(cCode)
        }
    }
   

    async function fetchStates() {

        try {
            const res = await fetch(`${config.cUrl}/${countryCode}/states`, { headers: { "X-CSCAPI-KEY": config.ckey } })
            const data = await res.json()
            console.log(data);
            setStates(data)
       } catch (error) {
          console.log(error.response.data);
       }
        
    }

     async function fetchStateCode() {
        if (userData.state) {
            const sCode = states.find(c => c.name === userData.state)?.iso2
            setStateCode(sCode)
        }
    }

     async function fetchCities() {

        try {
            const res = await fetch(`${config.cUrl}/${countryCode}/states/${stateCode}/cities`, {headers: {"X-CSCAPI-KEY": config.ckey}})
            const data = await res.json()
            console.log(data);
            setCities(data)
       } catch (error) {
          console.log(error.response.data);
       }
        
    }
    
    

    useEffect(() => {
        
        fetchCountries()
        fetchCountryCode()
       
        if (countryCode) {
             fetchStates()
        }
        fetchStateCode()
        if (countryCode && stateCode) {
           fetchCities()
        }
    
    

    }, [userData.country,userData.state,countryCode,stateCode])
    
   
   
    

    async function updateUserFnc() {
        try {
           const res = await baseAxios.put('/update-user/'+id,userData,{withCredentials:true})
            userData._id = id
           dispatch(updateUser(userData))
           navigate('/')
             
       } catch (error) {
          console.log(error.response.data);
       }
    }


  return (
      <div className='form'>
       
          <h2 className='form__title'>Edit user</h2>

          <div className="inputContainer">

          <div className="inputBox">
              <label htmlFor=""> firstname</label>
              <input type="text" value={userData?.firstname} onChange={(e)=>setUserData({...userData,firstname:e.target.value})} placeholder='enter first name' />
          </div>

          <div className="inputBox">
              <label htmlFor=""> lastname</label>
              <input type="text" value={userData?.lastname} onChange={(e)=>setUserData({...userData,lastname:e.target.value})} placeholder='enter first name' />
          </div>
          
            </div>

         <div className="inputContainer">

          <div className="inputBox">
              <label htmlFor=""> email</label>
              <input type="email" value={userData?.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} placeholder='enter your email' />
          </div>

          <div className="inputBox">
              <label htmlFor=""> mobile no</label>
              <input type="text"value={userData?.mobileNo} onChange={(e)=>setUserData({...userData,mobileNo:e.target.value})} placeholder='enter mobile number' />
          </div>
            </div>
        
            <div className="inputContainer">


          <div className="inputBox">
              <label htmlFor=""> Address 1 </label>
              <input type="text" value={userData?.address2} onChange={(e)=>setUserData({...userData,address2:e.target.value})} placeholder='enter your address' />
          </div>

          <div className="inputBox">
              <label htmlFor=""> Address 2</label>
              <input type="text" value={userData?.address1} onChange={(e)=>setUserData({...userData,address1:e.target.value})} placeholder='enter another address' />
          </div>
          </div>
  
         <div className="inputContainer">

         
           <div className="inputBox">
              <label htmlFor=""> country</label>
                    <select type="text" value={userData?.country} onChange={(e)=>setUserData({...userData,country:e.target.value})} >
                        <option value="">Select country</option>
                        {
                            countries.map((country,i) => {
                                return (
                                    <option key={i} value={country.name}>{country.name}</option>
                                )
                            })
                        }
                    </select>
          </div>


          <div className="inputBox">
              <label htmlFor=""> State</label>
               <select type="text" required value={userData?.state} onChange={(e) => {
                        
                        setUserData({ ...userData, state: e.target.value})
                    
                    }}>
                        <option value="" hidden>Select state</option>
                        {
                          states != [] ?  states.map((state,i) => {
                                return (<>
                                    <option key={i}  value={state.name}>{state.name}</option>
                                    
                                    </>
                                )                            }): ''
                        }
                    </select>                </div>
                </div>
          <div className="inputContainer">
           <div className="inputBox">
              <label htmlFor="">City</label>
             <select type="text" required value={userData?.city} onChange={(e) => {
                        
                        setUserData({ ...userData, city: e.target.value})
                    
                    }}>
                        <option value="" hidden>Select city</option>
                        {
                          cities != [] ?  cities.map((city,i) => {
                                return (<>
                                    <option key={i}  value={city.name}>{city.name}</option>
                                    
                                    </>
                                )                            }): ''
                        }
                    </select>            </div>
           <div className="inputBox">
              <label htmlFor=""> zip code</label>
              <input type="text" value={userData?.zipCode} onChange={(e)=>setUserData({...userData,zipCode:e.target.value})}zipCode placeholder='enter zip code' />
          </div>
          </div>
                <button className='createBtn' onClick={updateUserFnc}>update </button>
       
      </div>
     
  )
}

export default UpdateForm