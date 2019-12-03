var express = require('express');
var router = express.Router();

var chatHistory = [];
var nicknames = [];
//var changed = false;

router.get('/', function(req, res, next) {
	res.send({ message: 'fhs chat-app api works' });
});

/* GET users listing. */
router.get('/history/change', function(req, res, next) {
	for (var i; i < nicknames.length; i++) {
		if (Object.nicknames.keys('name') == req.body.name) {
			res.send(Object.nicknames[i].changed);
		}
	}
});
router.get('/history', function(req, res, next) {
	res.send(chatHistory);
	for (var i; i < nicknames.length; i++) {
		if (Object.nicknames.keys('name') == req.body.name) {
			Object.nicknames[i].changed = false;
		}
	}
});
router.post('/history', function(req, res, next) {
	chatHistory.push({
		name: req.body.name,
		content: req.body.content,
		timesent: req.body.timesent,
		firstmessage: req.body.firstmessage,
		namechange: req.body.namechange
	});
	for (var i; i < nicknames.length; i++) {
		if (Object.nicknames.keys('name') == req.body.name) {
			Object.nicknames[i].changed = true;
		} else {
			nicknames.push({
				name: req.body.name,
				changed: true
			});
			Object.nicknames[i].changed = true;
		}
	}

	//changed = true;

	//Zuerst wird geprüft ob Message Array grösser als 11 ist
	if (chatHistory.length > 20) {
		console.log(chatHistory.length);
		//Von ersten bis zur zwangigsten nachricht werden alle gelöscht aus dem Array
		chatHistory.splice(0, chatHistory.length - 19);
	}
	res.json({ message: 'History created!' });
});
module.exports = router;
