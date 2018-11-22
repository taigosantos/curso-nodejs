import { Router } from '../common/router'
import * as restify from 'restify'
import { User } from './users.model';

class UsersRouter extends Router {
    applyRouters(application: restify.Server): void {

        // GET users

        application.get('/users', (req, resp, next) => {

            User.findAll().then(users => {
                resp.json(users)
                return next()
            });

        })

        //GET BY ID users

        application.get('/users/:id', (req, resp, next) => {

            User.findById(req.params.id).then(user => {

                if (!user) {
                    resp.send(404)
                }

                resp.json(user)
                return next()
            });

        })

    }
}

export const usersRouter = new UsersRouter();