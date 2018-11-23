"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRouters(application) {
        // GET
        application.get('/users', (req, resp, next) => __awaiter(this, void 0, void 0, function* () {
            const users = yield users_model_1.User.find();
            resp.json(users);
            return next();
        }));
        // GET BY ID
        application.get('/users/:id', (req, resp, next) => __awaiter(this, void 0, void 0, function* () {
            if (!this.isValidId(req.params.id)) {
                resp.send(400);
                return next();
            }
            const user = yield users_model_1.User
                .findById(req.params.id);
            if (!user) {
                resp.send(404);
                return next();
            }
            resp.json(user);
            return next();
        }));
        // POST
        application.post('/users', (req, resp, next) => __awaiter(this, void 0, void 0, function* () {
            let user = new users_model_1.User(req.body);
            yield user.save();
            // escondendo o password para mostrar na resposta
            user.password = undefined;
            resp.status(201);
            resp.json(user);
            return next();
        }));
        // PUT
        application.put('/users/:id', (req, resp, next) => __awaiter(this, void 0, void 0, function* () {
            if (!this.isValidId(req.params.id)) {
                resp.send(400);
                return next();
            }
            const options = {
                overwrite: true
            };
            const result = yield users_model_1.User.update({ _id: req.params.id }, req.body, options);
            if (!result.n) {
                resp.send(404);
                return next();
            }
            resp.send(204);
            return next();
        }));
        // PATCH
        application.patch('/users/:id', (req, resp, next) => __awaiter(this, void 0, void 0, function* () {
            if (!this.isValidId(req.params.id)) {
                resp.send(400);
                return next();
            }
            const options = {
                new: true
            };
            const user = yield users_model_1.User.findByIdAndUpdate({ _id: req.params.id }, req.body, options);
            if (!user) {
                resp.send(404);
                return next();
            }
            resp.send(204);
            return next();
        }));
        // DELETE
        application.del('/users/:id', (req, resp, next) => __awaiter(this, void 0, void 0, function* () {
            if (!this.isValidId(req.params.id)) {
                resp.send(400);
                return next();
            }
            const user = yield users_model_1.User.findByIdAndRemove({ _id: req.params.id });
            if (!user) {
                resp.send(404);
                return next();
            }
            resp.send(204);
            return next();
        }));
    }
}
exports.usersRouter = new UsersRouter();
