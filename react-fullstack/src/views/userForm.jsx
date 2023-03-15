import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";  

export default function UserForm(){
    const{id} = useParams(); //get id from browser, by specifyingthe param.id using {id}
  const navigate =  useNavigate();

    const [errors, setErrors] = useState(); 
    const[loading, setLoading]= useState(false);
    const {setNotification}= useStateContext(); //setnotif is a function , so curly braces

   


const [user, setUser]=useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
});

if(id){
useEffect(()=>{
    setLoading(true)
    axiosClient.get(`/users/${id}`) //get user info from api
    .then(({data}) =>{
        setLoading(false);
        setUser(data)
    }).catch(()=>{
        setLoading(false)
    })
}, [])
}

const onsubmit = (ev) => {
ev.preventDefault();
if(user.id ){ // send update rqst
 axiosClient.put(`/users/${user.id}`, user)
    .then(() => { 
        setNotification("User was successfully updated")
        navigate("/users")
    })
    .catch( err => {
        console.log(err)
        const response = err.response;
        if(response.status === 422){
            console.log( response.data.errors );
            setErrors(response.data.errors);
        }
    })
}
else{
    axiosClient.post(`/users`, user)
    .then(() => {     
        setNotification("User was successfully created")
        navigate("/users")
    })
    .catch( err => {
        console.log(err)
        const response = err.response;
        if(response.status === 422){
            console.log( response.data.errors );
            setErrors(response.data.errors);
        }
    })
}
}

    return(
        <> 
        {user.id && <h1>Update User {user.name}</h1>}
        {!user.id &&  <h1>New User</h1> }
        <div className="card animated fadeInDown">
            {loading && 
            <div className="text-center">Loading...</div> }

{ errors && <div className="alert">
        {Object.keys(errors).map(key => (
            <p key={key}> {errors[key][0]}</p>
        ))} </div>
  }


{errors && <div className="alert">
        {Object.keys(errors).map(key => (
            <p key={key}> {errors[key][0]}</p>
        ))} </div>
  }


{!loading &&
<form onSubmit={onsubmit}>
 {/*}   2way data binding impemented on input field and h1 above , changes on form affect h1,>> update state (object), with existing state value, setuser accpt an object, destructure user, and give additional value for each field >>name coreespond with name, target corresponds with input field, value for value */}
<input  value={user.name}   onChange={ev=>setUser( {...user, name: ev.target.value} )} placeholder="Name"/>
<input type="email" value={user.email} onChange={ev=>setUser( {...user, email: ev.target.value} )} placeholder="Email"/>
<input  type="password" onChange={ev=>setUser( {...user, password: ev.target.value} )}  placeholder="Password"/>
<input type="password"  onChange={ev=>setUser( {...user, password_confirmation: ev.target.value} )} placeholder="Password Confirmation"/>

<button className="btn">Save</button>
</form>
}
        </div>
        </>
    )
}