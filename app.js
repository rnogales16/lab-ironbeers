const express = require('express');

const hbs = require('hbs');
const { get } = require('http');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, './views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (req, res)=>{
  punkAPI.getBeers()
  .then(beersFromApi =>{ 
    res.render("beers", {beersFromApi})//render siempre tiene que coger un objeto, 
    //así que creamos uno con la key objetoArrayDeCervezas y le asignamos el valor beersFromApi, que es un array.
    console.log("Beers from the database:", beersFromApi)
  })
  .catch(error=> console.log(error));
})




app.all('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(randomBeer => {
    res.render('random-beer', randomBeer[0])
    console.log(randomBeer[0])
  })
  .catch(error => console.log(error));
});



app.get("/beers/:id", (req, res)=>{
  punkAPI.getBeer(req.params.id)
  .then(beerId =>{
    res.render("beerProfileid" , beerId[0])
    console.log(beerId[0])
  })  
  .catch(error => console.log(error));
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
