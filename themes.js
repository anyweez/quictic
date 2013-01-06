
function apply_theme(theme_id) {
  // var themes = {
//     'a' : {
//       name : "Standard"
//       func : standard
//     }
//   };
  standard();
//  themes[theme_id]();
}

function standard() {
  // Set global colors and fonts.
  $('body').css('background-image', 'url(img/debut_dark.png)');
  $('body').css('background-repeat', 'repeat');
  $('body').css('color', '#fff');
  
  // Title-specific properties.
  $('#title').css('font-size', '4em');
  $('#title').css('color', '#858774');
  $('#title').css('padding-top', '10%');
  $('#title').css('padding-bottom', '1%');

  // Countdown-specific properties.
  $('#countdown').css('font-size', '8em');
  
  // Labels.
  $('.label').css('font-size', '.3em');
  $('#year_label').css('position', 'relative');
}

