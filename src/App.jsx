import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/Login"
import Mail from "./components/Mail"
import { Provider } from "react-redux"
import appStore from "./store/appStore"
import Inbox from "./components/Inbox"
import Profile from "./components/Profile"
import Sent from "./components/Sent"
import Compose from "./components/Compose"
import ViewEmail from "./components/ViewEmail"
import Starred from "./components/Starred"
import Draft from "./components/Draft"
import { useAddInboxDb } from "./hooks/useAddInboxDb"
import { useAddSentDb } from "./hooks/useAddSentDb"


function App() {
 
  const appRouter=createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"mail",
      element:<Mail/>,
      children:[
        {
          path:"inbox",
          element:<Inbox/>
        },
        {
          path:"profile",
          element:<Profile/>
        },
        {
          path:"starred",
          element:<Starred/>
        },
        {
          path:"draft",
          element:<Draft/>
        },
        {
          path:"sent",
          element:<Sent/>,
          children:[
            {
              path:"view",
              element:<ViewEmail/>
            }
          ]
        }
        ,
        {
          path:"compose",
          element:<Compose/>
        },
       {
        path:"view/:resId",
        element:<ViewEmail/>
       }
      ]
    },
    
  ])

  

  return (
    <>
    <Provider store={appStore}>
    <RouterProvider router={appRouter}/>
    </Provider>
    </>
  )
}

export default App
