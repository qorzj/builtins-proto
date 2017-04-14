## builtins-proto介绍
### 原理
```
> Array.prototype.hello = function() {
...   console.log('size: '+this.length);
... 
}
> b = [1,2,3]
[ 1, 2, 3  ]
> b.hello()
size: 3
> Array.prototype.__doc__ = 'i am doc string'
'i am doc string'
> b.__doc__
'i am doc string'
```

### CDN
```
<script src="https://h5.parsec.com.cn/utils/js/python-format.js"></script>
<script src="https://h5.parsec.com.cn/utils/js/python-builtins.js"></script>
```

## 方法列表
### dir([])
* append(x)
* count(x)
* extend(lst)
* index(value, start, stop)
* insert(idx, item)
* pop(idx)
* reverse()
* sort({key, cmp, reverse})
* val(idx, value)

### dir(dict)
* keys(obj)
* values(obj)
* items(obj)
* has_key(obj, key)
* get(obj, key, default)
* pop(obj, key)
* update(obj, obj1, obj2...)
* clear(obj)
* copy(obj)
* setdefault(obj, key, default)

### dir('')
* count(sub, start, end)
* find(sub, start, end)
* join(iterable)
* isalnum(), isalpha(), isdigit(), isspace()
* lower(), upper()
* splitlines(keepends)
* strip()
* wrap(x, a, b)  # `a:attr_dict b:round_level x:tag`
* wrapin(x, a)  # `a:attr_dict x:tag`

### dir(str)
* split(text, sep, maxsplit)
* rsplit(text, sep, maxsplit)
* replace(text, older, newer, count)
* ``` `${x}` ```的变量替换语法

### dir(json)
* loads(jsonText)
* dumps(obj)
* log(obj)

### dir(urllib)
* quote(text)
* unquote(text)
* param(search='') -> dict

### dir(type)
* list, dict, number, str
* isnan(x)
* isint(x)

### builtins
* str(x)
* `__eq__(x, y)`
* `__in__(x, seg)`
* `__lt__(x, y)`
* `__gt__(x, y)`
* `__slice__(seg, start, end, step)`
* len(x)
* abs(x)
* bool(x), int(x), float(x)
* type(x)
* chr(x), ord(x)
* print(x)
* enumerate(iterable, start)
* list(iterable)
* map(func, iterable), filter(func, iterable)
* reduce(func, iterable, initial)
* `min(...)`, `max(...)`, `sum(...)`
* range(start, end, step) -> list
* zip(lst1, lst2, lst3...)
* `for (x of lst) {...}` 循环语法
