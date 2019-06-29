const contZabbix = require('./controllers/cont_zabbix')
const Joi = require('@hapi/joi')

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        server.route(
            [
                {
                    method: 'POST',
                    path: '/version',
                    handler: async (req, res) =>  contZabbix.getVersionZabbix(req, res),
                    options: {
                        validate: {
                            payload: {
                                url: Joi.string().uri().required()
                            }
                        }
                   }
                },
                {
                    method: 'POST',
                    path: '/login',
                    handler: async (req, res) => await contZabbix.authenticate(req, res),
                    options: {
                        validate: {
                            payload: {
                                url: Joi.string().uri().required(),
                                user: Joi.string().required(),
                                password: Joi.string().required(),
                                name: Joi.string().required(),
                                discription: Joi.string().required(),
                            }
                        }
                    }
                }


            ]
        )


    }
}


