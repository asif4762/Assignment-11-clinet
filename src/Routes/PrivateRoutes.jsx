import { useContext } from "react";
import { AuthContext } from "../Firebase/Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading) {
        return <progress className="progress w-56"></progress>
    }

    if(user?.email){
        return children;
    }


    return <Navigate to='/login' state={location.pathname} replace={true}></Navigate>
};

export default PrivateRoutes;