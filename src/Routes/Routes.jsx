import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import SingleCard from "../Pages/SIngleCard/SingleCard";
import CreateAssignment from "../Pages/CreateAssignment/CreateAssignment";
import MyAssignments from "../Pages/MyAssignments/MyAssignments";
import PrivateRoutes from "./PrivateRoutes";
import UpdateAssignment from "../Pages/UpdateAssignment/UpdateAssignment";
import PendingAssignments from "../Pages/PendingAssingments/PendingAssignments";
import AllAssignments from "../Pages/AllAssignments/AllAssignments";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/assignments/:id',
                element: <PrivateRoutes><SingleCard></SingleCard></PrivateRoutes>,
                loader: ({params}) => fetch(`https://assignment-11-server-xi-flame.vercel.app/assignments/${params.id}`) 
            },
            {
                path: '/create-assignments',
                element: <PrivateRoutes><CreateAssignment></CreateAssignment></PrivateRoutes>
            },
            {
                path: '/my-assignments',
                element: <PrivateRoutes><MyAssignments></MyAssignments></PrivateRoutes>
            },
            {
                path: '/update-assignments/:id',
                element: <UpdateAssignment></UpdateAssignment>
            },
            {
                path: '/pending-assignments',
                element: <PrivateRoutes><PendingAssignments></PendingAssignments></PrivateRoutes>
            },
            {
                path: 'all-assignments',
                element: <AllAssignments></AllAssignments>
            },
            {
                path: 'update-profile',
                element: <UpdateProfile></UpdateProfile>
            }
        ]
    },
]);

export default router;