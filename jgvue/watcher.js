/**
 * watcher 观察者 用于发射更新的行为
 */
let watcherId = 0 //临时，用于调试，查看watcher和dep关联关系
class Watcher {
  constructor(vm, fn) {
    this.watcherId = watcherId++  //临时，用于调试，查看watcher和dep关联关系

    this.vm = vm      // Vue实例
    this.getter = fn  // 渲染或计算watcher 的函数
    this.deps = []    // 依赖项
    this.depIds = []  // 是Set类型，用于保证依赖项的唯一性 ，这里简化，不去实现
    // 在Vue中：this.lazy ? undefined : this.get()
    // 一开始需要渲染
    this.get()
  }
  // 计算--触发getter
  get() {
    pushTarget(this)
    this.getter.call(this.vm, this.vm)
    popTarget()
  }
  // 执行--判断是 懒加载、同步、还是异步
  // 这里简化同步，只考虑异步
  run() {
    this.get()
  }
  // 对外公开的方法，在属性发生变化时触发
  update() {
    this.run()
  }
  // 清空依赖队列
  clearUpdep() {

  }
  addDep(dep) {
    this.deps.push(dep)
  }
}