const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Campground = require('./models/campground');
const methodOverride = require('method-override');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

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

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })

})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', async (req, res) => {
    const newCampground = new Campground(req.body.campground)
    await newCampground.save();
    res.redirect(`/campgrounds/${newCampground._id}`)
})


app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const foundCamp = await Campground.findById(id)
    res.render('campgrounds/show', { foundCamp })
})


app.get('/campgrounds/:id/edit', async (req, res) => {
    const { id } = req.params;
    const foundCamp = await Campground.findById(id)
    res.render('campgrounds/edit', { foundCamp })
})

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campgrounds/${campground._id}`)
})

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');

})

app.listen(3000, () => {
    console.log('SERVING ON PORT 3000')
})