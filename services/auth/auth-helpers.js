const bcrypt = require('bcryptjs');
const Groups = require('../../models/Groups')
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function findGroup(req, res, next) {
  Groups.findGroup(req.body.group)
  .then(group => {
    if(group&& group.length > 0) {
      next()
    }else{
      res.json({
        apiError: 'Group not found',
        group
      })
    }
  }).catch(err => {
    res.status(500).json({
      message: 'Server Error,'
    })
  })
}

module.exports = {
  comparePass,
  findGroup,
}
