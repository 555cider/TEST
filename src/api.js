import errorHandler from "./utils/error-handler.js";

const API_ENDPOINT = "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
    fetchCat: async (keyword) => {
        const response = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
        if (response.ok) {
            return response.json();
        } else {
            alert(errorHandler(response));
            console.error(errorHandler(response));
        }
    },
    fetchCatRandom: async () => {
        const response = await fetch(`${API_ENDPOINT}/api/cats/random50`);
        if (response.ok) {
            return response.json();
        } else {
            alert(errorHandler(response));
            console.error(errorHandler(response));
        }
    },
    fetchCatDetails: async (id) => {
        const response = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
        if (response.ok) {
            return response.json();
        } else {
            alert(errorHandler(response));
            console.error(errorHandler(response));
        }
    }
};

export default api;