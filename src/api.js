import { errorHandler } from "./utils/error-handler.js";

const API_ENDPOINT = "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const api = {
    fetchCat: async (keyword) => await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`)
        .then(respond => respond.json())
        .catch(error => console.error(errorHandler(error))),
    fetchCatRandom: async () => await fetch(`${API_ENDPOINT}/api/cats/random50`)
        .then(respond => respond.json())
        .catch(error => console.error(errorHandler(error))),
    fetchCatDetails: async (id) => await fetch(`${API_ENDPOINT}/api/cats/${id}`)
        .then(respond => respond.json())
        .catch(error => console.error(errorHandler(error)))
};
