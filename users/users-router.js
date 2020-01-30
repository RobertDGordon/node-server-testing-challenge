const router = require('express').Router();

const Users = require('./users-model.js');
const authorization = require('../middleware/authorization.js');
const checkType = require('../middleware/usertype.js');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

router.get('/list', authorization, checkType('admin'), (req, res) => {
  Users.findBy(req.user.type)
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;