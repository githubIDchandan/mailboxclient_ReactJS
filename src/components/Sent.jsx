import { useSelector } from "react-redux";
import SentCard from "./SentCard";
import { useAddSentDb } from "../hooks/useAddSentDb";

const Sent = () => {
  const sent=useSelector((store)=>store?.mail?.sent)
  console.log("sent.......",sent)
 
  useAddSentDb()


console.log("Seeeeeent",sent)
  return (
    <div className="ml-60 text-red-600">
       <div className="pt-20 pb-10  px-10 text-4xl">
        <h1 className="w-fit">Sent</h1>
        </div>
       
       {
        sent?.map((item,index)=>{ 
          return <SentCard key={index}  item={item}/>
        })
       }
    </div>
  )
}

export default Sent