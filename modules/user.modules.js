// Helper databse yang dibuat
const mysql = require('../helpers/database');
const joi = require('joi');

class _user{
    // List all users
    listUser = async () => {
        try{
            const list = await mysql.query('SELECT id_user, username, created_at, updated_at FROM auth_user', []);
            return {
                status: true,
                data: list,
            };
        }catch (error){
            console.error('ListUser user module Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    getUserById = async (id) => {
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

            const detailUser = await mysql.query('SELECT * FROM auth_user WHERE id_user = ?', [id]);

            if (detailUser.length <= 0) {
                return {
                    status: false,
                    code: 404,
                    data: 'Sorry, user not found'
                }
            }


            return {
                status: true,
                data: detailUser,
            }

        } catch (error) {
            console.error('GetUserById user module Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    getUserByUsername = async (username) => {
        try {
            const schema = joi.string().required();
            const validate = schema.validate(username);
            if (validate.error) {
                const errorDetails = validate.error.details.map(detail => detail.message);
                
                return {
                    status: false,
                    code: 422,
                    error: errorDetails
                }
            }

            const detailUser = await mysql.query('SELECT * FROM auth_user WHERE username = ?', [username]);
            
            if (detailUser.length <= 0) {
                return {
                    status: false,
                    code: 404,
                    data: 'Sorry, user not found'
                }
            }

            return {
                status: true,
                data: detailUser
            }
        } catch (error) {
            console.error('GetUserByUsername user module Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    // Create new user
    addUser = async (body) => {
        try {
            const schema = joi.object({
                username: joi.string().required(),
                // email: joi.string().email().required(),
                password: joi.string().required(),
            });

            const { error, value } = schema.validate(body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', '),
                }
            }

            const add = await mysql.query('INSERT INTO auth_user (username, password) VALUES (?, ?)', [body.username, body.password]);

            return {
                status: true,
                data: add,
            };
        }
        catch (error) {
            console.error('CreateUser user module Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    updateUser = async (data) => {
        try {
            const schema = joi.object({
                id_user: joi.number().required(),
                username: joi.string().required(),
                password: joi.string().required()
            });

            const { error, value } = schema.validate(data);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', '),
                }
            }

            const update = await mysql.query('UPDATE auth_user SET username = ? WHERE id_user = ?', [data.username, data.id_user]);

            return {
                status: true,
                data: update,
            };
        }
        catch (error) {
            console.error('UpdateUser user module Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    updatePassword = async (data) => {
        try {
            const schema = joi.object({
                id_user: joi.number().required(),
                password: joi.string().required(),
                new_password: joi.string().required()
            });

            const { error, value } = schema.validate(data);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', '),
                }
            }

            console.log(data.password)
            console.log(data.new_password)

            const update = await mysql.query('UPDATE auth_user SET password = ? WHERE id_user = ?', [data.new_password, data.id_user]);

            return {
                status: true,
                data: update,
            };
        }
        catch (error) {
            console.error('UpdatePassword user module Error: ', error);
            
            return {
                status: false,
                error
            }
        }
    }

    deleteUser = async (id) => {
        try {
            const body = { id };
            const schema = joi.object({
                id: joi.number().required(),
            });

            const { error, value } = schema.validate(body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', '),
                }
            }

            const del = await mysql.query('DELETE FROM auth_user WHERE id_user = ?', [id]);

            return {
                status: true,
                data: del,
            };
        }
        catch (error) {
            console.error('DeleteUser user module Error: ', error);

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _user();