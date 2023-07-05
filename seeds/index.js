const mongoose = require('mongoose');
const Campground = require('../models/campground');
const {places, descriptors} = require('./seedhelpers');
const cities = require('./cities');


mongoose.connect('mongodb://localhost/yelp-camp', {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true});

const db =mongoose.connection;
db.on('error', console.error.bind(console,"connection error"));
db.once('open', ()=>{
    console.log("Databse connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)]



const seedDB = async() =>{
    await Campground.deleteMany({});
    for (let i=0 ; i<200 ; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*30)+10;
        const camp =new Campground({
            author: '60c352de1251f943c0a07bfd',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis laborum nulla laudantium accusantium exercitationem excepturi, ipsum quisquam possimus rerum iste cum ipsa quod pariatur? Temporibus dolores rerum cumque earum iste?',
            price,
            geometry: {
              type:'Point',
              coordinates:[
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/janaka99/image/upload/v1623319373/YelpCamp/hqhe5wli4fm08xg3xvi7.jpg',
                  filename: 'YelpCamp/hqhe5wli4fm08xg3xvi7'
                },
                {
                  url: 'https://res.cloudinary.com/janaka99/image/upload/v1623319374/YelpCamp/myy9hsjeeqommyhwrkjn.png',
                  filename: 'YelpCamp/myy9hsjeeqommyhwrkjn'
                },
                {
                  url: 'https://res.cloudinary.com/janaka99/image/upload/v1623319375/YelpCamp/patw1ggkrgjzx7xg7ubs.jpg',
                  filename: 'YelpCamp/patw1ggkrgjzx7xg7ubs'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() =>{
    mongoose.connection.close()
})











// asd