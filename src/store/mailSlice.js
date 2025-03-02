import { createSlice } from "@reduxjs/toolkit";
import { update } from "firebase/database";


const mailSlice=createSlice({
    name:"mail",
    initialState:{
        sent:[],
        inbox:[],
        modifyList:[],
    },
    reducers:{
        addSent:(state,action)=>{
            state.sent.unshift(action.payload);
        },
        addSentDatabase:(state,action)=>{
            state.sent=action.payload;
        },
        addInbox:(state,action)=>{
            state.inbox=action.payload;
        },
        modifyList:(state,action)=>{
            state.modifyList=action.payload;
        },
        updateList:(state,action)=>{
            const filter=state.sent.filter((item)=>{
                return item.id!=action.payload.id;
            })
            if(filter.length!==state.sent.length){
                state.sent=filter
            }
            else{
                const filter=state.inbox.filter((item)=>{
                    return item.id!=action.payload.id;
                })
                state.inbox=filter; 
            }
        },
        addRead:(state,action)=>{
            let bool=false;
            const UpdatedList=state.sent.map((item)=>{
                if(action.payload.id===item.id){
                    bool=true;
                }
                return action.payload.id===item.id?(action.payload):item;
            })
            if(bool){
                console.log("bool",bool)
                state.sent=UpdatedList
            }
            else{
                console.log("bool",bool)
                const UpdatedList=state.inbox.map((item)=>{
                    return action.payload.id===item.id?action.payload:item;
                })
                state.inbox=UpdatedList
            }

        },
        addStarred:(state,action)=>{
            let bool=false;
            const UpdatedList=state.sent.map((item)=>{
                if(action.payload.id===item.id){
                    bool=true;
                }
                return action.payload.id===item.id?(action.payload):item;
            })
            if(bool){
                console.log("bool",bool)
                state.sent=UpdatedList
            }
            else{
                console.log("bool",bool)
                const UpdatedList=state.inbox.map((item)=>{
                    return action.payload.id===item.id?action.payload:item;
                })
                state.inbox=UpdatedList
            }

        }
    }
})


export const {addSent,addSentDatabase,addInbox,updateList,modifyList,addRead,addStarred}=mailSlice.actions
export default mailSlice.reducer