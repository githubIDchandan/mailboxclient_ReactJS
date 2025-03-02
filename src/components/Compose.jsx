import{ useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { getDatabase, push, ref, } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { addSent } from '../store/mailSlice';

const Compose = () => {
    
   
	const [content, setContent] = useState('');
  const {email}=useSelector((store)=>store?.user?.userProps)
  const recipient=useRef(null);
  const subject=useRef(null);
  const [send,setSend]=useState(false);
  const dispatch=useDispatch();
  const id=Date.now();
  function writeUserData(Msg,emailId,path,id) {
    const db = getDatabase();
    const cleanEncodedEmail = emailId.replace(/[.#$[\]]/g, '_');
    const pathRef=`users/${cleanEncodedEmail}/${path}`;
    push(ref(db, pathRef), {
      sender:email,
      subject:subject.current.value,
      reciever:recipient.current.value,
      msgContent:Msg,
      id:id,
      read:false,
      star:false
    });
  }
  
  

	// const handleChange=(htmlContent)=>{
  //   console.log("html",htmlContent)
  // const tempDiv = document.createElement("div");
  // tempDiv.innerHTML = htmlContent;
  // setContent()
  // console.log("dddddddddata",tempDiv.textContent || tempDiv.innerText || "")

  // }
  // console.log(content)


    const handleSubmit=()=>{
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;
      console.log("iiid",id)
       writeUserData(tempDiv.textContent || tempDiv.innerText || "",email,"sent",id);
      setSend(!send);
      dispatch(addSent({sender:email,id:id,subject:subject.current.value,reciever:recipient.current.value,msgContent:tempDiv.textContent || tempDiv.innerText || ""}))
    }

useEffect(()=>{
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = content;
  if(content)writeUserData(tempDiv.textContent || tempDiv.innerText || "",recipient.current.value,"inbox",id);
},[send])


  return (
    <div className="mx-[20%]  absolute my-10  w-1/2 shadow-sm shadow-gray-500 ">
        <div>
            <label className='block py-6 px-4 text-lg '>New Message</label>
            <input ref={recipient} type='email' className='block py-1 my-1 px-4 text-lg border-b-2 border-gray-300 w-full  focus:outline-none' placeholder='Recipients'></input>
            <input ref={subject} type='text' className='block py-1 my-2 px-4 text-lg border-b-2 border-gray-300 w-full  focus:outline-none' placeholder='Subject'></input>
        </div>
       <div >
       <JoditEditor
			value={content.innerText}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={()=>{}}
		/>
       </div>
        <div>
            <button className='px-20 my-5 mx-2 py-4 bg-gray-300 font-thin text-lg  rounded-lg hover:opacity-80'
             onClick={handleSubmit}
            >Send</button>
        </div>
    </div>
  )
}

export default Compose