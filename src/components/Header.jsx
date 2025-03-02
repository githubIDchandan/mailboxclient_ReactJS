import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addchecked, addUser, removeUser } from "../store/userSlice";
import { updateList } from "../store/mailSlice";
import { getDatabase, push, ref, set } from "firebase/database";
import { off, onValue, } from "firebase/database";
import { addInbox, addSentDatabase } from "../store/mailSlice";
import { useAddInboxDb } from "../hooks/useAddInboxDb";
import { useAddSentDb } from "../hooks/useAddSentDb";



const Header = () => {

  const [viewCart,setViewCart]=useState(false);
 
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const location=useLocation();
  const {checked,userProps}=useSelector((store)=>store.user);
  const {inbox,sent}=useSelector((store)=>store.mail);
  const modifyList=useSelector((store)=>store.mail.modifyList);

  

  const handleLogin=()=>{
    console.log("hello")
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      // An error happened.
    });
  }

  function writeUserData(Data,emailId,path) {
    if(!emailId)return;
    const db = getDatabase();
    const cleanEncodedEmail = emailId?.replace(/[.#$[\]]/g, '_');
    const pathRef=`users/${cleanEncodedEmail}/${path}`;
    set(ref(db, pathRef),Data);
  }
 
  useEffect(()=>{
    
  
    const unsubscribe= onAuthStateChanged(auth, (user) => {
       if (user) {
         const uid = user.uid;
         if(location.pathname==="/"){
           navigate("/mail");
         }
         else{
           navigate(location.pathname)
         }
         
         dispatch(addUser(user));
         
       } else {
         if(location.pathname!=="/") navigate("/")
         dispatch(removeUser());
         writeUserData(inbox,userProps.email,"inbox");
         writeUserData(sent,userProps.email,"sent")
  
       }
     });
 
     return ()=>{
       unsubscribe()
     }
 
 
   },[navigate,location.pathname,inbox,sent])



 


  const handelDelete=()=>{
     dispatch(updateList(modifyList))
     dispatch(addchecked(false))
  }


  return (
   <>
    {location.pathname!=="/"&&<div className="h-screen w-52 fixed bg-black text-white flex-col  ">
      <div className=" py-10 px-4 h-3/4  text-lg">
       <Link to={"/mail/compose"}><button className="block bg-slate-700 px-10 py-2 my-4 focus:bg-slate-900">Compose</button></Link>
       <Link to={"/mail/inbox"}><button className="block px-9 py-2 my-4 focus:bg-slate-900">{"✉️"}Inbox
        <span className="ml-1 bg-blue-500 px-2 text-white rounded-full">{inbox.length}</span></button></Link>
       <Link to={"/mail/draft"}><button className="block px-11 py-2 my-4 focus:bg-slate-900">{"📝"}Draft</button></Link>
       <Link to={"/mail/starred"}><button className="block px-10 py-2 my-4 focus:bg-slate-900">{"★"}Starred</button></Link>
       <Link to={"/mail/sent"}><button className="block px-11 py-2 my-4 focus:bg-slate-900">{"➤"}Sent
       <span className="ml-1 bg-gray-900 px-4 text-white ">{sent.length}</span>
        </button></Link>
       {checked&&<button className="block px-10 py-2 my-4 focus:bg-slate-900 border border-white rounded-lg bg-red-900"
       onClick={handelDelete}>{"🗑"}Delete</button>}
      </div>
      <div className="h-1/4 text-lg">
      <Link to={"/mail/profile"}><button className="block px-10  my-4  ">{"🪪"}Your Profile</button></Link>
      <button onClick={handleLogin} className="block px-10 pt-4  ">{"⬅"}Log Out</button>
      
     
      </div>
    </div>}
   </>
  )
}

export default Header