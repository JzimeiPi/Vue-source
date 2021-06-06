this.depId = 0  //临时，用于调试，查看watcher和dep关联关系
class Dep {
  constructor() {
    this.depId = depId++ //临时，用于调试，查看watcher和dep关联关系

    // 存储的是当前Dep关联的watcher，也就是要渲染的当前属性的watcher
    this.subs = []  
  }
  // 添加一个watcher
  addSub(target) {
    this.subs.push(target)
  }
  // 移除
  removeSub() {
    for(let i = this.subs.length-1; i >= 0; i--) {
      this.subs.splice(i, 1)
    }
  }
  // 将 当前Dep 与 当前watcher 相互关联 
  depend() {
    if (Dep.target) {
      this.addSub(Dep.target)
      Dep.target.addDep(this)
    }
  }
  // 触发与之关联的watcher的 update方法，起到更新的作用
  // 内部就是将 dep 中 subs 取出一次调用其中的update方法
  // subs 里面存储的是 要渲染的属性的watcher
  notify() {
    let deps = this.subs.slice()
    deps.forEach(watcher => {
      watcher && watcher.update()
    })
  }
}

// 全局的容器存储 渲染watcher
Dep.target = null
let targetStack = []
// 将当前操作的 watcher 存储到 全局watcher中，target是当前watcher
// 在 watcher调用get时调用
function pushTarget(target) {
  targetStack.unshift(Dep.target)
  Dep.target = target
}
// 将 当前watcher踢出
// 在 watcher调用get结束时候调用
function popTarget() {
  Dep.target = targetStack.shift() //最后为undefined
}
