import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import Demo from './components/Demo.jsx'
import Public from './components/Public.jsx'

const data ={
  name:" max muster",
  hobbies:["fsadf","jdfas","fjks"]
}

const clickfun =() => {
  console.log("cklickfun geklickt")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Demo data="haleluja" person={data} fun={clickfun}/>
    <Public />
  </React.StrictMode>,
)
