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
const colors = ['green','blue','yellow','orange','purple','mediumturquoise','darkorchid']
const connectedUsers = []
const authHelpers = require('./services/auth/auth-helpers')

function instantiateUser(token) {
  return Object.keys(rooms).find(el => el === token)
}
function emitUsers(token) {
  console.log('emitting:', rooms[token])
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
  let newColor = colors.pop()
  connectedUsers.push({id: client.id, color: newColor})

  client.on('setGraph', (data) => {
    const index = connectedUsers.findIndex(item => item.id===client.id)
    connectedUsers[index] = { ...connectedUsers[index], ...data, id: client.id, }
    // const index = rooms[data.token].findIndex(item => item.id === client.id);
    // rooms[data.token][index] = data;
    // rooms[data.token][index].id = client.id
    // emitUsers(data.token)
    let thisRoom = connectedUsers.filter((el) => {
      return el.token === data.token
    })
    thisRoom.forEach((el) => {
      io.to(el.id).emit('socket-users', thisRoom)
    })
    // connectedUsers.forEach((el) => {
    //   if(el.token === data.token){
    //     io.to(el.id).emit('socket-users', )
    //   }
    // })
  })

    client.on('giveToken', (data) => {
    // console.log(data)
    //   data.id = client.id
    //   if(instantiateUser(data.token)){
    //     rooms[data.token].push(data)
    //   }else{
    //     rooms[data.token] = [data]
    //   }
    //   emitUsers(data.token)
      const index = connectedUsers.findIndex(item => item.id === client.id)
      if(connectedUsers[index]){
        connectedUsers[index] = { ...connectedUsers[index], ...data}
      }else{
        data.id = client.id
        connectedUsers.push(data)
      }
      let thisRoom = connectedUsers.filter((el) => {
        return el.token === data.token
      })
      thisRoom.forEach((el) => {
        io.to(el.id).emit('socket-users', thisRoom)
      })
    })

    client.on('end-session', (data) => {
      if(data.user){
        let thisRoom = connectedUsers.filter((el) => {
          return (el.token === data.token)
        })
        thisRoom.forEach((el) => {
          io.to(el.id).emit('session-ended','test')
        })
      }
    })
    client.on('disconnect', () => {
      console.log('a client disconnected', client.id)
      console.log('connectedUsers - before:', connectedUsers)
      let index = connectedUsers.findIndex(item => item.id === client.id)
      connectedUsers.splice(index, 1)
      console.log('connectedUsers', connectedUsers)
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
