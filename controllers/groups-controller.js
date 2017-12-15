const Group = require('../models/Groups')

const groupsController = {};

groupsController.addToGroup = (req, res, next) => {
  Group.addToGroup({
    group_name: req.body.group_name,
    user_id: req.params.id
  }, req.user.id)
  .then(group => {
    res.json({
      message: 'ok',
      group
    })
  }).catch(next)
}

groupsController.create = (req,res,next) => {
  Group.createGroup(req.body.group_name, req.user.id)
  .then(group => {
    res.json({
      message: 'Group successfully created.',
      group
    })
  }).catch(next)
}

groupsController.index = (req, res, next) => {
  Group.index(req.params.id)
    .then(group => {
      res.json({
        message: 'ok',
        group
      })
    }).catch(next)
}

groupsController.removeFromGroup = (req, res, next) => {
  Group.removeFromGroup({
    group_name: req.body.group_name,
    user_id: req.body.user_id
  }, req.user.id)
  .then(group => {
    res.json({
      message: 'User successfully removed from group.',
      group
    })
  }).catch(next)
}

groupsController.destroyGroup = (req, res, next) => {
  Group.destroyGroup(req.params.id, req.user.id)
  .then(group => {
    res.json({
      message: 'Group successfully deleted.',
      group
    })
  }).catch(next)
}

module.exports = groupsRoutes

