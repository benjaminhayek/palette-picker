getRandomHex = () => {
    let digits = '0123456789ABCDEF';
    let hex = '#';
    for (var i = 0; i < 6; i++) {
      hex += digits[Math.floor(Math.random() * 16)];
    }
    return hex;
  }

setRandomColor = () => {
    $(".color1").css("background-color", $('.color1').attr('locked') ? null : getRandomHex());
    $(".color2").css("background-color", $('.color2').attr('locked') ? null : getRandomHex());
    $(".color3").css("background-color", $('.color3').attr('locked') ? null : getRandomHex());
    $(".color4").css("background-color", $('.color4').attr('locked') ? null : getRandomHex());
    $(".color5").css("background-color", $('.color5').attr('locked') ? null : getRandomHex());
  }

createProject = async (projectName) => {
  try{
    const url = '/api/v1/palette_projects';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({name: projectName}),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
  } catch (error) {
    console.log(error.message)
  }
}

checkProjects = async (projectName) => {
  try {
    const url = '/api/v1/palette_projects';
    const response = await fetch(url);
    const data = await response.json()
    const taken = data.find(name => name.name === projectName)
    if(taken) {
      alert('That name is taken please choose a new one')
    } else {
      createProject(projectName)
    }
  } catch (error) {
    console.log(error.message)
  }
}

fetchProjects = async () => {
  try{
    const url = '/api/v1/palette_projects';
    const response = await fetch(url);
    const data = await response.json();
    populateProjectMenu(data);
    populateProjects(data);
  } catch (error) {
    console.log(error.message)
  }
}

populateProjectMenu = (savedProjects) => {
  savedProjects.map(project => {
    return $('.drop-down').append(`
      <option class='option'>${project.name}</option>
      `);
  })
}

populateProjects = (savedProjects) => {
  savedProjects.map(project => {
    return $('.saved-project-list').append(`
    <ul class=${project.id}>
      <h1 class='project-name'>${project.name}</h1>
    </ul>
      `);
  })
}

postPalette = async (palette, projectId, color1, color2, color3, color4, color5) => {
  try {
    const url = '/api/v1/palette_projects/:project_id/palettes';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({palette: palette, project_id: projectId, color1: color1, color2: color2, color3: color3, color4: color4, color5: color5}),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json();
  } catch (error) {
    console.log(error.message)
  }
}

getMatchingProject = async () => {
  try {
    const selectedPalette = $('.drop-down option:selected').text();
    const url = '/api/v1/palette_projects';
    const response = await fetch(url);
    const data = await response.json();
    const project = data.filter(project => project.name === selectedPalette);
    return project
  } catch (error) {
      console.log(error.message)
  }
}

getMatchingPalettes = async () => {
  try {
    const url = '/api/v1/palettes';
    const response = await fetch(url);
    const data = await response.json();
    populatePalettes(data)
  } catch (error) { 
    console.log(error.message)  
  }
}

populatePalettes = (savedPalettes) => {
  savedPalettes.map(palette => {
    return $(`.${palette.project_id}`).append(`
    <li class='saved-palettes'>
      <h2 class='palette-name' style='color:${palette.color1}'>${palette.palette}</h2> 
      <section class=palette-colors>
        <div class='color-block cb1' style='background-color:${palette.color1}'></div>
        <div class='color-block cb2' style='background-color:${palette.color2}'></div>
        <div class='color-block cb3' style='background-color:${palette.color3}'></div>
        <div class='color-block cb4' style='background-color:${palette.color4}'></div>
        <div class='color-block cb5' style='background-color:${palette.color5}'></div>
        <button class='delete'><i class="far fa-trash-alt" id=${palette.project_id} title=${palette.id}></i></button>
      </section>   
    </li>
      `);
  })
}

deletePalette = async (paletteId, projectId) => {
  const url = `/api/v1/palette_projects/${projectId}/palettes/${paletteId}`
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
  } catch (error) {
    console.log(error.message)
  }
}

repopulateSavedPalette = (color1, color2, color3, color4, color5) => {
  $(".color1").css({'background-color':color1});
  $(".color2").css({'background-color':color2});
  $(".color3").css({'background-color':color3});
  $(".color4").css({'background-color':color4});
  $(".color5").css({'background-color':color5});
}

clearInputs = () => {
  $('.project-input').val('');
  $('.save-palette-btn').val('');
}

$('.save-project-btn').click(function (event) {
  event.preventDefault()
  let projectName = $('.project-input').val()
  checkProjects(projectName)
  clearInputs()
  location.reload();
})

$('.saved-project-list').click(function (event) {
  const color1 = $(".cb1").css("background-color");
  const color2 = $(".cb2").css("background-color");
  const color3 = $(".cb3").css("background-color");
  const color4 = $(".cb4").css("background-color");
  const color5 = $(".cb5").css("background-color");
  const projectId = event.target.id
  const paletteId = event.target.title
  event.preventDefault();
  deletePalette(paletteId, projectId)
  location.reload();
  // repopulateSavedPalette(color1, color2, color3, color4, color5);
})

$('.project-form').click(function (event) {
  event.preventDefault();
})

$('.save-palette-btn').click(async function (event) {
  event.preventDefault();
  const projectId = await getMatchingProject();
  const palette = $('.palette-name').val()
  const color1 = $(".color1").css("background-color");
  const color2 = $(".color2").css("background-color");
  const color3 = $(".color3").css("background-color");
  const color4 = $(".color4").css("background-color");
  const color5 = $(".color5").css("background-color");
  postPalette(palette, projectId[0].id, color1, color2, color3, color4, color5)
  clearInputs()
  location.reload();
})

$(document).ready(function () {
    setRandomColor();
    fetchProjects();
    getMatchingPalettes();
})

$('.generate-btn').on('click', setRandomColor)

$('.colors').click(function() {
    $(this).find('i').toggleClass('fa-unlock fa-lock');
});

$('.colors').click(function() {
  $(this).attr('locked', function (i, attr) {
    return attr == 'true' ? 'false' : 'true'
  });
});