
function get_themes() {
  var themes = {
    'a' : {
      name : "Dark",
      func : thm_standard,
      preview: prv_standard
    },
    'b' : {
      name : "Light",
      func : thm_combo,
      preview: prv_combo
	}
  };
	
  return themes;
}

function apply_theme(theme_id) {
  var themes = get_themes();
  themes[theme_id].func();
}

/*******************
 ** DEFAULT THEME **
 *******************/

/**
 * Applies a representative style to the UI element that the represents
 * this theme.
 */
function prv_standard(element) {
  element.css('background-image', 'url(/img/debut_dark.png)');
}

function thm_standard() {
  // Set global colors and fonts.
  $('body').css('background-image', 'url(/img/debut_dark.png)');
  $('body').css('background-repeat', 'repeat');
  $('#heading').css('color', '#DBDBAD');
  $('#heading').css('text-shadow', '2px 2px 2px #333');
  
  // Title-specific properties.
  $('#title').css('font-size', '4em');
  $('#title').css('color', '#DBDBAD');
  $('#title').css('padding-bottom', '1%');
  $('#title').css('text-shadow', '2px 2px .1em #333');

  // Countdown-specific properties.
  $('#countdown').css('color', '#fff');
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

/*****************
 ** COMBO THEME **
 *****************/
 
function prv_combo(element) {
  element.css('background-image', 'url(/img/nasty_fabric.png)');
}

function thm_combo() {
  $('body').css('background-image', 'url(/img/nasty_fabric.png)');
  $('body').css('background-repeat', 'repeat');
  $('h1').css('text-shadow', '0px 0px');
  $('#heading').css('color', '#2A75A9');
  $('#heading').css('text-shadow', 'none');
  
  // Title-specific properties.
  $('#title').css('font-size', '4em');
  $('#title').css('color', '#2A75A9');
  $('#title').css('padding-bottom', '1%');
  $('#title').css('text-shadow', '2px 2px .1em #fff');
  
  // Countdown-specific properties.
  $('#countdown').css('color', '#222');
  $('#countdown').css('font-size', '8em');
  $('#countdown').css('text-shadow', '2px 2px .1em #fff');
  
  // Labels.
  $('.label').css('font-size', '.3em');
  $('#year_label').css('position', 'relative');
  
    // Links
  $('a').css('text-decoration', 'none');
  $('a').css('color', 'white');
  
  $('#body').css('background-color', 'rgba(255, 255, 255, .45)');
	
}
