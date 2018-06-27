const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const config = {
  user: 'fupuchu',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
}

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/** Extra Functions **/

function addZero(arg){
  if (arg.length == 1) {
    return "00" + arg
  } else if (arg.length == 2) {
    return "0" + arg
  } else {
    return arg
  }
}

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (req, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  //
  const queryString = 'SELECT * from pokemon'

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
    } else {
      let pokemon = result.rows;
      response.render('home', {pokemon : pokemon})
    }
  });
});

app.get('/pokemon/:id', (req, response) => {
  const convertString = addZero(req.params.id)
  const queryString = 'SELECT * FROM pokemon WHERE num = $1'
  const queryValue = [convertString]

  pool.query(queryString, queryValue, (err, result) => {
    if (err) {
      console.log("Tak boleh: " + err);
    } else {
      response.render('pokemon', {pokemon: result.rows[0]})
    }
  })
})

app.get('/new', (request, response) => {
  const numFix = 'SELECT num FROM pokemon WHERE num = (SELECT MAX(num) FROM pokemon)'

  pool.query(numFix, (err,res) => {
    if (err){
      console.log(err);
    } else {
      let newNum = parseInt(res.rows[0].num) + 1
      response.render('new', {fixnum : newNum});
    }
  })
});


app.post('/pokemon', (req, response) => {
  let params = req.body;
  const queryString = 'INSERT INTO pokemon(num, name, img, height, weight) VALUES($1, $2, $3, $4, $5)'
  const values = [params.num, params.name, params.img, params.height, params.height];
  pool.query(queryString, values, (err, res) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {
      console.log('query result:', res);
      // redirect to home page
      response.redirect('/');
    }
  });
});

app.get('/pokemon/:id/edit', (req, response) => {
  const convertString = addZero(req.params.id)
  const queryString = 'SELECT * FROM pokemon WHERE num = $1'
  const queryValue = [convertString]

  pool.query(queryString, queryValue, (err, result) => {
    if (err) {
      console.log("Tak boleh: " + err);
    } else {
      response.render('edit', {pokemon: result.rows[0]})
    }
  })
})

app.put('/pokemon/edit/:id', (req, response) => {
  const updateParams = req.body
  const convertString = addZero(req.params.id)
  const queryString = 'UPDATE pokemon SET name = $1, img = $2, height = $3, weight= $4  WHERE num = $5'
  const queryValue = [updateParams.name, updateParams.img, updateParams.height, updateParams.weight, convertString]

  pool.query(queryString, queryValue, (err, result) => {
    if (err) {
      console.log("Tak boleh: " + err);
    } else {
      response.redirect('/');
    }
  })
})

app.delete('/pokemon/edit/:id', (req, response) => {
  const deleteMe = req.body.num
  const queryString = 'DELETE from pokemon WHERE num = $1'
  const queryValue = [deleteMe]

  pool.query(queryString, queryValue, (err, result) => {
    if (err) {
      console.log("Tak boleh: " + err);
    } else {
      response.redirect('/')
    }
  })
})
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
