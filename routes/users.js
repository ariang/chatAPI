var express=require('express');
var router=express.Router();

var chatHistory=[];
var nicknames=[];
var count=[{ c: 0 }];

router.get('/', function (req, res, next) {
	res.send({ message: 'fhs chat-app api works' });
});

/* GET users listing. */
router.get('/history/change', function (req, res, next) {
	res.send(count);
});
router.get('/history', function (req, res, next) {
	res.send(chatHistory);
});
router.get('/history/name', function (req, res, next) {
	res.send(nicknames);
});
router.get('/history/name/:id', function (req, res, next) {
	for (var nickname of nicknames) {
		if (nickname.id.localeCompare(req.params.id)==0) {
			res.send(nickname)
		}
	}
});

router.put('/history/name/:id', function (req, res, next) {
	for (var nickname of nicknames) {
		if (nickname.id.localeCompare(req.params.id)==0) {
			nickname.name=req.body.name
		}
	}
});

router.post('/history', function (req, res, next) {
	chatHistory.push({
		name: req.body.name,
		oldname: req.body.oldname,
		content: req.body.content,
		timesent: req.body.timesent,
		firstmessage: req.body.firstmessage,
		namechange: req.body.namechange,
		color: req.body.color,
		id: req.body.id
	});
	count[0].c=count[0].c+1;
	//Zuerst wird geprüft ob Message Array grösser als 11 ist
	if (chatHistory.length>20) {
		console.log(chatHistory.length);
		//Von ersten bis zur zwangigsten nachricht werden alle gelöscht aus dem Array
		chatHistory.splice(0, chatHistory.length-19);
	}
	res.json({ message: 'History created!' });
});
router.post('/history/name', function (req, res, next) {
	nicknames.push(
		{
			id: req.body.id,
			name: req.body.name,
			color: req.body.color
		}
	)
});
module.exports=router;
