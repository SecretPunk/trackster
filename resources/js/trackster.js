/*jshint esversion: 6 */

const API_KEY = '9c828a3d330b676e787d3a6dca7bad1b';

$(document).ready(function() {

  // initially, the results are not sorted by any class
  $('#results').data('sortedByClass', 'none');

  // wait for the click event before searching
  $('#search-button').click(function() {
    Trackster.searchTracksByTitle($('#input').val());
  });

  // wait for the enter key before searching
  $('#input').keyup(function(event) {
    if (event.which == 13) { // search for songs when Enter is pressed
      Trackster.searchTracksByTitle($('#input').val());
    }
  });

  // if a sortable column heading is clicked, run the sorting method
  $('.sortable').click(function() {

    if ($(this).hasClass('name')) {
      Sorter.getSortStatus('.name');
    }
    else if ($(this).hasClass('artist')) {
      Sorter.getSortStatus('.artist');
    }
    else {
      Sorter.getSortStatus('.listeners');
    }
  });
});


var Trackster = {};

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {

  var name, artist, imageURL, listeners;

  $('#results').empty(); // empty out the results before displaying the new ones

  for (var i = 0; i < tracks.length; i++) {

    trackURL = tracks[i].url;
    name = tracks[i].name;
    artist = tracks[i].artist;
    imageURL = tracks[i].image[1]["#text"];
    listeners = tracks[i].listeners;

    var oneRow =
      '<div class="one-result row">' +
        '<div class="col-xs-1 play-button">' +
          '<a href=' + trackURL + '><i class="fa fa-play-circle-o fa-2x"></i></a>' +
        '</div>' +
        '<div class="col-xs-4 name">' + name + '</div>' +
        '<div class="col-xs-4 artist">' + artist + '</div>' +
        '<div class="col-md-2 artwork">' +
          '<img src=' + imageURL + '>' +
        '</div>' +
        '<div class="col-xs-3 col-md-1 listeners">' + Trackster.formatListeners(listeners) + '</div>' +
      '</div>';

    $('#results').append(oneRow);
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {

  $.ajax( {
    url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json',
    datatype: 'jsonp',
    success: function(data) {
      console.log(data);
      Trackster.renderTracks(data.results.trackmatches.track);
    }
  });
};

/*
  Pads number of listeners so that it is 8 digits long, making it easier
  to line up all the numbers in the Listeners column of the results.
*/
Trackster.formatListeners = function(numString) {

  const requiredLength = 8; /* allows for up to 99999999 listeners */
  var paddingAmount = requiredLength - numString.length;

  for (var i = 0; i < paddingAmount; i++) {
    numString = '0' + numString;
  }

  return numString;
};
