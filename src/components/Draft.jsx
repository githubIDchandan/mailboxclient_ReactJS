import { useNavigate } from "react-router-dom"

const Draft = () => {

    const navigate=useNavigate();

   const handleClick=()=>{
         navigate("/mail/compose")
   }

  return (
    <div className="ml-60 text-red-600">
       <div className="pt-20 pb-10  px-10 text-4xl">
        <h1 className="w-fit font-bold">Draft</h1>
        </div>
        <h1 className=" mx-auto w-1/2 text-4xl">Send a new mail......</h1>
        <div className="w-full py-4 flex justify-center">
        <button className=" border py-2 bg-orange-500 text-white hover:bg-black font-bold px-4 rounded-full text-xl"
          onClick={handleClick}
        >Click Here</button>
        </div>
       
    </div>
  )
}

export default Draft