const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const campground = require('./models/campground');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//connect mongoose and set useNewUrslParser: true as recommended.
mongoose.connect('mongodb://127.0.0.1:27017/happy-camper', { useNewUrlParser: true })
    .then(() => {
        console.log('MONGO CONNECTION OPEN!')
    })
    .catch(err => {
        console.log('MONGO ERROR!!!!')
        console.log(err)
    })

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/makecampground', async (req, res) => {
    const camp = new campground({ title: 'My Backyard', description: 'cheap camping' });
    await camp.save();
    res.send(camp)
})

app.listen(3000, () => {
    console.log('SERVING ON PORT 3000')
})