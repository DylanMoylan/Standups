const Standup = require('../models/Standup')

const StandupController = {}

StandupController.index = (req, res, next) => {
  let x = new Date(Date.now())
  let currentDate = `%${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}%`
  console.log(currentDate)
  Standup.global(currentDate)
  .then(plot => {
    res.json({
      message: 'ok',
      plot
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

// StandupController.create = (req, res, next) => {
//   Standup.create({
//     graph_position: req.body.graph_position,
//     positives: req.body.positives,
//     negatives: req.body.negatives,
//     name: req.body.name
//   },req.user.id)
//   .then(data => {
//     res.json({
//       message: 'ok',
//       data
//     })
//   }).catch(next)
// }

StandupController.create = (req, res, next) => {
  let standups = req.body.map((el) => {
    el.graph_position = `${el.graph_position.x},${el.graph_position.y}`
    return el
  })
  Standup.createSeveral(standups, req.user.id)
    .then(data => {
      res.status(200).json({
        message: 'ok',
        data
      })
    })
}

StandupController.daily = (req, res, next) => {
  let x = new Date(Date.now())
  let currentDate = `%${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}%`
  Standup.daily(req.user.id, currentDate)
  .then(data => {
    console.log(data)
    res.json({
      message: 'ok daily',
      data
    })
  }).catch(next)
}

module.exports = StandupController
