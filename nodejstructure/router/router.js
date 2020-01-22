const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');

router.post('/details', UserController.createUser);

router.get('/getgoals', UserController.createGoal);

router.post('/addCustomGoal', UserController.createCustom);

router.post('/usergoals', UserController.userGoal);

router.get('/getusergoal/:id',UserController.getUserData);

router.post('/goalsanswer',UserController.goalAnswer);

router.get('/getanswers/:id',UserController.answerData);

module.exports = router;