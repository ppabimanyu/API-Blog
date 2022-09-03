const mysql = require('../helpers/database');
const joi = require('joi');

class _article{
    // List all articles
    listArticle = async () => {
        try{
            const list = await mysql.query('SELECT * FROM d_article', []);
            return {
                status: true,
                data: list,
            };
        }catch (error){
            console.error('ListArticle article module Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    // Detail article
    detailArticle = async (id) => {
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

            const detailArticle = await mysql.query('SELECT id_article, id_user, title, content, created_at, updated_at FROM d_article WHERE id_article = ?', [id]);

            if (detailArticle.length <= 0) {
                return {
                    status: false,
                    code: 404,
                    data: 'Sorry, article not found'
                }
            }

            return {
                status: true,
                data: detailArticle[0]
            }
        } catch (error) {
            console.error('DetailArticle article module Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    // Add article
    addArticle = async (data) => {
        try {
            const schema = joi.object({
                id_user: joi.number().required(),
                title: joi.string().required(),
                content: joi.string().required(),
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

            const add = await mysql.query('INSERT INTO d_article (id_user, title, content) VALUES (?, ?, ?)', [data.id_user, data.title, data.content]);

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('AddArticle article module Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    // Edit article
    editArticle = async (data) => {
        try {
            const schema = joi.object({
                id_article: joi.number().required(),
                id_user: joi.number().required(),
                title: joi.string().required(),
                content: joi.string().required(),
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

            const edit = await mysql.query('UPDATE d_article SET title = ?, content = ? WHERE id_article = ? AND id_user', [data.title, data.content, data.id_article, data.id_user]);

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('EditArticle article module Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    // Delete article
    deleteArticle = async (data) => {
        try {
            const schema = joi.object({
                id_article: joi.number().required(),
                id_user: joi.number().required(),
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

            const del = await mysql.query('DELETE FROM d_article WHERE id_article = ? AND id_user = ?', [data.id_article, data.id_user]);

            return {
                status: true,
                data: del
            }
        } catch (error) {
            console.error('DeleteArticle article module Error: ', error);

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _article();