/** 
 * 生成虚拟dom-构造函数
 */ 
function VNode(nodeName, nodeValue, nodeType, attributes) {
  this._nodeName = nodeName && nodeName.toLowerCase()
  this._nodeValue = nodeValue
  this._nodeType = nodeType
  this._attributes = attributes
  this.childNodes = []
}
VNode.prototype.appendChild = function (vnode) {
  this.childNodes.push(vnode)
}