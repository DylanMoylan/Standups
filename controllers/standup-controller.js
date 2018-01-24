const Standup = require('../models/Standup')

const StandupController = {}

function getCurrentDate() {
  let x = new Date(Date.now())
  let month = x.getMonth()+1;
  if(month.toString().length < 2){
    month = '0' + month
  }
  let date = x.getDate()
  if(date.toString().length < 2){
    date = '0' + date
  }
  let currentDate = `%${x.getFullYear()}-${month}-${date}%`
  return currentDate
}

StandupController.index = (req, res, next) => {
  let currentDate = `%${getCurrentDate()}%`
  Standup.global(currentDate)
  .then(plot => {
    res.json({
      message: 'ok',
      plot
    })
  }).catch(next)
}

StandupController.findByDate = (req, res, next) => {
  let date = `%${req.params.date}%`
  Standup.findByDate(date, req.user.id)
  .then(data => {
    res.json({
      message: 'ok',
      data
    })
  }).catch(next)
}

StandupController.showAllGroup = (req, res, next) => {
  Standup.showAllGroup(req.user.id)
    .then(data => {
      res.json({
        message: 'ok group',
        data
      })
    }).catch(next)
}

StandupController.datesList = (req, res, next) => {
  let currentDate = getCurrentDate()
  Standup.datesList(req.user.id)
    .then(data => {
       res.locals.dateList = data;
    })
    .then(() => {
      Standup.findByDate(currentDate, req.user.id)
      .then(today => {
        res.json({
          message: 'ok dates',
          dates: res.locals.dateList,
          today: today
        })
      }).catch(next)
    }).catch(next)
}

StandupController.create = (req, res, next) => {
  let standups = req.body.connectedUsers.map((el) => {
    if(el.graph_position) {
      el.graph_position = `${el.graph_position.x},${el.graph_position.y}`
    }
    return el
  })
  Standup.createSeveral(standups, req.user.id)
    .then(data => {
      res.json({
        message: 'ok',
        data
      })
    }).catch(next)
}

StandupController.daily = (req, res, next) => {
  Standup.daily(req.user.id, getCurrentDate())
  .then(data => {
    console.log(data)
    res.json({
      message: 'ok daily',
      data
    })
  }).catch(next)
}

module.exports = StandupController
