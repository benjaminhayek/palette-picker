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

//GET all projects
//Post new palette
//Delete existing palette
//Get specific project
//Post new project

app.get('/api/v1/palette_projects', (request, response) => {
  database('palette_projects').select()
      .then(palette_projects => {
          response.status(200).json(palette_projects)
      })
      .catch(error => {
          response.status(500).json({ error: error.message });
      })
})

// app.post('/api/v1/papers', (request, reponse) => {
//   const paper = request.body

//   for(let requiredParam of ['title', 'author']) {
//       if(!paper[requiredParam]) {
//           response.status(422).json({error: error.message})
//       }
//   }

//   database('papers').insert(paper, 'id')
//       .then(paperIds => {
//           response.status(201).json({id: paperIds[0]})
//       })
//       .catch(error => {
//           response.status(500).json({error: error.message})
//       })
// })

// app.get('/api/v1/papers/:id', (request, response) => {
//   const { id } = request.params
  
//   database('papers').where('id', id).select()
//       .then(paper => response.status(200).json(paper))
//       .catch(error => console.log(`Error fetching paper: ${error.message}`))
// })

// app.get('/api/v1/footnotes', (request, response) => {
//   database('footnotes').select()
//       .then(footnotes => {
//           response.status(200).json(footnotes)
//       })
//       .catch(error => {
//           response.status(500).json({ error: error.message });
//       })
// })

app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});