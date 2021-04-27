export default function errorHandler(response) {
    const errorTable = [
        [400, "Bad Request", "Client sent an invalid request"],
        [401, "Unauthorized", "Client failed to authenticate with the server"],
        [403, "Forbidden", "Client authenticated but does not have permission to access the requested resource"],
        [404, "Not Found", "The requested resource does not exist"],
        [412, "Precondition Failed", "One or more conditions in the request header fields evaluated to false"],
        [500, "Internal Server Error", "A generic error occurred on the server"],
        [503, "Service Unavailable", "The requested service is not available"]
    ];

    const idx = errorTable.map(e => e[0]).indexOf(response.status);
    if (idx === -1) {
        return(`${response.status} Unknown Error`);
    } else {
        return(`${response.status} ${errorTable[idx][1]}: ${errorTable[idx][2]}`);
    }
}
