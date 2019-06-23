const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

require('./app/database/MongoDB')

const ZabbixAPIRoutes = require('./app/routes/routes_Zabbix')


const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/zabbix', ZabbixAPIRoutes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.json({massage: "bad request"})
});


module.exports = app





