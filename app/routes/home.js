const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  let isUserRegistered = req.session.isUserRegistered;
  res.render('home.html', {
    isUserRegistered
  });

  req.session.isUserRegistered = undefined;
});

router.post('/register', (req, res) => {
  req.checkBody('name', 'The name must be at least 3 chars!').isLength({min: 3, max: undefined});
  req.checkBody('name', 'The name must contain only letters!').matches('^[a-zA-z ]*$');
  req.checkBody('email', 'Enter a valid email please!!').isEmail();
  req.checkBody('password', 'The password must be at least 5 chars!').isLength({min: 5, max: undefined});
  req.checkBody('password', 'The Passwords are not matching each other!').equals(req.body.password_confirmation);

  let errors = req.validationErrors();
  if(errors) res.render('home.html', {
    errors,
    formData: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.password_confirmation
    }
  });
  else {
    req.session.isUserRegistered = 'User registerd';
    res.redirect('/');
  }

});

module.exports = router;
