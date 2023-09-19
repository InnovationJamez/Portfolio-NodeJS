const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// config
const dbUrl = require('./app/config/db.config').dbUrl;

// database
const db = require('./app/models');

// routes
const indexRoute = require('./app/routes/index.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/app/views`);
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

app.use('/', indexRoute);

// connect to mongo db
db.mongoose.connect(dbUrl, {
    useNewUrlParser: true
}).then(()=>{
    console.log("Successfully connected to MongoDB");
}).catch((err)=>{
    console.log(dbUrl);
    console.error("Connection Error", err);
    process.exit();
});

// 404 not found
app.use('/', (req, res) => {
    res.render('404');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`app is runnign at http:localhost:${PORT}`)
});