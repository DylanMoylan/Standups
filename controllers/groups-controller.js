const Group = require('../models/Groups')

const groupsController = {};

groupsController.create = (req,res,next) => {
  Group.createGroup(req.body.name, req.user.id)
  .then(() => {
    Group.showAll(req.user.id)
    .then(groups => {
      res.json({
        message: 'Group successfully created.',
        groups: { groups }
      })
    }).catch(next)
  }).catch(next)
}

groupsController.index = (req, res, next) => {
  Group.showAll(req.params.id)
    .then(groups => {
      res.json({
        message: 'ok',
        groups: { groups }
      })
    }).catch(next)
}

groupsController.addToGroup = (req, res, next) => {
  Group.addToGroup({
    biz_id: req.body.biz_id,
    user_id: req.params.id,
    group_name: req.body.group_name
  })
  .then(() => {
    Group.showAll(req.body.biz_id)
    .then(groups => {
      res.json({
        message: 'User successfully added to group.',
        groups: { groups }
      })
    }).catch(next)
  }).catch(next)
}

groupsController.removeFromGroup = (req, res, next) => {
  Group.removeFromGroup({
    group_name: req.body.group_name,
    user_id: req.body.user_id,
    biz_id: req.body.biz_id
  })
  .then(() => {
    Group.showAll(req.body.biz_id)
    .then(groups => {
      res.json({
        message: 'User successfully removed from group.',
        groups: { groups }
      })
    })
    .catch(next)
  })
    .catch(next)
}

groupsController.destroyGroup = (req, res, next) => {
  Group.destroyGroup({
    group_name: req.params.id,
    biz_id: req.body.biz_id
  })
  .then(() => {
    Group.showAll(req.body.biz_id)
    .then(groups => {
      res.json({
        message: 'Group successfully deleted.',
        groups: { groups }
      })
    })
    .catch(next)
  })
  .catch(next)
}

module.exports = groupsController;
