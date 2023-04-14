const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {

});

app.post('/', function (req, res) {

    const query = req.body.cityName;
    const apiKey = "e1594306de48a5a3ab9335e72d862742";
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response) {
        console.log(response.statusCode);
    
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/w/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Fahrenheit.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });

});











app.listen(3000, function() {
    console.log('Listening on port 3000');
});