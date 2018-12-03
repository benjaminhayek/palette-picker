const express = require('express')
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const database = require('knex')(config)
const app = express()

app.use(bodyParser.json())
// Tells the system i want json to be used
app.set('port', process.env.PORT || 3000);
// Here we are saying use the environment port or if i haven't specified a port use 3000
app.locals.title = 'Palette Picker';
// This sets the title of the project to Palette Picker
app.use(express.static('public'));
// This has the app look in the public folder for static files

app.get('/api/v1/palette_projects', (request, response) => {
// This is making a Get request to the specified url
  database('palette_projects').select()
  // This selects the database i want to use
      .then(palette_projects => {
          response.status(200).json(palette_projects)
      })
      // This responds with a positive status and jsons the project
      .catch(error => {
          response.status(500).json({ error: error.message });
      })
      // This will return a 500 error if it fails
})

app.post('/api/v1/palette_projects', (request, response) => {
// This is a POST request to the specidied url
  const project = request.body
  // Here i am assigning the variable project to the requests body.

  for(let requiredParam of ['name']) {
      // for of loop to check for paramater
      if(!project[requiredParam]) {
          //If no param return error
          response.status(422).json({error: error.message})
      }
  }

  database('palette_projects').insert(project, 'id')
  // Select database and insert the project and the id
      .then(projectIds => {
          response.status(201).json({id: projectIds[0]})
      })
      // Send a response status and the project id to the key id
      .catch(error => {
          response.status(500).json({error: error.message})
      })
      // Send back a 500 error if fails.
})

app.get('/api/v1/palette_projects/:id', (request, response) => {
    // Gets a project based on an individual id 
  const { id } = request.params
  // assigns the deconstructed id as the request params
  
  database('palette_projects').where('id', id).select()
  // selects the database and selects the correct id
      .then(project => response.status(200).json(project))
      // returns the jsond project
      .catch(error => response.status(500).json(`Error fetching project: ${error.message}`))
      // returns a 500 error if it fails
})

app.get('/api/v1/palettes', (request, response) => {
    // GET request for all palettes
  database('palettes').select()
  // Selects the palettes database
      .then(palettes => {
          response.status(200).json(palettes)
      })
      //jsons the palettes if its successfull
      .catch(error => {
          response.status(500).json({ error: error.message });
      })
      // sends 500 error if it fails
})

app.post('/api/v1/palette_projects/:project_id/palettes', (request, response) => {
    //POST request for a palette based on a project id
  const palette = request.body
  // asssigns the variable palette to the request params

  for(let requiredParam of ['palette', 'color1', 'color2', 'color3', 'color4', 'color5']) {
      // for of loop to check for all 5 params
      if(!palette[requiredParam]) {
          response.status(422).json({error: error.message})
      }
      // if one param is missing send this error
  }

  database('palettes').insert(palette, 'id')  
  // inserts the palette into the palettes db
      .then(palettes => {
          response.status(201).json(palettes)
      })
      // jsons the palette on success
      .catch(error => {
          response.status(500).json({error: error.message})
      })
      // sends a 500 error if it fails
})

app.delete('/api/v1/palette_projects/:project_id/palettes/:palette_id', (request, response) => {
    // DELETE request based on the project id and the palette id
  const { id, palette_id } = request.params
  // sets both the id and the palette id as request params
  
  database('palettes').where('id', palette_id).del()
  // selects the palettes database and finds the correct palette to delete based on id
  .then(palette => {
    response.status(201).json(id)
  })
  // jsons id
  .catch(error => {
    response.status(500).json({error: error.message})
  })
  //sends error if it fails
})

app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
//Telling the app to listen on whatever port is set