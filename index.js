const path = require('path')
const fs = require('fs');

const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false, }));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/restaurants', function (req, res) {
    const dataFilePath = path.join(__dirname, 'data', 'restaurants.json');
    const file = fs.readFileSync(dataFilePath);
    const existingData = JSON.parse(file);

    res.render('restaurants',
        {
            number: existingData.length,
            restaurants: existingData
        }
    );
});

app.get('/recommend', function (req, res) {
    res.render('recommend');
});

app.post('/recommend', function (req, res) {
    const restaurant = req.body;
    const dataFilePath = path.join(__dirname, 'data', 'restaurants.json');
    const file = fs.readFileSync(dataFilePath);
    const existingData = JSON.parse(file);
    existingData.push(restaurant);
    fs.writeFileSync(dataFilePath, JSON.stringify(existingData));
    res.redirect('/confirm');
});

app.get('/confirm', function (req, res) {
    res.render('confirm');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.listen(3000);