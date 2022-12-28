import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import UsersCrud from './components/UsersCrud'
import UsersCrudForm from './components/UsersCrudForm'
import Modal from './components/Modal'

function App() {

  const[usersList, setUsersList] = useState([])
  const[selectedUser, setSelectedUser] = useState(null)
  const[modalText, setModalText]=useState("")

  useEffect(()=>{
    axios.get("https://users-crud.academlo.tech/users/")
    .then(res=>setUsersList(res.data))
  },[])

  const getUsersList = () =>{
    axios.get("https://users-crud.academlo.tech/users/")
    .then(res=>setUsersList(res.data))
  }

  const selectUser = user =>{
    setSelectedUser(user)
  }
  const deselectUser = () => setSelectedUser(null)

  const deleteUser = id =>{
    axios.delete(`https://users-crud.academlo.tech/users/${id}/`)
    .then(()=>getUsersList(),showModal("User deleted"))
    .catch(error => console.log(error.response?.data)) 
  }

  const showModal= text =>{
    setModalText(text)
    setTimeout(() => {
      setModalText(false)
    }, 2000);
  }
  
  return (
    <div className="App">
        <UsersCrud usersList={usersList} selectUser={selectUser} deleteUser={deleteUser}/>
        <UsersCrudForm getUsersList={getUsersList} selectedUser={selectedUser} deselectUser={deselectUser} showModal={showModal}/>
        <Modal modalText={modalText}/>
    </div>
  )
}

export default App
