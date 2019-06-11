const express = require('express');
const multer  = require('multer');
const cors = require('cors');
const upload = multer({ dest: 'imgs/' });
const p = require('path');

const app = express();


app.post('/upload', cors(), upload.single('file'), function (req, res, next) {
    console.log('come in');
    res.set("Access-Control-Allow-Origin" ,'*');
    res.json({id: req.file.filename})
});


app.get('/preview/:key', cors(), function(req, res, next){
    res.sendFile(`imgs/${req.params.key}`, {
        root: __dirname,
        headers:{
            'Content-Type': 'image/jpeg',

        },
    }, (error)=>{
        if(error){
            res.status(404).send('Not found')
        }
    })
});

var port = process.env.port || 3000
app.listen(port, function () {
    console.log('Example app listening on port 3000!')
});
