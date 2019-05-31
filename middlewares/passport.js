var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var docgiaModel = require('../models/docgia.model');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    var ls = new LocalStrategy({
        usernameField: 'tendn',
        passwordField: 'matkhau'
    }, (tendn, matkhau, done) => {
        docgiaModel.singleByUserName(tendn).then(rows => {
            if (rows.length === 0) {
                return done(null, false, { message: 'Invalid username.' });
            }

            var user = rows[0];
            var ret = bcrypt.compareSync(matkhau, rows[0].Password);
            if (ret) {
                return done(null, user);
            }

            return done(null, false, { message: 'Invalid password.' });
        }).catch(err => {
            return done(err, false);
        })
    });

    passport.use(ls);

    passport.serializeUser((user, done) => {
        return done(null, user);
    });

    passport.deserializeUser((user, done) => {
        return done(null, user);
    });
}