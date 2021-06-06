/**
 * vue构造函数
 */
function JGVue(option) {
  this._data = option.data
  this._el = option.el
  this.$el = this._template = document.querySelector(option.el)
  this._parentNode = this._template.parentNode

  // 数据代理
  this.initData()
  // 挂载方法
  this.mount()
  
}