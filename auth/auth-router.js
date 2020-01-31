const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');

const { jwtSecret } = require('../config/secret.js');

router.get('/', (req, res) =>{
  res.send("This is the auth route");
})

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = signToken(saved);
      const payload = {...saved, token: token}
      res.status(201).json(payload);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {

        const token = signToken(user);

        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function signToken(user) {
  const payload = {
    id: user.id,
    name: user.username,
    type: user.type
  };

  const options = {
    expiresIn: '8h'
  }

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
