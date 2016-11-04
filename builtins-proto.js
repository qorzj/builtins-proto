"use strict";

// bound methods of list
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
        if (!__eq__(this[i], arr[i])) {
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
        if (!__eq__(this[i], arr[i])) {
            return __lt__(this[i], arr[i]);
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
        if (!__eq__(this[i], arr[i])) {
            return __gt__(this[i], arr[i]);
        }
    }
    return L1 > L2;
}

Array.prototype.append = function(x) {
    return this.push(x);
}

Array.prototype.count = function(x) {
    var n = 0;
    this.forEach(item => {
        if (item === x) {
            n += 1;
        }
    });
    return n;
}

Array.prototype.extend = function(lst) {
    for (let x of lst) {
        this.push(x);
    }
    return this;
}

Array.prototype.index = function(value, start, stop) {
    var begin = (start === undefined) ? 0 : start;
    var end = (stop === undefined) ? this.length : stop;
    for (let i = begin; i < end; i++) {
        if (__eq__(this[i], value)) {
            return i;
        }
    }
    return -1;
}

Array.prototype.insert = function(idx, obj) {
    this.push(undefined);
    for (let i = this.length - 1; i > idx; i--) {
        this[i] = this[i-1];
    }
    this[idx] = obj;
    return this;
}

Array.prototype.__pop__ = Array.prototype.__pop__ || Array.prototype.pop;
Array.prototype.pop = function(idx) {
    var p = (idx === undefined) ? this.length - 1 : idx;
    var ret = this[p];
    for (let i = p; i < this.length - 1; i++) {
        this[i] = this[i + 1];
    }
    this.__pop__();
    return ret;
}

// Array.prototype.reverse is [native code]

// Array.prototype.sort is [native code]

Array.prototype.sortbykey = function(key, reverse) {
    var v = reverse ? -1 : 1;
    if (key == null) {
        key = (x => x);
    }
    var cmpfunc = (a, b) => (
        (ka, kb) => (__lt__(ka, kb) ? -v : (__eq__(ka, kb) ? 0 : v))
    )(key(a), key(b));
    this.sort(cmpfunc);
    return this;
}

// bound methods of dict
/*
Object.prototype.__eq__ = function(obj) {
    var keysA = Object.entries(this).sort();
    var keysB = Object.entries(obj).sort();
    return keysA.__eq__(keysB);
}

Object.prototype.__len__ = function() {
    return Object.keys(this).length;
}
*/

// unbound methods of dict
function dict(lst) {
    var ret = {};
    for (let [k, v] of lst) {
        ret[k] = v;
    }
    return ret;
}

Object.assign(dict, {
    __eq__: function(a, b) {
        if (!isobject(a) || !isobject(b)) {
            return false;
        }
        var keysA = Object.entries(a).sort();
        var keysB = Object.entries(b).sort();
        return keysA.__eq__(keysB);
    },
    __len__: function(obj) {
        if (isobject(obj)) {
            return Object.keys(obj).length;
        }
    },
    keys: function(obj) {
        if (isobject(obj)) {
            return Object.keys(obj);
        }
    },
    values: function(obj) {
        if (isobject(obj)) {
            return Object.values(obj);
        }
    },
    items: function(obj) {
        if (isobject(obj)) {
            return Object.entries(obj);
        }
    },
    has_key: function(obj, key) {
        return obj[key] === undefined;
    },
    get: function(obj, key, defaultValue) {
        return obj[key] === undefined ? defaultValue : obj[key];
    },
    pop: function(obj, key) {
        var ret = obj[key];
        delete obj[key];
        return ret;
    },
    update: function() {
        return Object.assign.apply(null, arguments);
    },
    clear: function(obj) {
        var keys = Object.keys(obj);
        for (var k of keys) {
            delete obj[k];
        }
        return obj;
    },
    copy: function(obj) {
        return Object.assign({}, obj);
    },
});

// unbound methods of json
var json = {
    loads: function(jsonText) {
        return JSON.parse(jsonText);
    },
    dumps: function(obj) {
        return JSON.stringify(obj);
    },
    log: function(obj) {
        console.log(JSON.stringify(obj));
    }
}

//__builtins__ functions
function __eq__(x, y) {
    if (isobject(x)) {
        return dict.__eq__(x, y);
    }
    return (x != null && x.__eq__) ? x.__eq__(y) : x === y;
}

function __lt__(x, y) {
    return (x != null && x.__lt__) ? x.__lt__(y) : x < y;
}

function __gt__(x, y) {
    return (x != null && x.__gt__) ? x.__gt__(y) : x > y;
}

function len(x) {
    if (isobject(x)) {
        return dict.__len__(x);
    }
    if (x != null && x.__len__) {
        return x.__len__();
    }
    if (x != null && x.length != null) {
        return x.length;
    }
}

function abs(x) {
    return Math.abs(x);
}

function bool(x) {
    var L = len(x);
    return L === undefined ? Boolean(x) : (L != 0);
}

function int(x) {
    return parseInt(x);
}

function float(x) {
    return parseFloat(x);
}

function type(x) {
    //return x.constructor;
    return Object.prototype.toString.call(x);
}

function print(x) {
    console.log(x);
}

function isobject(x) {
    return type(x) === '[object Object]';
}

function *enumerate(iterable, start) {
    if (start == null) {
        start = 0;
    }
    if (isobject(iterable)) {
        iterable = dict.keys(iterable);
    }
    var cc = 0;
    for (let x of iterable) {
        if (cc >= start) {
            yield [cc, x];
        }
        cc += 1;
    }
}  

function list(iterable) {
    if (iterable == null) {
        return [];
    }
    var ret = [];
    for (let [i, x] of enumerate(iterable)) {
        ret.push(x);
    }
    return ret;
}

function *map(func, iterable) {
    if (func == null) {
        func = (x=>x);
    }
    for (let x of iterable) {
        yield func(x);
    }
}

function *filter(func, iterable) {
    if (func == null) {
        func = (x=>true);
    }
    for (let x of iterable) {
        if (bool(func(x))) {
            yield func(x);
        }
    }
}

function *reduce(func, iterable, initial) {
    for (let x of iterable) {
        initial = (initial === undefined ? x : func(initial, x));
    }
    return initial;
}

// module.exports = null;
