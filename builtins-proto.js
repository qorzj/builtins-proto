"use strict";
Array.prototype.count = function(x) {
  var n = 0;
  this.forEach(item => {
    if (item === x) {
      n += 1;
    }
  });
  return n;
}

Array.prototype.__len__ = function() {
  return this.length;
}

Array.prototype.__eq__ = function(arr) {
  if (!(arr instanceof Array)) {
    return false;
  }
  if (this.length != arr.length) {
    return false;
  }
  for (let i=0;i<arr.length;i++) {
    if (this[i] !== arr[i]) {
      return false;
    }
  }
  return true;
}

module.exports = null;
