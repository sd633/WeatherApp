require('dotenv').config();
const express =require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
 
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const appKey = process.env.APPKEY;
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            console.log(temp)
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather in " + query + " currently is "+ description +"<p>")
            res.write("<h1>The temperature in " + query + " is "+ temp +" degrees celcius with</h1>");
            res.write("<img src = "+imageURL+">")
            res.send()
        })
    })
})



app.listen(3000, function(){
    console.log("Server is running in port 3000");
})