const env = process.env.NODE_ENV || 'production';
if(env !== "development"){
    require('dotenv').config();
}

module.exports = {
    dbUri: process.env.DBURI,
    sessionSecret: process.env.SESSION_SECRET
}