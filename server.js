/*=====Requires============*/
//=========================//
const express = require('express')
const logger = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')
const passport = require('passport')
const app = express()
require('dotenv').config()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(
  session({
    key: process.env.SECRET_KEY,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))
//=============================//
//=============================//


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
// app.get('/', (req, res) => {
//   // res.sendFile(path.join(__dirname, 'public', 'index.html'))
//   res.send('yes')
// })

//===========API ROUTES=========//
//=============================//
const authRoutes = require('./routes/auth-routes')
app.use('/api/auth', authRoutes)
// const standupRoutes = require('./routes/standup-routes')
// app.use('/api/standup', standupRoutes)
// const groupsRoutes = require('./routes/groups-routes')
// app.use('/api/groups', groupsRoutes)
// const commentsRoutes = require('./routes/comments-routes')
// app.use('/api/comments', commentsRoutes)
//=============================//
//=============================//


//=======Fallbacks============//
//=============================//
app.use('*', (req, res) => {
  res.status(400).json({
    message: 'Not Found!',
  });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    error: err,
    message: err.message,
  });
});
