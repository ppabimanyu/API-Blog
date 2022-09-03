const { Router } = require('express');
const m$comment = require('../modules/comment.modules');
const response = require('../helpers/response');
const userSession = require('../middleware/auth.middleware');

const CommentController = Router();

/**
 * List Comment
 * @param {number} id_article
 */

CommentController.get('/:id', async (req, res, next) => {
    const list = await m$comment.listComment(req.params.id);
    response.sendResponse(res, list);
});

/**
 * Create Comment
 * @param {number} id_article
 * @param {string} content
 * @param {number} id_user
 */

CommentController.post('/', userSession, async (req, res, next) => {
    // req body, req params, req query
    const add = await m$comment.createComment(req.body);
    response.sendResponse(res, add);
});

/**
 * Edit Comment
 * @param {string} comment
 * @param {number} id_comment
 * @param {number} id_user
 */

CommentController.put('/', userSession, async (req, res, next) => {
    const edit = await m$comment.updateComment(req.body);
    response.sendResponse(res, edit);
});

/**
 * Delete Comment
 * @param {number} id_comment
 */

CommentController.delete('/', userSession, async (req, res, next) => {
    const del = await m$comment.deleteComment(req.body);
    response.sendResponse(res, del);
});

module.exports = CommentController;