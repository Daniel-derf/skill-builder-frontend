import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const { isLoggedIn } = useAuthStatus("http://localhost:3001/token");
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            if (isLoggedIn !== null) {
                setLoading(false);
                if (!isLoggedIn) {
                    navigate('/login');
                }
            }
        }, [isLoggedIn, navigate]);

        if (loading) {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
