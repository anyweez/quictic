
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
  $('body').css('background-image', 'url(/img/debut_dark.png)');
  $('body').css('background-repeat', 'repeat');
  $('body').css('color', '#fff');
  
  // Title-specific properties.
  $('#title').css('font-size', '4em');
  $('#title').css('color', '#DBDBAD');
  $('#title').css('padding-bottom', '1%');
  $('#title').css('text-shadow', '2px 2px .1em #333');

  // Countdown-specific properties.
  $('#countdown').css('font-size', '8em');
  $('#countdown').css('text-shadow', '2px 2px .1em #333');
  
  // Labels.
  $('.label').css('font-size', '.3em');
  $('#year_label').css('position', 'relative');
  
  // Links
  $('a').css('text-decoration', 'none');
  $('a').css('color', 'white');
  
  // #body
  $('#body').css('margin-top', '10%');
  $('#body').css('padding', '30px 0px 20px 0px');
  $('#body').css('border', '1px solid black');
  $('#body').css('background', 'rgba(255, 255, 255, .15)');
}

