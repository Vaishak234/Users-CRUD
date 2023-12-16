const express = require('express')
const { createUser, deleteUser, updateUser, getUser, getAllUsers } = require('../controllers/userController')
const router = express.Router()


router.post('/create-user', createUser)
router.get('/user/:id', getUser)
router.get('/get-all', getAllUsers) 
router.put('/update-user/:id', updateUser)
router.delete('/delete-user/:id', deleteUser)


module.exports = router