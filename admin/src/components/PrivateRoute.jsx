import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../config";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [isValid, setIsValid] = useState(null); // null = loading

    useEffect(() => {
        if (!token) {
            setIsValid(false);
            return;
        }

        fetch(`${config}/api/auth/check-token`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    localStorage.removeItem("token");
                    setIsValid(false);
                    navigate("/");
                } else {
                    setIsValid(true);
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
                setIsValid(false);
                navigate("/");
            });
    }, [token, navigate]);

    // ⏳ While checking token
    if (isValid === null) {
        return <div>Checking authentication...</div>;
    }

    // ❌ If invalid token
    if (!isValid) {
        return <Navigate to="/" />;
    }

    // ✅ If valid token
    return children;
};

export default PrivateRoute;
