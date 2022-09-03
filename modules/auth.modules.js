const joi = require('joi');
const {generateToken, comparePassword, hashPassword} = require('../helpers/auth');
const m$user = require('./user.modules');


class _auth{
    login = async (data) => {
        const schema = joi.object({
            username: joi.string().required(),
            password: joi.string().required()
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
        
        const checkUsername = await m$user.getUserByUsername(data.username);
        if (!checkUsername.status) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, user not found'
            }
        }

        const isMatch = await comparePassword(data.password, checkUsername.data[0].password);
        if (!isMatch) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, password not match'
            }
        }

        const token = generateToken({ username: data.username });

        return {
            status: true,
            data: token,
        }
    }

    register = async (data) => {
        const schema = joi.object({
            username: joi.string().required(),
            password: joi.string().required()
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

        const checkUsername = await m$user.getUserByUsername(data.username);
        if (checkUsername.status) {
            return {
                status: false,
                code: 422,
                data: 'Sorry, username already exist'
            }
        }

        data.password = await hashPassword(data.password);
        
        const register = await m$user.addUser(data);
        if (!register.status) {
            return {
                status: false,
                code: 500,
                data: 'Sorry, register failed'
            }
        }

        return {
            status: true,
            data: 'Register success'
        }
    }

    logout = async (res) => {
        // res.cookie('token', '', { maxAge: 1 });
        return {
            status: true,
            data: 'Logout success'
        }
    }

    deleteAccount = async (data) => {
        const schema = joi.object({
            id_user: joi.number().required(),
            password: joi.string().required()
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

        
        const checkUsername = await m$user.getUserById(data.id_user);
        if (!checkUsername.status) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, user not found'
            }
        }

        const isMatch = await comparePassword(data.password, checkUsername.data[0].password);
        if (!isMatch) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, password not match'
            }
        }

        const deleteAccount = await m$user.deleteUser(data.id_user);
        if (!deleteAccount.status) {
            return {
                status: false,
                code: 500,
                data: `Sorry, delete account failed, Error: ${deleteAccount.error}`
            }
        }

        return {
            status: true,
            data: 'Delete account success'
        }
    }
    
    updateAccount = async (data) => {
        const schema = joi.object({
            id_user: joi.number().required(),
            username: joi.string().required(),
            password: joi.string().required()
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

        const checkUsername = await m$user.getUserById(data.id_user);
        if (!checkUsername.status) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, user not found'
            }
        }

        const isMatch = await comparePassword(data.password, checkUsername.data[0].password);
        if (!isMatch) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, password not match'
            }
        }

        const updateAccount = await m$user.updateUser(data);
        if (!updateAccount.status) {
            return {
                status: false,
                code: 500,
                data: `Sorry, update account failed, Error: ${updateAccount.error}`
            }
        }

        return {
            status: true,
            data: 'Update account success'
        }
    }

    updatePassword = async (data) => {
        const schema = joi.object({
            id_user: joi.number().required(),
            password: joi.string().required(),
            new_password: joi.string().required()
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

        const checkUsername = await m$user.getUserById(data.id_user);
        if (!checkUsername.status) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, user not found'
            }
        }

        const isMatch = await comparePassword(data.password, checkUsername.data[0].password);
        if (!isMatch) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, password not match'
            }
        }

        data.new_password = await hashPassword(data.new_password);
        const updatePassword = await m$user.updatePassword(data);
        if (!updatePassword.status) {
            return {
                status: false,
                code: 500,
                data: `Sorry, update password failed, Error: ${updatePassword.error}`
            }
        }

        return {
            status: true,
            data: 'Update password success'
        }
    }
        
}

module.exports = new _auth();