const Standup = require('../models/Standup')

const StandupController = {}

StandupController.index = (req, res, next) => {
  Standup.global()
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

module.exports = StandupController
