import { ReactNode } from "react";
import { Role } from "../models/user.model";
import { Navigate } from "react-router-dom";
import { isLoginAccount } from "../services/user.service";

const ProtectRouter = ({role, children}: {role: Role, children: ReactNode}) => {
    return isLoginAccount(role) ? children : <Navigate to="/login" />;
}

export default ProtectRouter;