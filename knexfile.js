require("dotenv").load();

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/pandora-db'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
};
