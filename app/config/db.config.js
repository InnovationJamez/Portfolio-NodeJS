const env = process.env.NODE_ENV || 'development';
if (env == "development" || env == "dev") {
    require('dotenv').config();
}

module.exports = {
    dbUri: process.env.DBURI,
    sessionSecret: process.env.SESSION_SECRET
}