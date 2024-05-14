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
                loader: ({params}) => fetch(`http://localhost:5500/assignments/${params.id}`) 
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
                element: <PendingAssignments></PendingAssignments>
            },
            {
                path: 'all-assignments',
                element: <AllAssignments></AllAssignments>
            }
        ]
    },
]);

export default router;