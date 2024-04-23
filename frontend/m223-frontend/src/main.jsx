import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import Public from './components/Public'
import {
    createBrowserRouter, RouterProvider
} from 'react-router-dom'
import App from './components/App'


const router = createBrowserRouter([
  {
    path:"/",
    value:"Home"

  },
  {
    path:"/public",
    value:"Public"

  },
  {
    path:"/private",
    value:"Private"

  },
  {
    path:"/login",
    value:"Login"

  }
])

ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
)