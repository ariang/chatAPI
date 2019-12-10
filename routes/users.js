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
router.post('/history/name', function (req, res, next) {
	chatHistory.push({
		name: req.body.name,
		oname: req.body.oname,
		content: req.body.content,
		timesent: req.body.timesent,
		firstmessage: req.body.firstmessage,
		namechange: req.body.namechange,
		color: req.body.color
	});
	count[0].c=count[0].c+1;

	if (req.body.namechange) {
		nicknames.push({
			name: req.body.name
		});
	}
	//Zuerst wird geprüft ob Message Array grässer als 11 ist
	if (chatHistory.length>20) {
		console.log(chatHistory.length);
		//Von ersten bis zur zwangigsten nachricht werden alle gelöscht aus dem Array
		chatHistory.splice(0, chatHistory.length-19);
	}
	res.json({ message: 'History created!' });
});
router.post('/history/name', function (req, res, next) {
	nicknames.push({
		name: req.body.name
	})
});
module.exports=router;
