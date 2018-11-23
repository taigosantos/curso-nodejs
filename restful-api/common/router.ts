import * as restify from 'restify'
import * as mongoose from 'mongoose'

export abstract class Router {
    abstract applyRouters(application: restify.Server): void

    protected isValidId(id: string): boolean {
        return mongoose.Types.ObjectId.isValid(id)
    }
}