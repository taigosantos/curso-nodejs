export const environment = {
    server: {
        port: process.env.SERVER_POST || 3000
    },
    db: {
        url: process.env.DB_URL || 'mongodb://localhost/meatdb'
    }
}