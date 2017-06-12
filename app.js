const express = require('express')
var amazon = require('amazon-product-api');
const app = express()


var client = amazon.createClient({
    awsId: "AKIAIBZMUK6U4L56ZUYQ",
    awsSecret: "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",
    awsTag: "123123001-20"
});

app.use(express.static('./'));

app.get('/amaz', function (req, res) {
    client.itemSearch({
  director: 'Quentin Tarantino',
  searchIndex: 'DVD',
  responseGroup: 'ItemAttributes,Offers,Images'
}).then(function(results){
  res.send(results)
}).catch(function(err){
  res.send(err)
});
})

var fakeJson = [
    {
        img: 'http://ghk.h-cdn.co/assets/cm/15/11/550003f16c562-clotheshanger-lgn.jpg',
        name: 'fake prd 1',
        price: 22
    },{
        img: 'http://ghk.h-cdn.co/assets/cm/15/11/550003f16c562-clotheshanger-lgn.jpg',
        name: 'fake prd 21',
        price: 55
    },{
        img: 'http://ghk.h-cdn.co/assets/cm/15/11/550003f16c562-clotheshanger-lgn.jpg',
        name: 'fake prd 41',
        price: 85
    },{
        img: 'http://www.dumpaday.com/wp-content/uploads/2012/02/51YSPKzdyLL._SL500_AA300_.jpg',
        name: 'fake prd 51',
        price: 456
    },{
        img: 'http://ghk.h-cdn.co/assets/cm/15/11/550003f16c562-clotheshanger-lgn.jpg',
        name: 'fake prd 17',
        price: 88
    },{
        img: 'http://ghk.h-cdn.co/assets/cm/15/11/550003f16c562-clotheshanger-lgn.jpg',
        name: 'fake prd 81',
        price: 99
    },{
        img: 'http://www.dumpaday.com/wp-content/uploads/2012/02/51YSPKzdyLL._SL500_AA300_.jpg',
        name: 'fake prd 19',
        price: 12
    },
]

app.get('/json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(fakeJson, null, 3));
})

app.get('/index', function (req, res) {
    var cUrl = req.query;
    res.send('Hello index!' + cUrl)
})

app.get('/me', function (req, res) {
    res.send(me.myobj.name)
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
