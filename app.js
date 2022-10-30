const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

// Template Engine
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


app.post("/" , function(req,res){
  // API Call
  const query = req.body.cityName;
  const apiKey = "96f0696a7a69c73d63921ad788e96132";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  
  
  https.get(url, function(response){
      console.log(response.statusCode);
      
      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        const temp = Math.round(weatherData.main.temp);
        const realFeel = Math.round(weatherData.main.feels_like);
        const description = weatherData.weather[0].description;
        const yourCity = weatherData.name;
        const iconImage = weatherData.weather[0].icon;
        const imageURL = `http://openweathermap.org/img/wn/${iconImage}@2x.png`;
      
      function cityRequest() {
        document.getElementById("cityInput").required = true;
      }

        res.render("index", {
          yourCity: `${yourCity}`,
          temp: `${temp}`,
          realFeel: `${realFeel}`,
          description: `${description}`,
          iconImage: `${iconImage}`,
          imageURL: `${imageURL}`
        });
        res.send();
      })
  })
})

function cityRequest(){
  document.getElementById("cityInput").required = true;
}


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000.");
    })