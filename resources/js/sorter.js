var Sorter = {};

Sorter.insertionSort = function(jumbledArray) {

  var sortedArray = [];

  for (var i = 0; i < jumbledArray.length; i++) {
    if (sortedArray.length == 0) {
      sortedArray.push(jumbledArray[i]);
    }
    else {
      for (var j = 0; j < sortedArray.length; j++) {
        if (jumbledArray[i] >= sortedArray[j]) {
          if (j == sortedArray.length-1) {
            sortedArray.push(jumbledArray[i]);
            break;
          }
        }
        else {
          sortedArray.splice(j, 0, jumbledArray[i]);
          break;
        }
      }
    }
  }
  return sortedArray;
};

Sorter.sortDown = function(field) {

  var jumbledResults = $('#results');

  var sortedResults = [];

  jumbledResults.children().each(function() {

    if (sortedResults.length == 0) {
      sortedResults.push($(this));
    }

    else {
      for (var i = 0; i < sortedResults.length; i++) {

        var jumbledOne = $(field, this).text().toLowerCase().replace(' ', '');
        var sortedOne = $(field, sortedResults[i]).text().toLowerCase().replace(' ', '');

        if (jumbledOne >= sortedOne) {
          if (i == sortedResults.length - 1) {
            sortedResults.push($(this));
            break;
          }
        }
        else {
          sortedResults.splice(i, 0, $(this));
          break;
        }
      }
    }
  });

  $('#results').empty();

  for (j = 0; j < sortedResults.length; j++) {
    $('#results').append(sortedResults[j]);
  }

  $('#results').data('sortedByClass', field);
};

Sorter.reverse = function() {

  var originalResults = $('#results');

  var reversedResults = [];

  originalResults.children().each(function() {
    reversedResults.unshift($(this));
  });

  $('#results').empty();

  for (i = 0; i < reversedResults.length; i++) {
    $('#results').append(reversedResults[i]);
  }
};

Sorter.getSortStatus = function(field) {

  /* if sorted by that field, reverse all the results.
     if not sorted at all, sortdown.
     if sorted by another field, sortdown. */

  var sortedByClass = $('#results').data('sortedByClass');

  if (sortedByClass == field) {
    Sorter.reverse();
  }
  else {
    Sorter.sortDown(field);
  }
};
