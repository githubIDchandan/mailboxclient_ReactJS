import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDatabase, off, onValue, ref } from "firebase/database";
import { addInbox } from "../store/mailSlice";



export const useAddInboxDb=()=>{
  
  const { userProps } = useSelector((store) => store?.user || {});
    const {inbox}=useSelector((store)=>store.mail);
    const dispatch=useDispatch();
   
    
     useEffect(()=>{
         if (!userProps&&inbox.length>0) return;
         const {email}=userProps;
         const cleanEncodedEmail = email?.replace(/[.#$[\]]/g, '_');
         const db = getDatabase();
         const starCountRef = ref(db, 'users/' + cleanEncodedEmail + '/inbox');
         const handleSnapshot = (snapshot) => {
           const data = snapshot.val();
           console.log("dddddddddata",data)
           const arr=Object.entries(data).map(([key,value])=>{
             return value; 
           })
           
           if (data) {
             if(!inbox.length){
               arr.reverse();
               dispatch(addInbox(arr)); // Dispatch the data to your Redux store
             }
           }
         };
       
         // Attach the listener to the Firebase reference
         onValue(starCountRef, handleSnapshot);
       
         // Cleanup function to remove the listener when the component unmounts or email changes
         return () => {
           off(starCountRef, 'value', handleSnapshot);
         };
       
       
       },[userProps])

      
}