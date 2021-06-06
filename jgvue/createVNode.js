/**
 * 真实dom 转 虚拟dom
 */
function createVNode(node) {
  let nodeType = node.nodeType
  let _vnode = null
  if (nodeType === 1) {
    let nodeName = node.nodeName
    let childNodes = node.childNodes
    let attributes = node.attributes
    let _attrObj = {}
    // [].slice.call(attributes)
    ;[...attributes].forEach(attr => {
      _attrObj[attr.nodeName] = attr.nodeValue
    })
    _vnode = new VNode(nodeName, undefined, nodeType, _attrObj)
    childNodes.forEach(ele => {
      _vnode.appendChild(createVNode(ele))
    })
  } else if (nodeType === 3) {
    _vnode = new VNode(undefined, node.nodeValue, nodeType, undefined)
  }
  return _vnode
}
