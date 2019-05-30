var Sorter = {};

/*
  this is an insertion sort method for a simple array. I created this so I
  could perfect the sorting algorithm before complicating it with jquery objects
  and the like.
*/
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

/*
  sort the rows of results, from A (top) to Z (bottom), based on one field,
  which may be '.name', '.artist' or '.listeners'.
*/
Sorter.sortDown = function(field) {

  var jumbledResults = $('#results');

  var sortedResults = [];

  jumbledResults.children().each(function() {

    if (sortedResults.length == 0) {
      sortedResults.push($(this));
    }

    else {
      for (var i = 0; i < sortedResults.length; i++) {

        // strip the spaces and convert all letters to lowercase, so they can
        // be compared more accurately for sorting.
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

  // remove the unsorted rows, and then replace with the newly sorted ones.
  $('#results').empty();

  for (j = 0; j < sortedResults.length; j++) {
    $('#results').append(sortedResults[j]);
  }

  $('#results').data('sortedByClass', field);
};

/*
  Reverse the order of the results.
*/
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

/*
  This is the first method that is called when a sortable column heading is
  clicked. It checks the results' "sortedByClass" data attribute to figure out
  if the rows have already been sorted by the specified field. if so, then it
  reverses the results. if not, then it sorts the results by the specified
  field, from A to Z.
*/
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
