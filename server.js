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
const rooms = {}
const authHelpers = require('./services/auth/auth-helpers')

function instantiateUser(token) {
  return Object.keys(rooms).find(el => el === token)
}
function emitUsers(token) {
  rooms[token].forEach((el) => {
    io.to(el.id).emit('socket-users', rooms[token])
  })
}

app.get('/genurl', authHelpers.genUrl, (req, res) => {
  rooms[res.locals.newRoom] = []
  res.json({
    message: 'Room created',
    token: res.locals.newRoom
  })
})
const http = require('http').Server(app)
var io = require('socket.io')(http);
io.on('connection', function(client){
  console.log('a user connected', client.id);
  client.on('setGraph', (data) => {
    console.log('setgraph data',data)
    console.log('rooms setgraph:',rooms, client.id)
    let activeClient = rooms[data.token].find(el => el.id === client.id)
    activeClient.x = data.graph_position.x
    activeClient.y = data.graph_position.y
    activeClient.positives = data.positives
    activeClient.negatives = data.negatives
    emitUsers(data.token)
  })
  client.on('giveToken', (data) => {
    console.log(data)
      data.id = client.id
      if(instantiateUser(data.token)){
        rooms[data.token].push(data)
      }else{
        rooms[data.token] = [data]
      }
      emitUsers(data.token)
    })

    client.on('disconnect', () => {
      console.log('a client disconnected')
      // let findClient
      // for(item in rooms) {
      //   let foundClient = rooms[item].forEach(function(el, index) {
      //     if(el.id === client.id){
      //       findClient = index
      //     }
      //   })
      //   rooms[item].splice(findClient, 1)
      // }
    })
  })

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
