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
  Standup.showAllGroup(req.user.id, req.params.id)
    .then(data => {
      res.json({
        message: 'ok',
        data
      })
    }).catch(next)
}

StandupController.create = (req, res, next) => {
  Standup.create({
    graph_position: req.body.graph_position,
    positives: req.body.positives,
    negatives: req.body.negatives
  },req.user.id)
  .then(data => {
    res.json({
      message: 'ok',
      data
    })
  }).catch(next)
}

StandupController.show = (req, res, next) => {
  Standup.show(req.user.id)
    .then(data => {
      res.json({
        message: 'ok',
        data
      })
    }).catch(next)
}

StandupController.daily = (req, res, next) => {
  let x = new Date(Date.now())
  let currentDate = `%${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}%`
  Standup.daily(req.user.id, currentDate)
  .then(data => {
    console.log(data)
    res.json({
      message: 'ok',
      data
    })
  }).catch(next)
}

module.exports = StandupController
