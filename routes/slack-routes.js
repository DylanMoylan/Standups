const express = require('express')
const slackRoutes = express.Router()

const slackHelpers = require('../services/slack-helpers')

const slackController = require('../controllers/slack-controller');

slackRoutes.get('/', slackHelpers.callSlack, slackController.returnSlackList)
module.exports = slackRoutes
