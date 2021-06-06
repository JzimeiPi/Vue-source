/**
 * JGVue.prototype
 */
 JGVue.prototype.mount = function () {
  // 需要一个render方法，生成 VNode
  // Vue中：render方法是可以自定义的，不定义会自动生成
  // 此案例中：简化，
  this.render = this.createRender()
  // 挂载方法
  this.mountComponent()
}

JGVue.prototype.mountComponent = function () {
  // 这里的render返回 带有数据的VNode（新）
  let mount = () => {
    this.update(this.render())
  }
  // 1、
  // mount()  
  // 2、Vue中：使用发布订阅模式，渲染和计算的行为应交给watcher来完成
  // 这里的watcher相当于全局 watcher，任何地方都可以访问
  // 这里相当于调用了mount 方法
  new Watcher(this, mount) 
}

// 生成render方法，
// Vue中：作用是缓存抽象语法树
// 此案例中：我们使用 VNode 模拟 抽象语法树（AST）
JGVue.prototype.createRender = function () {
  // 这里使用函数柯里化，将 抽象语法树 缓存起来了
  // let ast = createVNode(this._template) 
  // Vue中：AST + data =》VNode
  // 此案例中：带插值的VNode + data =》带数据的VNode
  return function render() {
    let ast = createVNode(this._template) //临时解决bug

    // 返回一个 新的VNode，用于和 VNode 通过diff算法比较 更新 VNode
    return compiler(ast, this._data)
  }
}

// 将VNode渲染到页面，diff算法就在这一步 
JGVue.prototype.update = function (vnode) {
  // 此案例中：简化，
  // 生成真实dom
  let _node = parseNode(vnode)
  // Vue中：刷新页面使用diff算法，局部替换dom
  // 此案例中：简化，每次会将页面中 dom 全部替换，因此每次都要重新获取dom
  this._parentNode.replaceChild(_node, document.querySelector('#app'))
}