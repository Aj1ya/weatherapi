const { json } = require("body-parser");
const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  // gets the weathe r for a given location using openweathermap api
  const query = req.body.cityName;
  const unit = "metrics";
  const apiKey = "27c7afe43e70cef9b473b2a8240f6f5f";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const weatherDescription = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The weather of " + query + " is " + temp + "</h1>");
      res.write("<img src=" + iconUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
