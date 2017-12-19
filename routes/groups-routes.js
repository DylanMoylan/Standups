const express = require('express');
const groupsRoutes = express.Router();
const groupsHelpers = require('../services/groups-helpers')
const groupsController = require('../controllers/groups-controller');

groupsRoutes.post('/:id', groupsHelpers.findByGroupName, groupsController.addToGroup)
groupsRoutes.post('/', groupsController.create)
groupsRoutes.get('/:id', groupsController.index)
groupsRoutes.delete('/', groupsController.removeFromGroup)
groupsRoutes.delete('/:id', groupsController.destroyGroup)
module.exports = groupsRoutes
