// import "../css/toolbar.css";
// import Main from "../img/toolbar/Main.png";
/**
 * UI界面类
 */
export class UI {
  constructor() {
    this.power = true;
  }
  /**
   * 初始化工具栏
   * @param {*} domElement 
   */
  init (domElement, opt) {
    let count = opt.length;
    this.toolbar = this.createToolbar(domElement, count, 50);
    opt.forEach(element => {
      this.addItemDiv(this.toolbar, element.title, element.url, element.callback);
    });
    this._updataPosition(domElement, this.toolbar);
    //监听窗口变化
    window.addEventListener('resize', () => {
      this._updataPosition(domElement, this.toolbar);
    })

  }
  /**
   * 创建工具栏
   * @param {*} domElement 
   * @returns 
   */
  createToolbar (domElement, count, unit) {
    let div = document.createElement('div');
    div.id = 'toolbar';
    // div.style.width=count*unit+'px';
    domElement.append(div);
    return div;
  }
  /**
   * 创建子项
   * @param {*} domElement 
   * @param {*} name 
   * @param {*} img 
   * @param {*} fn 
   * @returns 
   */
  addItemDiv (domElement, name, img, fn) {
    let div = document.createElement('div');
    div.className = 'toolbar-button';
    div.title = name;
    //图片名字不能带有空格
    div.style.backgroundImage = img;//../static/img/ui/zhushijiao in@2x.png)'url(../static/img/ui/zhushijiao.png)'
    div.onclick = function () {
      fn();
    }
    domElement.append(div);
    return div;
  }
  /**
   * 工具栏是否显示
   */
  hideOrShow () {
    if (this.power) {
      this.toolbar.style.display = 'none';
    } else {
      this.toolbar.style.display = '';
    }
  }
  createDiv () {
    let div = document.createElement('div');

  }
  /**
   * 更新工具栏位置
   * @param {*} parent 
   * @param {*} child 
   */
  _updataPosition (parent, child) {
    let getBoundingClientRect = parent.getBoundingClientRect();
    let width = parent.clientWidth;
    let height = parent.clientHeight;
    // let left = width * 0.5 + getBoundingClientRect.left - parseFloat(this._getStyle(child, 'width')) * 0.5 - child.children.length * 6;
    // let top = height - parseFloat(this._getStyle(child, 'height')) - height / 20;
    // child.style.left = left + 'px';
    // child.style.top = top + 'px';
  }
  /**
   * 获取页面元素的外部样式属性
   * @param {*} dom domElement
   * @param {*} attr 属性名称
   * @returns 
   */
  _getStyle (dom, attr) {
    if (dom.currentStyle) {    //兼容IE
      return dom.currentStyle[attr];
    } else {    //兼容火狐谷歌
      return window.getComputedStyle(dom, false)[attr];
    }
  }


}