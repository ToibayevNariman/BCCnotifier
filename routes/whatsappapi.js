var express = require('express');
require('shelljs/global');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    if(req.query.uid !== 'admin' || req.query.key !== '1234'){
        res.json({ success: false });
        return;
    }

    if(req.query.phone === undefined || req.query.phone.length !== 11){
        res.json({ success: false, reason: "Incorrect phone" });
        return;
    }

    if(req.query.text === undefined){
        res.json({ success: false, reason: "Incorrect params" });
        return;
    }

    res.json(exec('yowsup-cli demos --config /home/bcc/yowsup/yowsup.config --send '+req.query.phone+' "'+req.query.text+'"'));
});

module.exports = router;
