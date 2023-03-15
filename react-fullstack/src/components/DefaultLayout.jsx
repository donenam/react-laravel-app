import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";  

export default function DefaultLayout(){
    const{user, token, notification, setUser, setToken} = useStateContext() 
 
    if(!token){
        return  <Navigate to="/login" />
    } 

    //listen to component mount event, and when it happens , make get request on user, which will return user info, destructure and get data
useEffect(()=>{
    axiosClient.get("/user")
    .then(({data}) => {
        setUser(data); 
    })
}, []);

    const onLogout = (e) =>{
        e.preventDefault();
        axiosClient.post("/logout")
        .then( ()=> {
            setUser({})
            setToken(null)
        })
    }

    
    return( 

 <div id="defaultLayout"> 
 <aside> 
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/users">Users</Link>
 </aside>

<div className="content">
    <header>
        <div> Header   </div>
        <div>  {user.name} <a  href="#" onClick={onLogout} className="btn-logout">Logout</a> </div>
  </header>

  <main> 
  <Outlet /> 
  </main>

  {notification && <div className="notification"> {notification} </div> }

</div>


    </div> 
    )
}