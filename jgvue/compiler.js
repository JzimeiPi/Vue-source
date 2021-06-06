/**
 * 插值表达式解析方法-模版与数据结合
 */ 
function compiler(template, data) {
  const rule = /\{\{(.+?)\}\}/g
  let childNodes = template.childNodes
  childNodes.forEach(el => {
    let { _nodeType, _nodeValue } = el
    if (_nodeType === 1) {
      compiler(el, data)
    } else if (_nodeType === 3) {
      let txt = _nodeValue.replace(rule, (_, g) => {
        let path = g.trim()
        return getValueByPath(data, path)
      })
      el._nodeValue = txt
    }
  })
  return template
}


/** 
 * 获取插值表达式中 变量 在 data 中的值（满足链式调用 xx.yy. ··· nn）
 */ 
function getValueByPath(data, path) {
  let paths = path.split('.')
  let k
  let obj = data
  while(k = paths.shift()) {
    obj = obj[k]
  }
  return obj
}
