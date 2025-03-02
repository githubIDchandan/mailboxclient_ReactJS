
import { useRef, useState } from "react";
import Header from "./Header.jsx"
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase.js";

const Login = () => {

  const [login,setLogin]=useState(false);

  const email=useRef(null);
  const password=useRef(null);
  

 
  const formSubmitHandler=(e)=>{
      e.preventDefault();
      if(!login){
        
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => { 
              //  const user = userCredential.user;

               
             })
            .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;
             
           });

      }
      else{
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                 const user = userCredential.user;
                 console.log(user)
                //  console.log("userName",user.name);
                //  dispatch(addUser(user))
                //  navigate("/store")
   
                 })
            .catch((error) => {
                   const errorCode = error.code;
                   const errorMessage = error.message;
                });
      }

  }

  const handleSignIn=()=>{
    
    setLogin(!login);
  }

  return (
    <div className={login&&("bg-black h-screen")} >
      
      {/* {!login&&(<><Header/><div className="relative top-20 z-10"><LoginBody/><Footer/></div></>)} */}
      <Header/>
       
      <form onSubmit={formSubmitHandler}  className="h-fit shadow-sm border border-white shadow-white w-[25%] absolute mt-[10%] ml-[35%] bg-black flex flex-col  mx-auto rounded-lg">
          <h1 className="p-4 text-2xl text-white font-bold">{login===true?"Login":"Sign Up"}</h1>
          <input ref={email} className="p-3 bg-gray-900 border border-white w-[95%] m-2 text-white" placeholder="Email"></input>
          <input ref={password} className="p-3 bg-gray-900 border border-white w-[95%] m-2 text-white" placeholder="Password"></input>
          <button className="bg-black border border-white text-white py-4 w-[95%] m-2 text-lg font-bold rounded-sm bg-gradient-to-r from-[#3e98b6]">Submit</button>
          <div className="mt-2 pb-6">
            <span className="p-2 text-gray-500 ">{login===false?"Already have an account?":"Create a new account : "}</span>
            <span className=" border-b-[1px] text-white cursor-pointer" onClick={handleSignIn}>{login===true?"Sing up":"Sign in"}</span>
          </div>
          <p className="text-gray-600 font-thin mx-1 font-mono absolute -mt-8">mailbox-client-  project!</p>
       </form>
    
      
    </div>
  )
}

export default Login