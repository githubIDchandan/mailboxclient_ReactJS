import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
      name:"user",
      initialState:{
        userProps:{
          uid:null,
          email:null
        },
        checked:null,
      },
      reducers:{
        addUser:(state,action)=>{
            state.userProps=action.payload;
        },
        removeUser:(state)=>{
            state.userProps=null;
        },
        addchecked:(state,action)=>{
            state.checked=action.payload;
        }
      }

})



export const {addUser,removeUser,addchecked}=userSlice.actions;
export default userSlice.reducer