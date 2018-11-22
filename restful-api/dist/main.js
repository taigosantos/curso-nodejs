"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_router_1 = require("./users/users.router");
const server = new server_1.Server();
var routers = [
    users_router_1.usersRouter
];
server.bootstrap(routers)
    .then(server => {
    console.log('Server is listening on: ', server.application.address());
})
    .catch(error => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});
