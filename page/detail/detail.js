var requests = require('../../request/testRequest.js');
var utils = require('../../utils/util.js');
var api = require('../../request/testApi.js')
const app=getApp()

Page({
  data: {
    loadidngHidden: false,
    bookData:null,
    searchKey:null,
  },
  onLoad: function (option) {
    console.log(option)
    console.log(1)
    this.setData({
     searchKey : option.id
    });
  },
  onReady: function () {
    var id = this.data.searchKey;
    var _this = this;
    var detail = app.globalData.detail
    console.log(2)
    console.log(id)
    console.log(_this.data.searchKey)

  //获取书本详细信息
    wx.request({
      url: api.Book_Detail + id,
      header:{
         'Authorization':'JWT '+app.globalData.token
      },
      method:'get',
      success(result) {
        wx.showToast({
          title: '请求成功',
          icon: 'success',
          mask: true,
          duration: 1000
        })
        _this.setData({
          bookData: result.data,
        })
        app.globalData.bookDetail= _this.data.bookData
        console.log(app.globalData.bookDetail)
      }
    });
       
  },

  toUpdatePage: function (e) {
    console.log(e.currentTarget.dataset)
    var id = e.currentTarget.dataset.id //图书id [data-id]
    var key = e.currentTarget.dataset.key // 图书内信息[data-key]
    var title = e.currentTarget.dataset.title
    console.log(id)
    wx.navigateTo({
      url: '../weuiupdatepage/updatepage?key=' + key +'&id='+ id+'&title='+title,
    });
  },

  toUpProcessPage:function(e){
    console.log(e.currentTarget.dataset)
    var id = e.currentTarget.dataset.id //图书id [data-id]
    var key = e.currentTarget.dataset.key // 图书内信息[data-key]
    var title = e.currentTarget.dataset.title
    console.log(id)
    wx.navigateTo({
      url: '../weuiupdatepage/processUpdatepage?key=' + key + '&id=' + id + '&title=' + title,
    });
  },

  onPullDownRefresh:function(){
    var id = this.data.searchKey;
    var _this = this;
    var detail = app.globalData.detail
    console.log(2)
    console.log(id)
    console.log(_this.data.searchKey)

    //获取书本详细信息
    wx.request({
      url: api.Book_Detail + id,
      header: {
        'Authorization': 'JWT ' + app.globalData.token
      },
      method: 'get',
      success(result) {
        wx.showToast({
          title: '请求成功',
          icon: 'success',
          mask: true,
          duration: 1000
        })
        _this.setData({
          bookData: result.data,
        })
        app.globalData.bookDetail = _this.data.bookData
        console.log(app.globalData.bookDetail)
      }
    })
  }
  
});