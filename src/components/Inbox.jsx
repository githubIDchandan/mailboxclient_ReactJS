import { useSelector } from "react-redux";
import SentCard from "./SentCard";
import { useAddInboxDb } from "../hooks/useAddInboxDb";

const Inbox = () => {


  const inbox=useSelector((store)=>store?.mail?.inbox)

  useAddInboxDb()
  
  return (
    <div className="ml-60 text-red-600">
       <div className="pt-20 pb-10  px-10 text-4xl">
        <h1 className="w-fit">Inbox</h1>
        </div>
       
       {
        inbox?.map((item,index)=>{ 
          return <SentCard key={index} item={item}/>
        })
       }
    </div>
  )
}

export default Inbox