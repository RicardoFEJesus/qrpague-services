require('dotenv').load();
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);
const express = require('express');
const bodyParser = require('body-parser');


var app = express();

app.use(
  function (req,
    res, next) {

    //Access-Control-Allow-Origin: *

    res.header("Access-Control-Allow-Origin",
      "*");

    res.header("Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,OPTIONS");

    res.header("Access-Control-Allow-Credentials",
      true);

    res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");

    res.header("Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    let ip =
      req.ip +
      " - " + req.connection.remoteAddress

    console.debug(ip,
      req.path)

    next();

  })

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
  var value = req.query.value;
  console.log('URL ' + data);
  console.log('To ' + to);
  console.log('Value ' + value);
  sendSMS(data, to, value);
  res.end('Mensagem enviada');
});

function sendSMS(data, rcp, value) {
  //var url
  client.messages
      .create({
        body:'Você recebeu um link para pagamento no valor de R$ ' + value +'. Para pagar clique no link ' + data,
        from: '+5567933007079',
        to: '+55' + rcp
       })
      .then(message => console.log(message.sid))
      .done();

};



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
