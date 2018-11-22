import * as restify from 'restify'
import { environment } from '../common/environments';
import { Router } from '../common/router'

export class Server {

    application!: restify.Server;

    async bootstrap(routers: Router[] = []): Promise<Server> {
        await this.initRoutes(routers);
        return this;
    }

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                })

                this.application.use(restify.plugins.queryParser())

                // routes

                for (const router of routers) {
                    router.applyRouters(this.application)
                }

                this.application.listen(environment.server.port, () => {
                    resolve(this.application)
                })

            } catch (error) {
                reject(error)
            }
        })
    }
}