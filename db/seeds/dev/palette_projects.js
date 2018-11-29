
const paletteOne = {
  palette: 'cool colors',
  color1: '#111111',
  color2: '#222222',
  color3: '#333333',
  color4: '#444444',
  color5: '#555555',
};

const paletteTwo = {
  palette: 'warm ones',
  color1: '#AAAAAA',
  color2: '#BBBBBB',
  color3: '#CCCCCC',
  color4: '#DDDDDD',
  color5: '#EEEEEE',
};

const paletteThree = {
  palette: 'dark colors',
  color1: '#666666',
  color2: '#777777',
  color3: '#888888',
  color4: '#FFFFFF',
  color5: '#000000',
};

const paletteFour = {
  palette: 'Happy thoughts',
  color1: '#666666',
  color2: '#777777',
  color3: '#888888',
  color4: '#FFFFFF',
  color5: '#000000',
};

let projectData = [{
  name: 'Project1',
  palettes: [paletteOne, paletteThree],
 },
 {
  name: 'Project2',
  palettes: [paletteTwo],
 },
 {
  name: 'Project3',
  palettes: [paletteFour],
 }
 ]
 
 const createProject = (knex, project) => {
  const { name } = project;
  return knex('palette_projects').insert({ name }, 'id')
    .then(projectIds => {
      let palettePromises = project.palettes.map(palette => {
        return  createPalette(knex, {
          ...palette,
          project_id: projectIds[0]
        })
      })
 
      return Promise.all(palettePromises);
    })
 }
 
 const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette);
 }
 
 
 exports.seed = (knex, Promise) => {
  return knex('palettes').del()
    .then(() => knex('palette_projects').del())
    .then(() => {
      let projectPromises = projectData.map(project => {
        return createProject(knex, project)
      })
 
      return Promise.all(projectPromises);
    })
    .then(() => console.log('Successfully seeded db'))
    .catch(error => console.log(`Error seeding db ${error.message}`));
 };
