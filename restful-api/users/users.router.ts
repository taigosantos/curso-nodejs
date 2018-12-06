import { Router } from '../common/router'
import * as restify from 'restify'
import { User } from './users.model';
import { NotFoundError } from 'restify-errors';

class UsersRouter extends Router {
    applyRouters(application: restify.Server): void {

        // GET

        application.get('/users', (req, resp, next) => {

            User.find()
                .then(users => {
                    resp.json(users)
                    return next()
                })
                .catch(next)

        })

        // GET BY ID

        application.get('/users/:id', (req, resp, next) => {

            if (!this.isValidId(req.params.id)) {
                resp.send(400)
                return next()
            }

            User.findById(req.params.id)
                .then(user => {

                    if (!user) {
                        resp.status(404)
                        return next()
                    }

                    resp.json(user)
                    return next()

                })
                .catch(next)

        })

        // POST

        application.post('/users', (req, resp, next) => {

            let user = new User(req.body)
            user.save()
                .then(() => {

                    // escondendo o password para mostrar na resposta
                    user.password = undefined

                    resp.status(201)
                    resp.json(user)
                    return next()

                })
                .catch(next)

        })

        // PUT

        application.put('/users/:id', (req, resp, next) => {

            if (!this.isValidId(req.params.id)) {
                resp.send(400)
                return next()
            }

            const options = {
                overwrite: true
            }

            User.update({ _id: req.params.id }, req.body, options)
                .then(result => {

                    if (!result.n) {
                        throw new NotFoundError()
                    }

                    resp.send(204)
                    return next()

                })
                .catch(next)

        })

        // PATCH

        application.patch('/users/:id', (req, resp, next) => {

            if (!this.isValidId(req.params.id)) {
                resp.send(400)
                return next()
            }

            const options = {
                new: true
            }

            User.findByIdAndUpdate({ _id: req.params.id }, req.body, options)
                .then(user => {

                    if (!user) {
                        throw new NotFoundError()
                    }

                    resp.send(204)
                    return next()

                })
                .catch(next)

        })

        // DELETE

        application.del('/users/:id', (req, resp, next) => {

            if (!this.isValidId(req.params.id)) {
                resp.send(400)
                return next()
            }

            User.findByIdAndRemove({ _id: req.params.id })
                .then(user => {

                    if (!user) {
                        throw new NotFoundError()
                    }

                    resp.send(204)
                    return next()

                })
                .catch(next)

        })

    }
}

export const usersRouter = new UsersRouter();