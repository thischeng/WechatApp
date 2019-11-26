var requests = require('../../request/testRequest.js');
var utils = require('../../utils/util.js');
var Base64 = require("../../utils/base64.js");
var api=require('../../request/testApi.js');

const app=getApp()

Page({
  data: {
    scrollHeight: 0, //scroll-view高度
    pageIndex: 0, //页码
    totalRecord: 0, //图书总数
    isInit: true, //是否第一次进入应用
    pageData: [], //图书数据
    searchKey: null, //搜索关键字
    isInit:true,
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

onLoad:function(){
  },

onHide:function(){
  this.setData({
    isInit:true,
    pageData:null
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
      this.setData({
        isInit:true
      })
    }
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
  console.log('------------------')
  var login = 'dXNlcjE6YXNkZXdxMTIz'
  this.setData({ loadingMore: true, isInit: false });
  wx.request({
      url: api.Search_Book,
      method:'get',
      header:{
        'Authorization': 'JWT '+app.globalData.token
      },
      data:{
        title:q,
        id:app.globalData.user_id
      },
      success(result){
          wx.showToast({
            title: '请求成功',
            icon: 'success',
            mask: true,
            duration:1000
          })
          _this.setData({
            pageData : result.data,
            isinit:false
          })
          }
  })
}
