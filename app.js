const { response } = require("express");
const express = require("express");
const { json } = require("express/lib/response");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    
    res.sendFile(__dirname + "/index.html");
    
})

app.post("/", (req,res) => {

    const query = req.body.cityName;
    const apikey = "f0053eee7101227c7eac1c047342400e";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    
    https.get(url, (response) => {
        console.log(response);

        response.on("data", (data) => {

            const weatherData = JSON.parse(data);

            const description = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<h1>The tempearture in " + query + " is " + temp + "° celsius </h1>" )
        res.write("<h1>The weather is currently " + description + "</h1>")
        res.write("<img src=" + imgUrl +">")
        res.send();
        })
    })
})

app.listen(3000);