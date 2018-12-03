const express = require('express')
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const database = require('knex')(config)
const app = express()

app.use(bodyParser.json())
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';
app.use(express.static('public'));

app.get('/api/v1/palette_projects', (request, response) => {
  database('palette_projects').select()
      .then(palette_projects => {
          response.status(200).json(palette_projects)
      })
      .catch(error => {
          response.status(500).json({ error: error.message });
      })
})

app.post('/api/v1/palette_projects', (request, response) => {
  const project = request.body

  for(let requiredParam of ['name']) {
      if(!project[requiredParam]) {
          response.status(422).json({error: error.message})
      }
  }

  database('palette_projects').insert(project, 'id')
      .then(projectIds => {
          response.status(201).json({id: projectIds[0]})
      })
      .catch(error => {
          response.status(500).json({error: error.message})
      })
})

app.get('/api/v1/palette_projects/:id', (request, response) => {
  const { id } = request.params
  
  database('palette_projects').where('id', id).select()
      .then(project => response.status(200).json(project))
      .catch(error => response.status(500).json(`Error fetching project: ${error.message}`))
})

app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
      .then(palettes => {
          response.status(200).json(palettes)
      })
      .catch(error => {
          response.status(500).json({ error: error.message });
      })
})

app.post('/api/v1/palette_projects/:project_id/palettes', (request, response) => {
  const palette = request.body

  for(let requiredParam of ['palette', 'color1', 'color2', 'color3', 'color4', 'color5']) {
      if(!palette[requiredParam]) {
          response.status(422).json({error: error.message})
      }
  }

  database('palettes').insert(palette, 'id')  
      .then(palettes => {
          response.status(201).json(palettes)
      })
      .catch(error => {
          response.status(500).json({error: error.message})
      })
})

app.delete('/api/v1/palette_projects/:project_id/palettes/:palette_id', (request, response) => {
  const { id, palette_id } = request.params
  
  database('palettes').where('id', palette_id).del()
  .then(palette => {
    response.status(201).json(id)
  })
  .catch(error => {
    response.status(500).json({error: error.message})
  })
})

app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
