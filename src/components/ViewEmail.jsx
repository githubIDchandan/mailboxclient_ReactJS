import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const ViewEmail = () => {

const {resId}=useParams()
const {sent,inbox}=useSelector((store)=>store?.mail)

const searchList=sent.concat(inbox)
console.log("searchList",searchList)
const filterItem=searchList.filter((item)=>{
    return Number(item.id)===Number(resId);
})
// timestamps
const createdAt = filterItem[0].id;
// Convert milliseconds to Date objects
const createdAtDate = new Date(createdAt);

  return (
    <div className="ml-60 text-green-600">
    <div className="pt-20 pb-5  px-10 text-4xl">
     <h1 className="w-fit">View</h1>
     </div>
     {/* <h1 className="mx-10 text-red-600 font-semibold  text-lg">This is New Mail</h1> */}
     <div className="mx-9 flex text-red-600 font-semibold  text-lg">
        <img alt="acc" className="w-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCdfaz8GPft5te6NT-ZzlFahCsp5K9aw_1AA&s"></img>
        <span className="ml-2 mt-1">{filterItem[0].subject}</span>
     </div>
    <div className="mx-10 py-1 text-black font-bold border-b-2 border-gray-300 w-1/2">
        <p >From:<span className="ml-5 ">{filterItem[0].sender}</span></p>
        <p>To: <span className="ml-9">{filterItem[0].reciever}</span></p>
        <p>Time:<span className="ml-5">{createdAtDate.toLocaleString()}</span></p>
    </div>
    <div className="mx-10 py-4 text-black bg-gray-100 font-thin text-2xl  h-[400px] mt-2 w-1/2">
        <p className="mx-5">{filterItem[0].msgContent}</p>
    </div>
 </div>
  )
}

export default ViewEmail