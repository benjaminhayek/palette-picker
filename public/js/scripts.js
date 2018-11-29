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

fetchProjects = async () => {
  try{
    const url = '/api/v1/palette_projects';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
  } catch (error) {
    console.log(error.message)
  }
}

postPalette = async (palette, color1, color2, color3, color4, color5) => {
  try {
    const url = '/api/v1/palette_projects';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({palette: palette, color1: color1, color2: color2, color3: color3, color4: color4, color5: color5}),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json();
  } catch (error) {
    console.log(error.message)
  }
}

clearInputs = () => {
  $('.project-input').val('')
}

$('.save-project-btn').click(function (event) {
  event.preventDefault()
  let projectName = $('.project-input').val()
  createProject(projectName)
  clearInputs()
})

$('.project-form').click(function (event) {
  event.preventDefault();
})

$(document).ready(function() {
    setRandomColor()
    fetchProjects()
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