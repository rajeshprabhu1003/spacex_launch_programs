
module.exports = class HttpRequests {
    async get(url) {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }
}

