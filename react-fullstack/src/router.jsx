import Login from  "./views/login";
import SignUp from  "./views/signup";
import Users from  "./views/users";
import NotFound from  "./views/notfound";
import Dashboard from  "./views/dashboard";
import DefaultLayout from  "./components/DefaultLayout"; 
import GuestLayout from  "./components/GuestLayout"; 
import{createBrowserRouter} from  "react-router-dom";
import { Navigate } from 'react-router';
import UserForm from "./views/userForm";

const router = createBrowserRouter(  [
    {
        path: "/",
        element: <DefaultLayout />,
        children:[
            {
                path: "/",
                element: <Navigate to="/users" /> 
            },
            {
                path: "/users",
                element: <Users />
            },
            {
                path: "/users/new",
                element: <UserForm key="userCreate"/>
            },
            {
                path: "/users/:id",
                element: <UserForm key="userUpdate"/>
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            }
        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children:[
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <SignUp />
            }
        ]
    },
        {
        path: "*",
        element: <NotFound />
    }

]);

export default router;