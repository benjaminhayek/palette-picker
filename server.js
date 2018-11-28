const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.locals.title = 'Palette Picker';

app.locals.palettes = [
  {id: 1, name: 'Cool Colors', hex1: '#35BABC', hex2: '#1F9369', hex3: '#6664AD', hex4: '#64AD6D', hex5: '#85AD64', project_id: 1},
  {id: 2, name: 'Warm Colors', hex1: '#6DC5B1', hex2: '#4A445C', hex3: '#000AAA', hex4: '#CB4A67', hex5: '#9DA220', project_id: 2},
  {id: 3, name: 'Shades', hex1: '#353535', hex2: '#156345', hex3: '#F45637', hex4: '#2BBC21', hex5: '#85AD64', project_id: 1},
  {id: 4, name: 'Basic', hex1: '#000000', hex2: '#1111111', hex3: '#222222', hex4: '#333333', hex5: '#444444', project_id: 3},
  {id: 5, name: 'Colors', hex1: '#AAAAAA', hex2: '#BBBBBB', hex3: '#CCCCCC', hex4: '#DDDDDD', hex5: '#EEEEEE', project_id: 2},
  {id: 6, name: 'Browns', hex1: '#FFFFFF', hex2: '#555555', hex3: '#666666', hex4: '#777777', hex5: '#888888', project_id: 2},
  {id: 7, name: 'Grey', hex1: '#010101', hex2: '#121212', hex3: '#343434', hex4: '#565656', hex5: '#787878', project_id: 1},
];

app.locals.projects = [
  {id: 1, name: 'project 1'},
  {id: 2, name: 'project 2'},
  {id: 3, name: 'project 3'},
]

//GET all projects
//Post new palette
//Delete existing palette
//Get specific project
//Post new project

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.use(express.static('public'));

app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});