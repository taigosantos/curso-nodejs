"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRouters(application) {
        // GET users
        application.get('/users', (req, resp, next) => {
            users_model_1.User.findAll().then(users => {
                resp.json(users);
                return next();
            });
        });
        //GET BY ID users
        application.get('/users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id).then(user => {
                if (!user) {
                    resp.send(404);
                }
                resp.json(user);
                return next();
            });
        });
    }
}
exports.usersRouter = new UsersRouter();
