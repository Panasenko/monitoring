const mongoose = require('mongoose')
const ModelAurh = mongoose.model('AuthZabbix')

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        server.route(
            [
                {
                    method: 'GET',
                    path: '/test',
                    handler: function (request, h) {
                        new ModelAurh({"name": "maks test"}).save()

                        return "test end"


                    }
                }


            ]
        )


    }
}


