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

Sorter.sortByField = function(field) {

  jumbledResults = $('#results');

  sortedResults = [];

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
};
