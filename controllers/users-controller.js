const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const Groups = require('../models/Groups.js')
const usersController = {};

usersController.create = (req, res, next) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  console.log(hash)
  console.log(`name: ${req.body.name} email: ${req.body.email} permissions: ${req.body.permissions} password: ${hash} avatar: ${req.body.avatar}`)
  User.create({
    name: req.body.name,
    email: req.body.email,
    password_digest: hash
  }).then(user => {
    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json({
        message: 'user successfully created',
        auth: true,
        data: {
          user,
        }
      })
    });
  })
  .catch(next);
}

usersController.destroy = (req, res, next) => {
  User.destroy(req.user.id)
  .then(user => {
    res.status(200).json({
      message: 'user successfully deleted',
      auth: false,
      data: {
        user
      }
    })
  })
.catch(next)
}

usersController.update = (req, res, next) => {
  User.update({
    name: req.body.name,
    email: req.body.email,
    permissions: req.body.permissions,
    avatar: req.body.avatar
  },req.user.id)
  .then(user => {
    res.status(200).json({
      message: 'user successfully updated',
      auth: true,
      data: {
        user
      }
    })
  })
  .catch(next)
}

module.exports = usersController;
