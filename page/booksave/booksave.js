var requests = require('../../request/testRequest.js');
var utils = require('../../utils/util.js');

//刷新动态球颜色
Page({
  data: {
    scrollHeight: 0, //scroll-view高度
    pageData: [], //图书数据
    searchKey: null //搜索关键字
  },

  //页面显示获取设备屏幕高度，以适配scroll-view组件高度
  onShow: function () {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          scrollHeight: res.windowHeight - (100 * res.windowWidth / 750) //80为顶部搜索框区域高度 rpx转px 屏幕宽度/750
        });
      }
    })
  },

  onLoad: function () {

    var _this = this;
    var q = this.data.searchKey;
    var start = this.data.pageIndex;

    console.log(start)
    wx.request({
      url: 'http://127.0.0.1:8000/api/shell/',
      success(result) {
        _this.setData({
          pageData: result.data,
        }),
          console.log(_this.pageData)
      }
    })
  },
  //搜索输入框输入取值
  searchInputEvent: function (e) {
    this.setData({ searchKey: e.detail.value });
  },

  //搜索按钮点击事件
  searchClickEvent: function (e) {
    if (!this.data.searchKey) {
      return;
    }
    this.setData({ pageIndex: 0, pageData: [] });
    requestData.call(this);
  },

  //下拉请求数据
  scrollLowerEvent: function (e) {
    if (this.data.loadingMore)
      return;
    requestData.call(this);
  },

  //跳转到详细页面
  toDetailPage: function (e) {
    var id = e.currentTarget.dataset.id; //图书id [data-id]
    console.log(id)
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  },
  slideButtonTap(e) {
    console.log('slide button tap', e.detail)
  }

});

/**
 * 请求图书信息
 */
function requestData() {
  var _this = this;
  var q = this.data.searchKey;
  var start = this.data.pageIndex;

  this.setData({ loadingMore: true, isInit: false });
  updateRefreshBall.call(this);
  console.log(start)
  wx.request({
    url: 'http://127.0.0.1:8000/api/shell/',
    data: {
      title: q
    },
    success(result) {
      wx.showToast({
        title: '请求成功',
        icon: 'success',
        mask: true,
        duration: 2000
      })
      _this.setData({
        pageData: result.data
      })
    }
  })
}
