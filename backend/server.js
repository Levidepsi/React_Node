import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import postRouter from './routes/post.js'
import authRoutes from './routes/auth.js'
// import expressValidator from 'express-validator'

dotenv.config()

const app = express()



// Middleware


app.use(morgan('dev'))

app.use(express.json({
    limit: '30mb',
    extended: true
}))

app.use(express.urlencoded({
    limit: '30mb',
    extended: true
}))
// app.use(cookieParser())
// app.use(expressValidator())

app.use('/posts', postRouter)
app.use('/', authRoutes)



const PORT = process.env.PORT || 4000



mongoose.connect(DBConnection, {useNewUrlParser: true, useUnifiedTopology: true})

    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
            console.log('DB CONNECTED')
        })
    })

    .catch((error) => {
        console.log(error.message)
    })
