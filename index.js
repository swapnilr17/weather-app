const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({
     extended: true
}));
app.use(express.static("public"));
app.get("/", function (req, res) {
     res.render("form");
});

app.post('/weather', function (req, res) {
     const query = req.body.city;
     console.log(query);

     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=6db1c096eb7341c093c54b1e4c8c630a";
     https.get(url, function (response) {
          console.log(response.statusCode);
          response.on("data", function (data) {
               const weatherData = JSON.parse(data);
               console.log(weatherData);
               res.render('weather', {
                    city: weatherData.name,
                    desc: weatherData.weather[0].description,
                    temp: weatherData.main.temp,
                    humidity: weatherData.main.humidity
               });
          });
     });
});

app.listen(3000, function () {
     console.log("Server started on port 3000");
});