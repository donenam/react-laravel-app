import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx"; 
import { Navigate } from 'react-router';

export default function GuestLayout(){
    const{user, token} = useStateContext() 
    if(token){
        return  <Navigate to="/users" />
    }
    return(
 
 <div>
   <Outlet /> 
 </div>
 
    )
}