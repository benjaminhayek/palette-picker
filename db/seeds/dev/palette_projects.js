
let projectData = [{
  name: 'Project1',
  palettes: ['palette1'],
 },
 {
  name: 'Project2',
  palettes: ['palette2'],
 },
 {
  name: 'Project3',
  palettes: ['palette3'],
 }
 ]
 
 const createProject = (knex, project) => {
  const { name } = project;
  return knex('palette_projects').insert({ name }, 'id')
    .then(projectIds => {
      let palettePromises = project.palettes.map(palette => {
        return  createPalette(knex, {
          palette,
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
