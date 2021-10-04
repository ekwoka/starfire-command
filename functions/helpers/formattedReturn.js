export default (statusCode, body) => {
    return {
        statusCode,
        body: JSON.stringify(body),
    };
};