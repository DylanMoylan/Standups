// const Slack = require('../models/Slack')

const slackController = {};

slackController.returnSlackList = (req, res, next) => {
  res.json({
    message: 'ok',
    data: res.locals
  })
}

module.exports = slackController
