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
Array.prototype.__sort__ = Array.prototype.__sort__ || Array.prototype.sort;
Array.prototype.sort = function(argobj) {
    if (type(argobj) === type.dict) {
        var v = argobj.reverse ? -1 : 1;
        var cmpfunc = (a, b)=>(__lt__(a, b) ? -v : (__eq__(a, b) ? 0 : v));
        if (argobj.cmp != null) {
            let cmp = argobj.cmp;
            cmpfunc = (a, b) => (cmp(a, b) * v);
        } else if (argobj.key != null) {
            let key = argobj.key;
            cmpfunc = (a, b) => ((
                (ka, kb) => (__lt__(ka, kb) ? -v : (__eq__(ka, kb) ? 0 : v))
            )(key(a), key(b)));
        }
        return this.__sort__(cmpfunc);
    }
    return this.__sort__(argobj);
}

// override list[] (get & set)
Array.prototype.val = function(idx, value) {
    if (idx < 0) {
        idx = this.length + idx;
    }
    if (value === undefined) {
        return this[idx];
    }
    this[idx] = value;
    return value;
}

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
        if (type(a) !== type.dict || type(b) !== type.dict) {
            return false;
        }
        var keysA = Object.entries(a).sort();
        var keysB = Object.entries(b).sort();
        return keysA.__eq__(keysB);
    },
    __len__: function(obj) {
        if (type(obj) === type.dict) {
            return Object.keys(obj).length;
        }
    },
    keys: function(obj) {
        if (type(obj) === type.dict) {
            return Object.keys(obj);
        }
    },
    values: function(obj) {
        if (type(obj) === type.dict) {
            return Object.values(obj);
        }
    },
    items: function(obj) {
        if (type(obj) === type.dict) {
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

// bound methods of json
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

// bound methods of str
String.prototype.join = function(iterable) {
    return list(iterable).join(this);
}

// String.prototype.format is https://raw.githubusercontent.com/xfix/python-format/master/lib/python-format.js

String.prototype.strip = function(iterable) {
    return this.trim();
}

//__builtins__ functions
function __eq__(x, y) {
    if (type(x) === type.dict) {
        return dict.__eq__(x, y);
    }
    return (x != null && x.__eq__) ? x.__eq__(y) : x === y;
}

function __in__(x, seg) {
    if (type(seg) === type.str) {
        return seg.indexOf(x) !== -1;
    }
    if (type(seg) === type.dict) {
        return seg[x] !== undefined;
    }
    for (let item of seg) {
        if (__eq__(x, item)) {
            return true;
        }
    }
    return false;
}

function __lt__(x, y) {
    return (x != null && x.__lt__) ? x.__lt__(y) : x < y;
}

function __gt__(x, y) {
    return (x != null && x.__gt__) ? x.__gt__(y) : x > y;
}

function __slice__(seg, start, end, step) {
    var L = len(seg);
    if (start == null) {
        start = 0;
    } else if (start < 0) {
        start = L + start;
    }
    if (end == null) {
        end = L;
    } else if (end < 0) {
        end = L + end;
    }
    if (step == null) {
        step = 1;
    } else if (step == 0) {
        return;
    }
    var lst = [];
    if (step > 0) {
        for (let i = start; i < end; i += step) {
            lst.push(seg[i]);
        }
    } else if (step < 0) {
        for (let i = end - 1; i >= start; i += step) {
            lst.push(seg[i]);
        }
    }
    if (type(seg) === type.str) {
        return lst.join('');
    }
    return lst;
}

function len(x) {
    if (type(x) === type.dict) {
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
Object.assign(type, {
    list: "[object Array]",
    dict: "[object Object]",
    number: "[object Number]",
    str: "[object String]",
});

function chr(x) {
    return String.fromCharCode(x);
}

function ord(x) {
    return x.charCodeAt(0);
}

function print(x) {
    console.log(x);
}

function *enumerate(iterable, start) {
    if (start == null) {
        start = 0;
    }
    if (type(iterable) === type.dict) {
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

function map(func, iterable) {
    if (func == null) {
        func = (x=>x);
    }
    var ret = [];
    for (let x of iterable) {
        ret.push(func(x));
    }
    return ret;
}

function filter(func, iterable) {
    if (func == null) {
        func = (x=>true);
    }
    var ret = [];
    for (let x of iterable) {
        if (bool(func(x))) {
            ret.push(func(x));
        }
    }
    return ret;
}

function reduce(func, iterable, initial) {
    for (let x of iterable) {
        initial = (initial === undefined ? x : func(initial, x));
    }
    return initial;
}

function min() {
    var args = list(arguments);
    if (args.length === 1) {
        return reduce((x, y)=>(__lt__(x, y) ? x : y), args[0]);
    }
    return min(args);
}

function max() {
    var args = list(arguments);
    if (args.length === 1) {
        return reduce((x, y)=>(__lt__(x, y) ? y : x), args[0]);
    }
    return min(args);
}

function sum() {
    var args = list(arguments);
    if (args.length === 1) {
        return reduce((x, y)=>(x + y), args[0]);
    }
    return min(args);
}

function range(start, end, step) {
    if (start == null) {
        start = 0;
    }
    if (end == null) {
        [start, end] = [0, start];
    }
    if (step == null) {
        step = 1;
    }
    var ret = [];
    for (let i = start; i < end; i += step) {
        ret.push(i);
    }
    return ret;
}

function zip() {
    var args = map(x=>list(x), list(arguments));
    var L = min(map(x=>len(x), args));
    var ret = [];
    for (let i = 0; i < L; i++) {
        let tmp = [];
        for (let j = 0; j < args.length; j++) {
            tmp.push(args[j][i]);
        }
        ret.push(tmp);
    }
    return ret;
}

if (typeof module !== 'undefined') {
    module.exports = null;
}
