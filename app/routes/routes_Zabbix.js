const express = require('express')
const router = express.Router()

const control_Zabbix = require('../controllers/controller_Zabbix')

//Получение версии заббикса
router.post('/getVersion', control_Zabbix.getVersionZabbix)

router.post('/auth', control_Zabbix.authenticate)



module.exports = router