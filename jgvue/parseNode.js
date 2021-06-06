/**
 * 虚拟dom 转 真实dom
 */
function parseNode(vnode) {
  let nodeType = vnode._nodeType
  let _node = null
  if (nodeType === 1) {
    let nodeName = vnode._nodeName
    let attributes = vnode._attributes
    let childNodes = vnode.childNodes
    _node = document.createElement(nodeName)
    for(k in attributes) {
      _node.setAttribute(k, attributes[k])
    }
    childNodes.forEach(child => {
      _node.appendChild(parseNode(child))
    })
  } else if (nodeType === 3) {
    return document.createTextNode(vnode._nodeValue)
  }
  return _node
}
