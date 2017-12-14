const express = require('express');
const commentsRoutes = express.Router();

const commentsController = require('../controllers/comments-controller');

commentsRoutes.post('/standup/:id', commentsController.standupPost)
commentsRoutes.post('/:id', commentsController.create)
commentsRoutes.get('/:id', commentsController.index)
commentsRoutes.put('/:id', commentsController.edit)
commentsRoutes.delete('/:id', commentsController.destroy)
module.exports = commentsRoutes
