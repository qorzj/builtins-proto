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
    // only for list which depth=1
    if (!(arr instanceof Array)) {
        return false;
    }
    if (this.length !== arr.length) {
        return false;
    }
    for (let i=0;i<arr.length;i++) {
        if (this[i] !== arr[i]) {
            return false;
        }
    }
    return true;
}

Array.prototype.__lt__ = function(arr) {
    // only for list which depth=1
    if (!(arr instanceof Array)) {
        return this < arr;
    }
    var L1 = this.length;
    var L2 = arr.length;
    var Lmin = L1 < L2 ? L1 : L2;
    for (var i = 0; i < Lmin; i++) {
        if (this[i] !== arr[i]) {
            return this[i] < arr[i];
        }
    }
    return L1 < L2;
}

Array.prototype.__gt__ = function(arr) {
    // only for list which depth=1
    if (!(arr instanceof Array)) {
        return this > arr;
    }
    var L1 = this.length;
    var L2 = arr.length;
    var Lmin = L1 < L2 ? L1 : L2;
    for (var i = 0; i < Lmin; i++) {
        if (this[i] !== arr[i]) {
            return this[i] > arr[i];
        }
    }
    return L1 > L2;
}

//__builtins__ functions
function type(x) {
  //return x.constructor;
  return Object.prototype.toString.call(x);
}


// module.exports = null;
