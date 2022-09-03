const { Router } = require('express');
const m$auth = require('../modules/auth.modules');
const response = require('../helpers/response');
const userSession = require('../middleware/auth.middleware');

const AuthController = Router();

/**
 * Login
 * @param {string} username
 * @param {string} password
 */

AuthController.post('/login', async (req, res, next) => {
    req.cookies = req.headers.cookie;
    const login = await m$auth.login(req.body);
    response.sendResponse(res, login);
});

/**
 * Register
 * @param {string} username
 * @param {string} password
 */

AuthController.post('/register', async (req, res, next) => {
    const register = await m$auth.register(req.body);
    response.sendResponse(res, register);
});

/**
 * Logout
 */

AuthController.post('/logout', userSession, async (req, res, next) => {
    const logout = await m$auth.logout(req.body);
    response.sendResponse(res, logout);
});

/**
 * Delete Account
 * @param {string} password
 * @return {number} id_user
 */

AuthController.delete('/', userSession, async (req, res, next) => {
    const deleteAccount = await m$auth.deleteAccount(req.body);
    response.sendResponse(res, deleteAccount);
});

/**
 * Update Account
 * @param {string} username
 * @param {string} password
 * @return {number} id_user
 */

AuthController.put('/', userSession, async (req, res, next) => {
    const updateAccount = await m$auth.updateAccount(req.body);
    response.sendResponse(res, updateAccount);
});

/**
 * Update Password
 * @param {string} password
 * @param {string} newPassword
 * @return {number} id_user
 */

AuthController.put('/password', userSession, async (req, res, next) => {
    const updatePassword = await m$auth.updatePassword(req.body);
    response.sendResponse(res, updatePassword);
});

module.exports = AuthController;