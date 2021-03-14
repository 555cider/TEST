const API_ENDPOINT = "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
    fetchCat: async keyword => {
        try {
            const response = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
            return response.json();
        } catch (e) {
            console.warn(e);
        }
    },
    fetchCatRandom: async () => {
        try {
            const response = await fetch(`${API_ENDPOINT}/api/cats/random50`);
            return response.json();
        } catch (e) {
            console.warn(e);
        }
    },
    fetchCatDetails: async id => {
        try {
            const response = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
            return response.json();
        } catch (e) {
            console.warn(e);
        }
    }
};

export default api;