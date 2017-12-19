const Groups = require('../models/Groups')

function findByGroupName(req, res, next){
  Groups.findGroup(req.params.id)
  .then(group => {
    if(group.length > 0){
      res.locals.group = group
      next()
    }else {
      res.json({
        apiError: 'Group not found.',
        group_name: req.params.id
      })
    }
  }).catch(next)
}

module.exports = {
  findByGroupName: findByGroupName
}
