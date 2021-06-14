import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

/**
 * Vue 构造函数
 */
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)  //这里判断是否使用new关键字（就是函数构造器模式调用）
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options) //初始化方法
}

initMixin(Vue)      //挂载  初始化方法
stateMixin(Vue)     //挂载 状态处理方法
eventsMixin(Vue)    //挂载 事件的方法
lifecycleMixin(Vue) //挂载 生命周期方法
renderMixin(Vue)    //挂载 与渲染有关的方法

export default Vue
