const express = require('express')
const standupRoutes = express.Router()

const standupController = require('../controllers/standup-controller')

standupRoutes.get('/', standupController.index)
standupRoutes.get('/group/', standupController.showAllGroup)
standupRoutes.get('/:name', standupController.daily)
standupRoutes.post('/', standupController.create)

module.exports = standupRoutes
