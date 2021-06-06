/**
 * 处理数据响应式化 内置方法
 */
// 方法解决的问题：
// - 如果要同时使用get、set就需要一个中间变量存储真正的数据
// - 这个中间变量会暴露在全局作用域 这样不安全
function defineReactive(target, key, value, enumerable) {
  // value 作为 中间变量 ，函数作用域 （闭包）
  // 如果是 引用类型，且不是数组，递归
  let _this = this
  if (typeof value === 'object' && value !== null) {
    reactify(value)
  }

  // 
  let dep = new Dep()
  dep.__$prop__ = key   //临时的，用于调试

  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: !!enumerable,
    get() {
      // 读取：watcher 依赖收集 在depend方法内
      dep.depend()
      return value
    },
    set(newValue) {
      if (newValue === value) return
      // 解决赋值时响应式化
      if (typeof newValue === 'object' && newValue !== null) {
        reactify(newValue)
      }
      value = newValue
      // Vue 2.x中：数组本身是没办法响应式化的，所以给数组赋值，新的值不会响应式化

      // 1、目前还没有 watcher，直接刷新模版
      // _this.mountComponent()

      // 2、有watcher
      // 修改数据：派发更新
      dep.notify()
    }
  })
}

// 2、层级复杂的数据如何实现响应式？？？
// 递归，也可使用 队列 （深度优先转换为广度优先）

/**
 * 处理对象响应式方法
 */
function reactify(data, vm) {
  // 2.1.判断是数组，循环设置响应式
  // 2.2.判断是引用类型，且不是数组，递归
  let keys = Object.keys(data)
  keys.forEach(k => {
    let v = data[k]
    if (Array.isArray(v)) {
      v.__proto__ = setArrMethodsByProto()
      v.forEach(o => {
        reactify(o, vm)
      })
    } else {
      defineReactive.call(vm, data, k, v, true)
    }
  })
}
// push、pop、unshift、shift、splice、sort、reverse --Vue源码提供的方法
// 实现效果：
//    3.1.改变数组数据时，发出通知
//    3.2.push 来的数据也要响应式化
// 实现技巧： 对一个已经定义了的函数进行扩展
//  -1.使用临时名存储定义了的函数
//  -2.重新定义原来的函数
//  -3.定义扩展功能
//  -4.调用临时函数

// 处理数组中以下方法响应式化
// 思路：原型式继承 ：修改原型链的结构
function setArrMethodsByProto() {
  let ARRAY_METHODS = [
    'push',
    'pop',
    'unshift',
    'shift',
    'splice',
    'sort',
    'reverse'
  ] 
  // 继承关系：arr -> Array.prototype -> Object.prototype -> ...
  // 继承关系：arr -> 在这里改写 -> Array.prototype -> Object.prototype -> ...
  
  let array_methods = Object.create(Array.prototype)
  ARRAY_METHODS.forEach(method => {
    // 只改变 ARRAY_METHODS 罗列的这部分，保证数组中其他属性不变
    array_methods[method] = function () {
      console.log(`调用拦截的${method}方法`)
      // arguments 伪数组
      ;[...arguments].forEach(arg => {
        // FIXME: 这里无法传入this，需要在引入watcher后进行优化
        reactify(arg)
      })
      return Array.prototype[method].apply(this, arguments)
    }
  })
  return array_methods
}

/**
 * 将一个对象的属性的访问 映射到 对象某一个属性的成员上
 */
function proxy(target, prop, key) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      return target[prop][key]
    },
    set(newVal) {
      target[prop][key] = newVal
    }
  }) 
}

/**
 * 数据代理、响应式化
 */
JGVue.prototype.initData = function () {
  // 将_data中属性代理到实例上
  // 属性响应式化
  let keys = Object.keys(this._data)
  keys.forEach(k => {
    proxy(this, '_data', k)
  })
  reactify(this._data, this)
}