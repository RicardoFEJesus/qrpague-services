require('dotenv').load();
const accountSid = process.env.accountSid; 
const authToken = process.env.authToken; 
const client = require('twilio')(accountSid, authToken); 
const express = require('express');
const bodyParser = require('body-parser');


var app = express();
app.set('port', process.env.PORT);
app.set('view engine', 'ejs');
app.use(bodyParser.json({
    //verify: verifyRequestSignature
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.post('/sms', function(req, res) {
  var data = req.query.url;
  var to = req.query.to;
  console.log('URL ' + data);
  console.log('To ' + to);
  sendSMS(data, to);
  res.end('Mensagem enviada');
});

function sendSMS(data, rcp) {
  //var url
  client.messages 
      .create({  
        body:'QRPague : ' + data,
        from: '+5567933007079',       
        to: '+55' + rcp 
       }) 
      .then(message => console.log(message.sid)) 
      .done();

};

    

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});