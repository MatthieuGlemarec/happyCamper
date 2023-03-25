const mongoose = require('mongoose');
const campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/happy-camper', { useNewUrlParser: true })
    .then(() => {
        console.log('MONGO CONNECTION OPEN!')
    })
    .catch(err => {
        console.log('MONGO ERROR!!!!')
        console.log(err)
    });

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 999);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://source.unsplash.com/random/300x300?camping,${i}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum error optio amet at dolores sed deserunt ratione eos sequi? Aspernatur consequuntur minus doloribus natus ad accusantium aliquam. Repellat, obcaecati expedita!',
            price
        })
        await camp.save()
    }
}
seedDB().then(() => {
    mongoose.connection.close()
});

