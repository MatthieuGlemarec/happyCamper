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
            author: '64491e62f94ac288265aa860',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dy6ye1v8b/image/upload/v1687533872/HappyCamper/rtai3qgw8tc9aflsshc4.jpg',
                    filename: 'HappyCamper/rtai3qgw8tc9aflsshc4',
                },
                {
                    url: 'https://res.cloudinary.com/dy6ye1v8b/image/upload/v1687533874/HappyCamper/y6w6mocjembb2gvnk3bn.jpg',
                    filename: 'HappyCamper/y6w6mocjembb2gvnk3bn',
                }
            ],
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum error optio amet at dolores sed deserunt ratione eos sequi? Aspernatur consequuntur minus doloribus natus ad accusantium aliquam. Repellat, obcaecati expedita!',
            price
        })
        await camp.save()
    }
}
seedDB().then(() => {
    mongoose.connection.close()
});

