import { createSlice } from "@reduxjs/toolkit"


export const userSlice = createSlice({
    name: "users",
    initialState: {
        users:[]
    },
    reducers: {
        getAllUsers: (state, action) => {
            state.users = action.payload
        },
        addUser: (state, action) => {
            state.users.push(action.payload)
           
        },
        deleteUser: (state,action) => {
            const index = state.users.findIndex((item) => item._id === action.payload)
            state.users.splice(index, 1)
           
          
        },
        updateUser: (state, action) => {

            const index = state.users.findIndex((item) => item._id === action.payload._id)
            state.users[index] = action.payload
            console.log(action.payload === state.users[index]);
          
            
        
        }

    } 
})

export const { getAllUsers,addUser,deleteUser,updateUser } = userSlice.actions

export const selectUser = (state) => state.users.users 
export default userSlice.reducer