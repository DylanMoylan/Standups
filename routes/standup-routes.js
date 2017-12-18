const express = require('express')
const standupRoutes = express.Router()

const standupController = require('../controllers/standup-controller')

standupRoutes.get('/', standupController.index)
standupRoutes.get('/group/:id', standupController.showAllGroup)
standupRoutes.post('/', standupController.create)
standupRoutes.get('/:id', standupController.show)

module.exports = standupRoutes
