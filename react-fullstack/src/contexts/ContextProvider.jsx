import { createContext, useContext, useState } from "react";

const stateContext =  createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {}

});
 
export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [notification, _setNotification] = useState( "" );

     //set notification and reset after 5secs
     const setNotification = (message) =>{
        _setNotification(message)
        setTimeout(() => {
            _setNotification()
        }, 5000);
    }
   
    const setToken =  (token) => {
        _setToken(token)

        if (token){
            localStorage.setItem("ACCESS_TOKEN", token);
        }
        else{
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }

    //expose data
return(
    <stateContext.Provider value={{
user,
token,
setUser,
setToken,
notification,
setNotification
    }}>
    {children}
    </stateContext.Provider>
)
}


export  const  useStateContext = () => useContext(stateContext)