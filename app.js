const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const methodOverride = require('method-override');
const path = require('path');


// initialize passport 
require('./app/config/passport.config')(passport);

// config
const config = require('./app/config/db.config')
const dbUri = config.dbUri;
const secret = config.sessionSecret;

// database
const db = require('./app/models');
const Role = db.role;

// routes
const indexRoute = require('./app/routes/index.routes');
const authRoute = require('./app/routes/auth.routes');
const userRoute = require('./app/routes/user.routes');
const blogRoute = require('./app/routes/blog.routes');
const commentRoute = require('./app/routes/comment.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/app/views`);
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
}));
app.use(express.static(path.join(__dirname, '/app/public')));
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// connect to mongo db
db.mongoose.connect(dbUri, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to MongoDB");
    initial();
}).catch((err) => {
    console.log(dbUrl);
    console.error("Connection Error", err);
    process.exit();
});

app.use('/', indexRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/blog', blogRoute);
app.use('/comment', commentRoute);

// 404 not found
app.use('/', (req, res) => {
    res.render('404', {
        user: req.user
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`app is runnign at http://localhost:${PORT}`)
});

// creates the roles when initially opened
const initial = async () => {
    try {
        let count = await Role.estimatedDocumentCount();
        if (count > 0) {
            return;
        }
        let len = db.ROLES.length;
        for(let i = 0; i < len; i++){
            let role = db.ROLES[i];
            let newRole = Role({ name: role });
            await newRole.save();
            console.log(`added Role ${role}`);
        }
    }
    catch(err) {
        console.log(`Error: ${err}`);
    }
}