const UserController = require("./controllers/UserController");
const ArticleController = require("./controllers/ArticleController");
const CommentController = require("./controllers/CommentController");
const AuthController = require("./controllers/AuthController");


// Define url API in here
const _routes = [
    ['/auth', AuthController],
    ['/user', UserController],
    ['/article', ArticleController],
    ['/comment', CommentController],
];

// hrrp://localhost:5001/todos
const routes = (app) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(`/api${url}`, controller);
    })
}

module.exports = routes;