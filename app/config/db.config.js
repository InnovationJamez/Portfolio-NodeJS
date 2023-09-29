if(process.env.NODE_ENV !== "development"){
    require('dotenv').config();
}

module.exports = {
    dbUrl: `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.sv0xg.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
}