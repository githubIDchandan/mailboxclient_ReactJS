import { getDatabase, off, onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { addSentDatabase } from "../store/mailSlice";
import { useDispatch, useSelector } from "react-redux";


export const useAddSentDb=()=>{
  const { userProps } = useSelector((store) => store?.user || {});
    const sent=useSelector((store)=>store?.mail?.sent)
    const dispatch=useDispatch();
    useEffect(()=>{
      if (!userProps&&sent.length>0) return;
      const {email}=userProps;
        const cleanEncodedEmail = email?.replace(/[.#$[\]]/g, '_');
        const db = getDatabase();
        const starCountRef = ref(db, 'users/' + cleanEncodedEmail + '/sent');
        const handleSnapshot = (snapshot) => {
          const data = snapshot.val();
          
          const arr=Object.entries(data).map(([key,value])=>{
            return value;
          })
      
          if (data) {
            if(!sent.length){
              arr.reverse();
              console.log("sentHookcaleed2222",sent)
              dispatch(addSentDatabase(arr)); // Dispatch the data to your Redux store
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