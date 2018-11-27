"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
const restify_errors_1 = require("restify-errors");
class UsersRouter extends router_1.Router {
    applyRouters(application) {
        // GET
        application.get('/users', (req, resp, next) => {
            users_model_1.User.find()
                .then(users => {
                resp.json(users);
                return next();
            })
                .catch(next);
        });
        // GET BY ID
        application.get('/users/:id', (req, resp, next) => {
            if (!this.isValidId(req.params.id)) {
                resp.send(400);
                return next();
            }
            users_model_1.User.findById(req.params.id)
                .then(user => {
                if (!user) {
                    throw new restify_errors_1.NotFoundError();
                }
                resp.json(user);
                return next();
            })
                .catch(next);
        });
        // POST
        application.post('/users', (req, resp, next) => {
            let user = new users_model_1.User(req.body);
            user.save()
                .then(() => {
                // escondendo o password para mostrar na resposta
                user.password = undefined;
                resp.status(201);
                resp.json(user);
                return next();
            })
                .catch(next);
        });
        // PUT
        application.put('/users/:id', (req, resp, next) => {
            if (!this.isValidId(req.params.id)) {
                resp.send(400);
                return next();
            }
            const options = {
                overwrite: true
            };
            users_model_1.User.update({ _id: req.params.id }, req.body, options)
                .then(result => {
                if (!result.n) {
                    throw new restify_errors_1.NotFoundError();
                }
                resp.send(204);
                return next();
            })
                .catch(next);
        });
        // PATCH
        application.patch('/users/:id', (req, resp, next) => {
            if (!this.isValidId(req.params.id)) {
                resp.send(400);
                return next();
            }
            const options = {
                new: true
            };
            users_model_1.User.findByIdAndUpdate({ _id: req.params.id }, req.body, options)
                .then(user => {
                if (!user) {
                    throw new restify_errors_1.NotFoundError();
                }
                resp.send(204);
                return next();
            })
                .catch(next);
        });
        // DELETE
        application.del('/users/:id', (req, resp, next) => {
            if (!this.isValidId(req.params.id)) {
                resp.send(400);
                return next();
            }
            users_model_1.User.findByIdAndRemove({ _id: req.params.id })
                .then(user => {
                if (!user) {
                    throw new restify_errors_1.NotFoundError();
                }
                resp.send(204);
                return next();
            })
                .catch(next);
        });
    }
}
exports.usersRouter = new UsersRouter();
