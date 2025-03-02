import { useSelector } from "react-redux"
import SentCard from "./SentCard";

const Starred = () => {

  const {inbox,sent}=useSelector((store)=>store.mail);
  const list=inbox.concat(sent);
  const filterList=list.filter((item)=>{
    return item.star===true;
  })


  return (
    <div className="ml-60 text-red-600">
       <div className="pt-20 pb-10  px-10 text-4xl">
        <h1 className="w-fit">Starred</h1>
        </div>
       
       {
        filterList?.map((item,index)=>{ 
          return <SentCard key={index} item={item}/>
        })
       }
    </div>
  )
}

export default Starred