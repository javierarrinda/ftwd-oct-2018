const express  = require('express');
const router   = express.Router();
const User     = require('../models/User');
const bcrypt   = require('bcryptjs');
const passport = require('passport');
const Book     = require('../models/Book');



router.get('/signup', (req, res, next)=>{
    res.render('user-views/signup-view', {message: req.flash('error')});
});
// just rendering a plain form for signing up and also passing in a variable called message equal to whatever is inside req.flash at this moment
// if there is nothing in req.flash, message will be undefined, which is why we put it inside an if statement in the hbs file

router.post('/register', (req, res, next)=>{
     User.findOne({username: req.body.username})
        .then((theUser)=>{
           
            if(theUser !== null){
                req.flash('error', 'sorry, that username is taken');
                // this is essentially equal to req.flash.error = 'sorry that username is taken'
                res.redirect('/signup')
            }

            const salt = bcrypt.genSaltSync(10);
            const theHash = bcrypt.hashSync(req.body.thePassword, salt);
// create the user and bring in all info the user filled into the form
// set admin to false because we dont want to give people the ability to sign up as admins
            User.create({
                username: req.body.theUsername,
                password: theHash,
                profilePic:  req.body.image,
                firstName: req.body.first,
                lastName: req.body.last,
                bio: req.body.bio,
                admin: false
            })
            .then((theUser)=>{
                req.login(theUser, (err) => {
                    // req.login is a passport method that allows you to log someone in with one line of code
                    // it is a method that takes an argument and the argument should be an object equal to the user you want to log in and save into the session
                    if (err) {
                        req.flash('error', 'something went wrong with auto login, please log in manually')
                        res.redirect('/login')
                      return;
                    }
            
                    res.redirect('/profile');
                  });        
            })
            .catch((err)=>{
                next(err);
            })
        })
        .catch((err)=>{
            next(err);
        })
});



router.get('/login', (req, res, next)=>{
    res.render('user-views/login', {message: req.flash('error')})
})

// the routes for the get and post do not need to match, in fact in the example above
// i used get /signup and post /register
router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  }));
  // passport.authenticate calls takes an argument and uses that argument
  // to find which strategy you want to call, in our case its the local strategy
  //defined in app.js


  router.post('/logout', (req, res, next)=>{
      req.logout()
      res.redirect('/');
  })


  router.get('/profile', (req, res, next)=>{
      Book.find({donor: req.user._id})
      .then((thisPersonsBooks)=>{
          
          res.render('user-views/profile', {user: req.user, books: thisPersonsBooks});

      })
      .catch((err)=>{
        next(err);
    
      })
    
  })


module.exports = router;


