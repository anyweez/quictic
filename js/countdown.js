
var current_ts = 0;
var target_ts = 0;

var theme = null;
var title = null;

/**
 * Parse arguments out of the URL.
 */
function parseArgs() {
//  var url = 'http://url/a/20131225/The Lebanese son returns in...';   //window.location.pathname;
  var url = window.location.pathname;
  // protocol://url/theme_id/target/[title]
  // target := yyyymmdd@hhmmss
  parts = url.split('/');
  console.log(parts);
  
  try {
   theme = parts[parts.length - 3];
   if (theme.length > 1) return false;
   
   date_str = parts[parts.length - 2];
   if (date_str.length < 8 || 
       date_str.length > 15 || 
       date_str.search('[a-z-A-Z]') > -1) return false;
   
   title = parts[parts.length - 1];
   if (title.length < 1) return false;
  
   // Parse date and time if @ symbol exists.
   if (date_str.indexOf('@') >= 0) {
    target_ts = new Date(
     date_str.substring(0,4),  // year
     date_str.substring(4,6) - 1,  // month
     date_str.substring(6,8),  // day
     date_str.substring(9,11), // hour
     date_str.substring(11,13), // minutes
     date_str.substring(13,15) // seconds
    ).getTime();
   }
   // Otherwise just pull out the date.
   else {
    target_ts = new Date(
     date_str.substring(0,4),  // year
     date_str.substring(4,6) - 1,  // month
     date_str.substring(6,8),  // day
     0, 0, 0
    ).getTime();
   }
  }
  catch (e) {
   return false;
  }
  
  return true;
}

function update() {
  current_ts = $.now();
  // If the clock still has time, count it down.
  if (target_ts - current_ts > 0) update_clock();
  // If not, do something else...
  // TODO: Do something awesome.
}

function update_clock() {
  // Thank you date.js and time.js!
  var ts = new TimePeriod(new Date(current_ts), new Date(target_ts));   

  // Change all of the visible fields.
  set_field('years', ts.years);
  set_field('months', ts.months);
  set_field('days', ts.days);
   
  set_field('hours', (ts.hours < 10) ? "0" + ts.hours : ts.hours);
  set_field('minutes', (ts.minutes < 10) ? "0" + ts.minutes : ts.minutes);
  set_field('seconds', (ts.seconds < 10) ? "0" + ts.seconds : ts.seconds);
}

function set_field(field_name, value) {
  $('#' + field_name).text(value);
}

$(document).ready(function() {
  if (parseArgs()) {
   // Set the title.
   $('#title').text(title);
   document.title = title + " - quictic.com";

   // Update the theme.
   apply_theme(theme);
  
   setInterval(update, 1000);
   update();
  }
  // Couldn't parse the URL correctly...required pieces are missing.
  else {
   $('#title').html("Hmm...invalid countdown. Try <a href='http://quictic.com/'>creating a new one</a>?");
   document.title = 'Invalid countdown - quictic.com';
   
   $('#countdown').css('display', 'none');
   apply_theme('a');
  }
});
