const env = process.env;
export default {
    db: {  /* don't expose password or any sensitive info, done only for demo */
        host: env.DB_HOST || 'your host',
        user: env.DB_USER || 'your user',
        password: env.DB_PASSWORD || 'your pass',
        database: env.DB_NAME || 'your db name',
    },
    listPerPage: env.LIST_PER_PAGE || 10,
    activeProxy: false,
    maintenance: false,
   
}
