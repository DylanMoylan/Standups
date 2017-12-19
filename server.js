/*=====Requires============*/
//=========================//
const express = require('express')
const logger = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
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


/*=====SOCKET.IO CODE=======*/
//=========================//
const http = require('http').Server(app)
var io = require('socket.io')(http);
const connectedUsers = {}
io.on('connection', function(client){
  connectedUsers[client.id] = {}
  io.emit('receiveGroupInvite', {
    groupName: 'abcdefg'
  })
  console.log('a user connected');
  client.on('test', (test) => {
    console.log(test)
  })
  client.on('disconnect', () => {
    delete connectedUsers[client.id]
  })
});

http.listen(3002, () => {
  console.log('Server listening on port 3002')
})
//=========================//
//=========================//


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
const standupRoutes = require('./routes/standup-routes')
app.use('/api/standup', standupRoutes)
const groupsRoutes = require('./routes/groups-routes')
app.use('/api/groups', groupsRoutes)
const commentsRoutes = require('./routes/comments-routes')
app.use('/api/comments', commentsRoutes)
const slackRoutes = require('./routes/slack-routes')
app.use('/api/slack', slackRoutes)
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
