import { Router } from '../common/router'
import * as restify from 'restify'
import { User } from './users.model';
import { request } from 'http';

class UsersRouter extends Router {
    applyRouters(application: restify.Server): void {

        // GET

        application.get('/users', async (req, resp, next) => {

            const users = await User.find()

            resp.json(users)
            return next()

        })

        // GET BY ID

        application.get('/users/:id', async (req, resp, next) => {

            if (!this.isValidId(req.params.id)) {
                resp.send(400)
                return next()
            }

            const user = await User
                .findById(req.params.id)

            if (!user) {
                resp.send(404)
                return next()
            }

            resp.json(user)
            return next()

        })

        // POST

        application.post('/users', async (req, resp, next) => {

            let user = new User(req.body)
            await user.save()

            // escondendo o password para mostrar na resposta
            user.password = undefined

            resp.status(201)
            resp.json(user)
            return next()

        })

        // PUT

        application.put('/users/:id', async (req, resp, next) => {

            if (!this.isValidId(req.params.id)) {
                resp.send(400)
                return next()
            }

            const options = {
                overwrite: true
            }

            const result = await User.update({ _id: req.params.id }, req.body, options)

            if (!result.n) {
                resp.send(404)
                return next()
            }

            resp.send(204)
            return next()

        })

        // PATCH

        application.patch('/users/:id', async (req, resp, next) => {

            if (!this.isValidId(req.params.id)) {
                resp.send(400)
                return next()
            }

            const options = {
                new: true
            }

            const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, options)

            if (!user) {
                resp.send(404)
                return next()
            }

            resp.send(204)
            return next()

        })

        // DELETE

        application.del('/users/:id', async (req, resp, next) => {

            if (!this.isValidId(req.params.id)) {
                resp.send(400)
                return next()
            }
            
            const user = await User.findByIdAndRemove({ _id: req.params.id })

            if (!user) {
                resp.send(404)
                return next()
            }

            resp.send(204)
            return next()

        })

    }
}

export const usersRouter = new UsersRouter();