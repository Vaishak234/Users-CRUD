import React, { useEffect, useRef, useState } from 'react'
import './form.css'
import axios from  'axios'
import baseAxios from '../../api/baseAxios'
import { useDispatch } from 'react-redux'
import { selectUser,addUser } from '../../features/userSlice'
import { useNavigate } from 'react-router-dom'

function Form() {

    const [countries, setCountries] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [countryCode,setCountryCode] = useState(null)
    const [states, setStates] = useState([])
    const [cities,setCities] = useState([])
    const [stateCode,setStateCode] = useState(null)


    const [userData, setUserData] = useState({
        firstname: null,
        lastname: null,
        email: null,
        mobileNo: null,
        address1: null,
        address2: null,
        country: null,
        city: null,
        state: null,
        zipCode: null, 
    }) 

    const [formErrors, setFormErrors] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)
    
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
            const cCode = countries.find(c => c.name === userData.country).iso2
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
            const sCode = states.find(c => c.name === userData.state).iso2
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
    

    const validate = (values) => {
        console.log(values);
        let errors = {}
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if (!values.firstname) {
            errors.firstname = "firstname is required"
        }
        if (!values.lastname) {
            errors.lastname = "lastname is required" 
        }
        if (!values.email) {
            errors.email = "email is required"
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email"
        }
        if (!values.mobileNo) {
            errors.mobileNo = "mobile number required"
        } else if (values.mobileNo.length !== 10) {
            errors.mobileNo = "This is not a valid mobile number"
        }
         if (!values.address1) {
            errors.address1 = "address is required"
        } 
         if (!values.country) {
            errors.country = "country is required"
        } 
         if (!values.state) {
            errors.state = "state is required"
        } 
         if (!values.city) {
            errors.city = "city is required"
        } 
         if (!values.zipCode) {
            errors.zipCode = "zip code is required"
        } 

        return errors
    }
  
    async function createUser() {
     
        try {
           setFormErrors(validate(userData))
            setIsSubmit(true)
            console.log('err',formErrors);
            if (!formErrors) {
                
             }
            else{
                  
                 const res = await baseAxios.post('/create-user',userData,{withCredentials:true})
                 console.log(res.data);
                 dispatch(addUser(userData))
                 navigate('/')
           }
           
       } catch (error) {
          console.log(error.response.data);
       }
    }

     useEffect(() => {
        
         
         if (Object.keys(formErrors).length === 0 && isSubmit) {
             console.log(userData);
         }


    },[formErrors])
    
   

    return (
      
      <div className='form'>
          <h2 className='form__title'>Create user</h2>
       
          <div className="inputContainer">

          <div className="inputBox">
                   <label htmlFor=""> firstname</label>
                    <input type="text" required value={userData.firstname} onChange={(e) => setUserData({ ...userData, firstname: e.target.value })} placeholder='enter firstname' />
                    <span className='errorMsg'>{formErrors.firstname}</span>
          </div>

          <div className="inputBox">
              <label htmlFor=""> lastname</label>
              <input type="text" required value={userData.lastname} onChange={(e)=>setUserData({...userData,lastname:e.target.value})} placeholder='enter lastname' />
               <span className='errorMsg'>{formErrors.lastname}</span>
          </div>
          
            </div>

         <div className="inputContainer">

          <div className="inputBox">
              <label htmlFor=""> email</label>
              <input type="email" required value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} placeholder='enter your email' />
              <span className='errorMsg'>{formErrors.email}</span>
           </div>

          <div className="inputBox">
              <label htmlFor=""> mobile no</label>
              <input type="number" required value={userData.mobileNo} onChange={(e)=>setUserData({...userData,mobileNo:e.target.value})} placeholder='enter mobile number' />
              <span className='errorMsg'>{formErrors.mobileNo}</span>
                </div>
            </div>
        
            <div className="inputContainer">


          <div className="inputBox">
              <label htmlFor=""> Address 1 </label>
                    <input type="text" required value={userData.address1} onChange={(e) => setUserData({ ...userData, address1: e.target.value })} placeholder='enter your address' />
                    <span className='errorMsg'>{formErrors.address1}</span>
          </div>

          <div className="inputBox">
              <label htmlFor=""> Address 2 <span>( optional )</span></label>
                    <input type="text" value={userData.address2} onChange={(e) => setUserData({ ...userData, address2: e.target.value })} placeholder='enter another address' />
          </div>
          </div>
  
         <div className="inputContainer">

         
           <div className="inputBox">
              <label htmlFor=""> country</label>
                    <select type="text" required value={userData.country} onChange={(e) => {
                        
                        setUserData({ ...userData, country: e.target.value})
                    
                    }}>
                        <option value="" hidden>Select country</option>
                        {
                          countries != [] ?  countries.map((country,i) => {
                                return (<>
                                    <option key={i}  value={country.name}>{country.name}</option>
                                    
                                    </>
                                )                            }): ''
                        }
                    </select>
                    <span className='errorMsg'>{formErrors.country}</span>
          </div>

            <div className="inputBox">
              <label htmlFor="">state</label>
                    <select type="text" required value={userData.state} onChange={(e) => {
                        
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
                    </select>
                    <span className='errorMsg'>{formErrors.state}</span>
                </div>
      
                </div>
          <div className="inputContainer">
        
                          
          <div className="inputBox">
              <label htmlFor=""> city</label>
                    <select type="text" required value={userData.city} onChange={(e) => {
                        
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
                    </select>
                    <span className='errorMsg'>{formErrors.city}</span>
                </div>
         
              <div className="inputBox">
              <label htmlFor=""> zip code</label>
                    <input type="number" required value={userData.zipCode} onChange={(e) => setUserData({ ...userData, zipCode: e.target.value })} placeholder='enter zip code' />
                    <span className='errorMsg'>{formErrors.zipCode}</span>
            </div>
            </div>
            <button className='createBtn' onClick={createUser}>Create </button>

      </div>
  )
}

export default Form