import { useEffect, useState } from "react";

export const useAuthStatus = (url) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const token = localStorage.getItem('authToken');

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error on verifying auth:", error);
                setIsLoggedIn(false);
            } 
        };

        checkAuthStatus();
    }, [url]); 

    return { isLoggedIn };
};
