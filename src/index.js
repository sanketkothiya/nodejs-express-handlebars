const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const hbs = require('hbs');
const requests = require("requests");

// console.log(__dirname);


const staticPath = path.join(__dirname, '../public');
let templatesPath = path.join(__dirname, '../templates/views');
let partialsPath = path.join(__dirname, '../templates/partials');
console.log(staticPath);
console.log(templatesPath);
console.log(partialsPath);
// console.log(staticPath);

// to state the view engine

hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs');
app.set("views", templatesPath);
app.use(express.static(staticPath));

app.get("/", (req, res) => {
    // console.log("index.hbs");
    res.render('index', {
        name: "sanket kothiya",
    });
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.get("/city", (req, res) => {
    requests(
        `http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&units=metric&appid=43b2f9c034b36e1f00a7454c325630c4`
      )
        .on("data", (chunk) =>
         {
  
          const objdata = JSON.parse(chunk);
          const arrData = [objdata];
          console.log(arrData[0].main.temp);
          res.write(arrData[0].name);
        //   res.write(arrData[0].main.temp);
          // console.log(realTimeData);
        })
        .on("end", (err) => {
          if (err) return console.log("connection closed due to errors", err);
          res.end();
        });
    }
);

app.get("/about/*", (req, res) => {
    // console.log("index.hbs");
    res.render('404', {
        massage: " opps this about page is note found",
    });
});

app.get("*", (req, res) => {
    // console.log("index.hbs");
    res.render('404', {
        massage: " opps no any content page is found",
    });
});






app.listen(port, () => {
    console.log("you listening the port no is" + " " + port);
});