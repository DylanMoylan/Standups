const Comments = require('../models/Comments')

const commentsController = {}

commentsController.standupPost = (req, res, next) => {
  Comments.standupPost({
    comment_body: req.body.comment_body,
    to_id: req.body.to_id,
    comment_type: req.params.id
  }, req.user.id)
  .then(comment => {
    res.json({
      message: 'ok',
      comment
    })
  }).catch(next)
}

commentsController.create = (req, res, next) => {
  Comments.create({
    comment_body: req.body.comment_body,
    to_id: req.body.to_id,
    comment_type: 0
  }, req.user.id)
  .then(comment => {
    res.json({
      message: 'ok',
      comment
    })
  }).catch(next)
}

commentsController.index = (req, res, next) => {
  Comments.index(req.user.id)
  .then(comments => {
    res.json({
      message: 'ok',
      comments
    })
  }).catch(next)
}

commentsController.edit =(req, res, next) => {
  Comments.edit({
    comment_body: req.body,
    id: req.params.id
  }, req.user.id)
  .then(comment => {
    res.json({
      message: 'ok',
      comment
    })
  }).catch(next)
}

commentsController.destroy = (req, res, next) => {
  Comments.destroy(req.params.id, req.user.id)
  .then(comment => {
    res.json({
      message: 'ok',
      comment
    })
  }).catch(next)
}

module.exports = commentsController
