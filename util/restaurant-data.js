const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'restaurants.json');

function getStoredRestaurants() {
    const file = fs.readFileSync(dataFilePath);
    const existingData = JSON.parse(file);
    return existingData;
}

function addNewRestaurant(restaurants) {
    fs.writeFileSync(dataFilePath, JSON.stringify(restaurants));
}

module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    addNewRestaurant: addNewRestaurant
};