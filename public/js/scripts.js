function getRandomHex() {
    let digits = '0123456789ABCDEF';
    let hash = '#';
    for (var i = 0; i < 6; i++) {
      hash += digits[Math.floor(Math.random() * 16)];
    }
    return hash;
  }

function setRandomColor() {
    $(".color1").css("background-color", getRandomHex());
    $(".color2").css("background-color", getRandomHex());
    $(".color3").css("background-color", getRandomHex());
    $(".color4").css("background-color", getRandomHex());
    $(".color5").css("background-color", getRandomHex());
  }

$(document).ready(function() {
    setRandomColor()
})

$('.generate-btn').on('click', setRandomColor)