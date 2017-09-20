//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    menu: [
    ['二居室', '三居室', '别墅', '店铺', '写字楼', '其他'],
    ['准备', '拆改', '水电', '泥木', '油漆', '竣工', '软装'],
    ['现代', '简约', '中式', '欧式', '田园', '地中海']
    ]
  },
  onLoad: function() {
    this.initMenu();
    this.initHighlight();
  },
  list: function(e) {
    var index = e.currentTarget.dataset.nav;
    var open = this.data.open;
    var isMasked = this.data.isMasked;
    var show = this.data.show;
    var naviIndex = this.data.naviIndex;
    for (var i = 0; i < this.data.menu.length; i++) {
      // 除当前元素外，其他元素一律取false
      if (i != index) {
        open[i] = false;
      }
      show[i] = false;
    }
    if (open[index] == true) {
      // 当前元素取反
      open[index] = false;
      isMasked = false;
      naviIndex = -1;
    } else {
      open[index] = true;
      isMasked = true;
      naviIndex = index
    }
    show[index] = true;
    this.setData({
      open: open,
      isMasked: isMasked,
      show: show,
      naviIndex: naviIndex
    });
  },
  hideBackground: function(e) {
    this.initMenu();
  },
  initMenu: function () {
    var open = this.data.menu.map(() => {
      return false;
    });
    var show = this.data.menu.map(() => {
      return false;
    });
    this.setData({
      open: open,
      show: show,
      isMasked: false,
      naviIndex: -1
    })
  },
  initHighlight : function () {
    // 二级菜单选中高亮
    var highlight = this.data.menu.map((item) => {
      return item.map(sub => {
        return '';
      });
    });
    this.setData({
      highlight: highlight
    });
  },
  subMenuTapped: function (e) {
    // 子菜单点击
    var naviIndex = e.currentTarget.dataset.naviIndex;
    var rowIndex = e.currentTarget.dataset.rowIndex;
    console.log(naviIndex, rowIndex)
    wx.showToast({
      title: '点中了 ' + naviIndex + '列' + rowIndex + '行'
    });
    // 获取原高亮状态
    var highlight = this.data.highlight;
    // 消除兄弟亮亮
    highlight[naviIndex] = highlight[naviIndex].map(item => {
      return '';
    });
    // 设定当前高亮状态
    highlight[naviIndex][rowIndex] = 'highlight';
    // 存回高亮数组
    this.setData({
      highlight: highlight
    });
    console.log(this.data.highlight);
    // 隐藏子菜单
    this.initMenu();
  }
})
