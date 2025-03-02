import { useSelector } from "react-redux"

const Profile = () => {
  const user=useSelector((store)=>store.user?.userProps)
  
  return (
    <div className="ml-60 text-green-600 font-bold">
       <div className="pt-20 pb-10  px-10 text-4xl flex">
        <img alt="account" className="w-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCdfaz8GPft5te6NT-ZzlFahCsp5K9aw_1AA&s"></img>
        <h1 className="w-fit">Your Profile</h1>
        </div>
       <div>
        <h1 className="text-black"><span className="ml-10 mr-5 text-red-600">Created At: </span>{user.metadata.creationTime}</h1>
        <h1 className="text-black"><span className="ml-10 mr-6 text-red-600">Last Login: </span>{user.metadata.lastSignInTime}</h1>
       </div>
       <div className="w-1/3 font-thin py-10 text-3xl">
         <h1 className="w-fit mx-auto"><span className="ml-7 mr-2 font-bold text-black">Login Id:</span>{user.email}</h1>
       </div>
    </div>
  )
}

export default Profile