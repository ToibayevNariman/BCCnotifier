var express = require('express');
var shelljs = require('shelljs');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    if(req.query.uid !== 'admin' || req.query.key !== '1234'){
        res.json({ success: false });
        return;
    }

    if(req.query.phone === undefined){
        res.json({ success: false, reason: "Incorrect phone" });
        return;
    }

    if((req.query.phone.match('\\+7') || []).length != 0){
        res.json({ success: false, reason: "phone number should not contain +7 or 8" });
	return;
    }

    if(req.query.text === undefined){
        res.json({ success: false, reason: "Incorrect params" });
        return;
    }
    
    var response = {
        success: true,
        yowsup: shelljs.exec('yowsup-cli demos --config /home/bcc/yowsup/yowsup2.config --send '+req.query.phone+' "'+req.query.text+'"')
    }

    res.json({ success:true });
});

module.exports = router;
