var api = require('../../request/testApi.js');
const app = getApp()

Page({
  data: {
    scrollHeight: 0, //scroll-view高度
    pageData: [], //图书数据
    searchKey: null, //搜索关键字
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
    console.log('this is globaldata in thi spage:')
    console.log(app.globalData.token)
    console.log(app.globalData.user_id)
    console.log('---------')
    /*wx.getStorageInfo({
      success: function(res) {
        console.log(res.keys)
        console.log('--------分割线1')
        console.log(res.keys[1])
      },
    })*/
    console.log('---------分割线')
    wx.getStorage({
      key: 'jwt_token',
      success: function (res) {
        //获取该账户下所拥有图书 
        wx.request({
          url: api.Get_allBook,
          header:{
            'Authorization':'JWT '+res.data
          },
          data: {
            id: app.globalData.user_id
          },
          success(result) {
            _this.setData({
              pageData: result.data,
            }),
              console.log(_this.pageData)
          }
        })
      },
    })
  },

  onPullDownRefresh: function(){
    var _this = this;
    console.log('this is globaldata in thi spage:')
    console.log(app.globalData.token)
    console.log(app.globalData.user_id)
    console.log('---------')
    /*wx.getStorageInfo({
      success: function(res) {
        console.log(res.keys)
        console.log('--------分割线1')
        console.log(res.keys[1])
      },
    })*/
    console.log('---------分割线')
    wx.getStorage({
      key: 'jwt_token',
      success: function (res) {
        //获取该账户下所拥有图书 
        wx.request({
          url: api.Get_allBook,
          header: {
            'Authorization': 'JWT ' + res.data
          },
          data: {
            id: app.globalData.user_id
          },
          success(result) {
            _this.setData({
              pageData: result.data,
            }),
              console.log(_this.pageData)
          }
        })
      },
    })
  },

  //跳转到详细页面
  toDetailPage: function (e) {
    var id = e.currentTarget.dataset.id; //图书id [data-id]
    console.log(id)
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  },
})
