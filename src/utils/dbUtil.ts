const knex = require('knex')({
    client: 'mysql2',
    logging: false,
    connection: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.PORTMYSQL || 3306,
    },
    pool: { min: 0, max: 50 },
    timezone: '+07:00'
});
export default knex;