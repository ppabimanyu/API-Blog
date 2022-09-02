const mysql = require('../helpers/database');
const joi = require('joi');

class _comment{
    // List all comments
    listComment = async (articleId) => {
        try{
            const list = await mysql.query('SELECT * FROM d_comment WHERE article_id = ?', [articleId]);
            return {
                status: true,
                data: list,
            };
        }catch (error){
            console.error('ListComment comment module Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    // Create comment
    createComment = async (data) => {
        try {
            const schema = joi.object({
                comment: joi.string().required(),
                article_id: joi.number().required(),
                user_id: joi.number().required(),
            });
            const validate = schema.validate(data);
            if (validate.error) {
                const errorDetails = validate.error.details.map(detail => detail.message);

                return {
                    status: false,
                    code: 422,
                    error: errorDetails
                }
            }

            const createComment = await mysql.query('INSERT INTO d_comment VALUE id_user = ?, id_article = ?, comment = ?', [data.user_id, data.article_id, data.comment]);

            return {
                status: true,
                data: createComment
            }
        } catch (error) {
            console.error('CreateComment comment module Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    // Update comment
    updateComment = async (id, data) => {
        try {
            const schema = joi.object({
                comment: joi.string(),
            });
            const validate = schema.validate(data);
            if (validate.error) {
                const errorDetails = validate.error.details.map(detail => detail.message);

                return {
                    status: false,
                    code: 422,
                    error: errorDetails
                }
            }

            const updateComment = await mysql.query('UPDATE d_comment SET comment = ? WHERE id_comment = ?', [data.comment, id]);

            return {
                status: true,
                data: updateComment
            }
        } catch (error) {
            console.error('UpdateComment comment module Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    // Delete comment
    deleteComment = async (id) => {
        try {
            const schema = joi.number().required();
            const validate = schema.validate(id);
            if (validate.error) {
                const errorDetails = validate.error.details.map(detail => detail.message);

                return {
                    status: false,
                    code: 422,
                    error: errorDetails
                }
            }

            const deleteComment = await mysql.query('DELETE FROM d_comment WHERE id_comment = ?', [id]);

            return {
                status: true,
                data: deleteComment
            }
        } catch (error) {
            console.error('DeleteComment comment module Error: ', error);

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _comment();