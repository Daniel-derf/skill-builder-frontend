

export const useFetch = (url) => {

    const httpConfig = async (data, method) => {
        if (method === "POST") {
            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };

            try {
                const response = await fetch(url, fetchOptions);
                const json = await response.json();

                if (response.ok && json.token) {
                    localStorage.setItem('authToken', json.token);
                }

                return { status: response.status, data: json };
            } catch (error) {
                return { status: 500, data: { msg: "Internal Server Error" } };
            }
        }
    };

    return { httpConfig };
};
