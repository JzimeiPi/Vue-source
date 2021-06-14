# 目录分析
## compiler 编译文件夹
  - Vue 使用 字符串 作为模版
  - 编译文件夹中存放对 模版字符串 解析对算法、抽象语法树、优化等
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