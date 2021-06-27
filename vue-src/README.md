# 目录分析
## compiler 编译文件夹
  - Vue 使用 字符串 作为模版
  - 编译文件夹中存放对 模版字符串 解析的算法、抽象语法树、优化等
## core 核心
  - Vue构造函数，生命周期等方法
  1. **组件挂载（mount）之前做了什么？？？**

  - ./observer目录
    1. array.js 创建含有重写数组方法的数组，让所有响应式数据数组继承自该数组
    2. dep.js Dep类
    3. index.js Observer类，observer的工厂函数
    4. scheduler.js Vue中任务调度的工具，watcher执行的核心
    5. traverse.js 递归遍历响应式数据，目的是触发依赖收集
    6. watcher.js Watcher类
    
## platforms 平台
  - Vue入口
  - 针对运行的环境（设备），有不同的实现
## server 服务端
  - 主要是将Vue用在服务端的处理代码
## sfc 单文件组件
## shared 公共工具 

# Vue执行流程
- 初始化生命周期的状态
- 初始化事件容器
- 初始化创建元素方法
    创建了Dep
- beforeCreate ，初始化接下来开始。。。
- 初始化vue组件内的属性
  - props
  - methods
  - data
      数据代理，响应式化，这时候还没有依赖收集，因为vue正在初始化，模版还没渲染
  - computed
  - watch
- created ，现在初始化已经完成，vue内属性全部可以访问
- 准备 render 方法
- beforeMount ，这时候内存中保存了要渲染到页面的模版，接下来开始挂载
- 将vue的 渲染方法 render 添加到 Watcher 中
- mounted ，挂载完成