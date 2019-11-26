var express = require('express');
var router = express.Router();

var chatHistory = [];
var nicknames = [];

router.get('/', function(req, res, next) {
	res.send({ message: 'fhs chat-app api works' });
});

/* GET users listing. */
router.get('/history', function(req, res, next) {
	res.send(chatHistory);
});
router.post('/history', function(req, res, next) {
	chatHistory.push({
		name: req.body.nickname,
		content: req.body.message,
		date: req.body.date,
		firstmessage: req.body.firstmessage,
		changename: req.body.changename
	});
	res.json({ message: 'History created!' });
});
module.exports = router;
