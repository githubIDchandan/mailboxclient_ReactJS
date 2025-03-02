import { useDispatch } from "react-redux";
import { addchecked } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { addRead, addStarred, modifyList } from "../store/mailSlice";

const SentCard = ({item}) => {
   
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const words = item.msgContent.split(/\s+/); // Split by any whitespace
    const firstFourWords = words.slice(0, 4).join(" "); // Get the first 4 words

    const handleChecked=(item)=>{
      // console.log("iiiiiiiitttm",item)
       dispatch(modifyList(item))

  }
const handleCard=(item)=>{
  navigate("/mail/view/"+item.id)
  dispatch(addRead({...item,read:true}))
}

const handleStarred=(item)=>{
  dispatch(addStarred({...item,star:!item.star}))
}

  return (
    <div >
        <div className={`px-10 my-[2px] bg-gray-300   ${item.read===true?"bg-white border border-green-600 rounded-lg text-gray-400":"bg-gray-300"} border-b-2 text-black font-semibold w-1/2 mx-10 py-2  flex hover:shadow-xl hover:shadow-gray-200 hover:border hover:border-gray-200 hover:bg-gray-400 hover:text-white  `}>
        <div className="cursor-pointer">
         <input  type="checkbox" onChange={(e)=>{
          const checkbed=e.target.checked;
          console.log("checckkk",checkbed)
          dispatch(addchecked(checkbed))
          handleChecked(item)

         }} className="mx-1 text-lg cursor-pointer"></input>
         {/* ✸ */}
         <span className={`"text-lg ml-3 cursor-pointer"`}
           onClick={()=>handleStarred(item)}
         >{item.star===true?"✳":"☆"}</span>
        </div>
        <div className="ml-10 mr-5 w-1/2 cursor-pointer" onClick={()=>handleCard(item)}>
        <span className="text-sm">{item.subject}</span>
        <span className=" text-[12px] mx-4 text-gray-600  ">{firstFourWords}...</span>
        </div>
         <div className="w-1/4">
         {!item.read&&<h1 className="ml-10 mt-3 text-sm">[{"Unread..... "}]</h1>}
         </div>

        </div>
        
        
        
    </div>
  )
}

export default SentCard