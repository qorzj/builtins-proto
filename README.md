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

### 目标
* 实现python的```__builtins__```
* 不考虑语法层面的运算符重载
* 结束python和javascript到底哪家强的论战

