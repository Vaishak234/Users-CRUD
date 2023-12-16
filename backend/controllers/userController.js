const asyncHandler = require('express-async-handler')
const User = require('../model/User')


const getUser = asyncHandler(async (req, res) => {
    const userId = req.params.id

    const user = await User.findById(userId)
    if (!user) return res.status(404).json('user not found')
    
    return res.status(200).json(user)
})
 
const getAllUsers = asyncHandler(async (req, res) => {
    
    const users = await User.find()
    if (!users) return res.status(404).json('user not found')
    
    return res.status(200).json(users)
 })

const createUser = asyncHandler(async (req, res) => {

    console.log(req.body);
    
    const {firstname,lastname,email,mobileNo,address1,address2,city,zipCode,country,state} = req.body
    if (!firstname || !lastname || !mobileNo || !email || !city || !zipCode || !country || !state ||!address1) {
        return res.status(400).json('all fields are required')
    }

    const createUser = await User.create({
        firstname,
        lastname,
        email,
        mobileNo,
        address1,
        address2,
        city,
        state,
        country,
        zipCode

    })
   
    
    if (!createUser) {
       return res.status(200).json('cant create user')
    }
        
    return res.status(200).json('user created')
    

})

const updateUser = asyncHandler(async (req, res) => {

    const userId = req.params.id
   
    const {firstname,lastname,email,mobileNo,address1,address2,city,zipCode,country,state} = req.body
    if (!firstname || !lastname || !mobileNo || !email || !city || !zipCode || !country || !state ||!address1) {
        return res.status(400).json('all fields are required')
    }

    const updatedUser = await User.updateOne(
       { _id:userId},
        {
            firstname:firstname,
            lastname:lastname,
            email:email,
            mobileNo:mobileNo,
            address1:address1,
            address2:address2,
            city:city,
            state:state,
            country:country,
            zipCode:zipCode
        }
    )

    
    if (!updatedUser) {
       return res.status(200).json('cant update user')
    }
    console.log(updatedUser);
    return res.status(200).json(userId)
    

})
const deleteUser = asyncHandler(async (req, res) => {

    const userId = req.params.id
    
    const deletedUser = await User.findByIdAndDelete(userId)
    if (!deletedUser) {
       return res.status(200).json('cant delete user')
    }
        
    return res.status(200).json('user deleted')
    

})


module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
    
}