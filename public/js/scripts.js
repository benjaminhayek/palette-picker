function getRandomHex() {
    let digits = '0123456789ABCDEF';
    let hex = '#';
    for (var i = 0; i < 6; i++) {
      hex += digits[Math.floor(Math.random() * 16)];
    }
    return hex;
  }

function setRandomColor() {
    $(".color1").css("background-color", $('.color1').attr('locked') ? null : getRandomHex());
    $(".color2").css("background-color", $('.color2').attr('locked') ? null : getRandomHex());
    $(".color3").css("background-color", $('.color3').attr('locked') ? null : getRandomHex());
    $(".color4").css("background-color", $('.color4').attr('locked') ? null : getRandomHex());
    $(".color5").css("background-color", $('.color5').attr('locked') ? null : getRandomHex());
  }

$(document).ready(function() {
    setRandomColor()
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