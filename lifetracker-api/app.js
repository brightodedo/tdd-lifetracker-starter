//All import statements
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes/auth')
const security = require('./middleware/security')
const {NotFoundError} = require('./utils/errors')

//instantiate the app 
const app = express()

//put in the middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(security.extractUserFromJwt)

//mount the router
app.use('/auth', router)

//health check route 
app.get('/', (req, res) => {
    res.status(200).json({ping:"pong"})
})

app.use((req, res, next) => {
    return next(new NotFoundError())
})

app.use((err,req,res,next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error : {message, status}
    }
    )
})

module.exports = app