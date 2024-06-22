const express = require('express');
const uuid = require('uuid');

const resData = require('../util/restaurant-data');

const router = express.Router();

router.get('/restaurants', function (req, res) {
    let order = req.query.order;

    if (order !== 'asc' && order !== 'desc') {
        order = 'asc';
    }
    const existingData = resData.getStoredRestaurants();
    existingData.sort(function (resA, resB) {
        if (order === 'asc' && resA.name > resB.name) {
            return 1;
        } else if (order === 'desc' && resB.name > resA.name) {
            return 1;
        }
        return -1;
    });
    let nextOrder = 'desc';
    if (order === 'asc') {
        nextOrder = 'desc';
    } else {
        nextOrder = 'asc';
    }

    res.render('restaurants',
        {
            number: existingData.length,
            restaurants: existingData,
            nextOrder: nextOrder
        }
    );
});

router.get('/restaurants/:id', function (req, res) {
    const id = req.params.id;
    const existingData = resData.getStoredRestaurants();

    for (const rest of existingData) {
        if (rest.id === id) {
            res.render('restaurant-details', { restaurant: rest });
        }
    }
    res.render('404');
});

router.get('/recommend', function (req, res) {
    res.render('recommend');
});

router.post('/recommend', function (req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();

    const existingData = resData.getStoredRestaurants();

    existingData.push(restaurant);

    resData.addNewRestaurant(existingData);

    res.redirect('/confirm');
});

router.get('/confirm', function (req, res) {
    res.render('confirm');
});

module.exports = router;