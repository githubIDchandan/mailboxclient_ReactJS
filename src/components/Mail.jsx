import { Outlet } from "react-router-dom"
import Header from "./Header"


const Mail = () => {
 
  return (
    <div>
      <Header/>
      <Outlet/>
      </div>
  )
}

export default Mail