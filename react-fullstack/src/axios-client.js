import axios from "axios"; 
 

const axiosClient= axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api` 
  //or   baseURL:  import.meta.env.VITE_API_BASE_URL   then add /api in the base url  in .env created
    //as defined in .env file created in react folder

});



//create interceptors ,-  special functions executed before request sent or response received

axiosClient.interceptors.request.use( (config)=> {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = "Bearer "+token;  
    console.log(config)     
    return config;
} );

axiosClient.interceptors.response.use((response) => {
//onFulfilled
return response
},  (error) => {
        //onrejected
        try{
const {response} = error;
if(response.status === 401){
    console.log(response)
    // inavlid, expired or rejected token
   localStorage.removeItem("ACCESS_TOKEN")
}
} catch(e){
    console.error(e)
}

 throw error;
});

export default axiosClient;