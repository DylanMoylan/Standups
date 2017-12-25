const express = require('express')
const standupRoutes = express.Router()

const standupController = require('../controllers/standup-controller')

standupRoutes.get('/', standupController.index)
standupRoutes.get('/dates/', standupController.datesList)
standupRoutes.get('/group/', standupController.showAllGroup)
standupRoutes.get('/:date([0-9]{4}[-][0-9]{2}[-][0-9]{2})', standupController.findByDate)
standupRoutes.get('/:user([0-9]{1}$)', standupController.daily)
standupRoutes.post('/', standupController.create)

module.exports = standupRoutes
