var express = require('express');
var router = express.Router();
var https = require("https");
var cheerio =  require('cheerio');
var urlencode = require('urlencode');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Say Hello' });
});

router.get('/check', function(req, res, next) {
    var k = req.param('k');
    var k = urlencode(k);
    var url= `https://shouyu.51240.com/${k}__shouyus/`;

    var word_selector = 'td:nth-child(1)';
    var desc_selector = 'td:nth-child(2)';
    var img_selector = 'td:nth-child(3)>img';

    var selector_result = '#main_content td table';
    //get 请求外网
    var steps = [];
    https.get(url,function(req){
        var html='';
        req.on('data',function(data){
            html+=data;
        });
        req.on('end',function(){
            let $ = cheerio.load(html);
            $(selector_result).each((id, it)=>{
                var obj = {};
                var $it = $(it)
                var word = $it.find(word_selector).text();
                var desc = $it.find(desc_selector).text();
                var imgsrc = $it.find(img_selector).attr('src');
                obj.word = word;
                obj.desc = desc;
                obj.imgsrc = imgsrc;
                steps.push(obj)
            });
            res.send(steps)
        });
    });
});

module.exports = router;
