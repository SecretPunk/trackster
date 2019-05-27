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
