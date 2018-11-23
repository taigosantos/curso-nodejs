"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    server: {
        port: process.env.SERVER_POST || 3000
    },
    db: {
        url: process.env.DB_URL || 'mongodb://localhost/meatdb'
    }
};
