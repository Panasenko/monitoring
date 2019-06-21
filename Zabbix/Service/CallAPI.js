const axios = require('axios')
const RequestBuilder = require('./RequestBuilder')

class CallAPI {
    constructor(url) {
        this.url = url
    }

    async call(url, method, token, params) {
        if (!params) {
            throw new Error("params in function callAPI is empty")
        }

        let RB = new RequestBuilder()

        try {
            let respons = await axios({
                baseURL: url,
                method: 'post',
                headers: {
                    Accept: 'application/json',
                },
                data: RB.build(method, token, params),
                timeout: 40000,
                retries: 0
            })

            return respons
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = CallAPI