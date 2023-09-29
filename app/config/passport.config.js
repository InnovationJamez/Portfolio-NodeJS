const passport = require('passport');

// local strategy
const LocalStrategy = require('passport-local').Strategy;

// user model
const db = require('../models/');
const Role = db.role;
const User = db.user;

// initialize function pass passport
module.exports = (passport) => {

    // authenticate user
    const regUser = async (req, username, password, done) => {
        if(!username || username.length == 0){
            return done(null, false, {'message': 'No email was given'});
        }

        if(!password || password.length == 0){
            return done(null, false, {'message': 'No password was given'});
        }

        let passwordTwo = req.body.passwordTwo;
        if(!passwordTwo || passwordTwo !== password){
            return done(null, false, {'message': 'The passwords do not match'});
        }

        try {
            username = username.toLowerCase();
            let user = await User.findOne({'local.username': username}).exec();
            let role = await Role.findOne({'name': 'user'}).exec();

            if(user != null){
                return done(null, false, {'message': 'That email is already in use'});
            }

            let newUser = new User();
            newUser.local.firstName = req.body.firstName;
            newUser.local.lastName = req.body.lastName;
            newUser.local.username = username;
            newUser.local.role = role._id;
            newUser.local.password = newUser.generateHash(password);

            // save user
            await newUser.save();
            return done(null, newUser);
        } 
        catch(err){
            return done(err);
        }
    }

    const authUser = async (req, username, password, done) => {

        if(!username || username.length == 0){
            return done(null, false, {'message': 'No email was given'});
        }

        if(!password || password.length == 0){
            return done(null, false, {'message': 'No password was given'});
        }

        try {
            username = username.toLowerCase();
            let user = await User.findOne({'local.username' : username});

            // no user found
            if(!user){
                return done(null, false, {'message': 'No user found'});
            }

            // check password 
            if(!user.validPassword(password)){
                return done(null, false, {'message': 'wrong password'});
            }

            // login successful!
            return done(null, user);
        }
        catch(err){
            return done(err);
        }
    }

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=>{
        User.findById(id)
        .then((user)=>{
            done(null, user);
        })
        .catch((err)=>{
            done(null, err);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, regUser));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    }, authUser))

}