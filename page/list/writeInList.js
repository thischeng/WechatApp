// page/list/list.js
var api = require('../../request/testApi.js')
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey: null,
    pageData: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option)
    this.setData({
      searchKey: option.detail
    });
  },

  /**
     * 生命周期函数--监听页面初次渲染完成
     */
  onReady: function () {
    var that = this;
    var data =
      wx.request({
        url: api.Search_Library,
        header: {
          'Authorization': 'JWT ' + app.globalData.token
        },
        method:'GET',
        data: {
          title: that.data.searchKey,
        },
        success(result) {
          that.setData({
            pageData: result.data
          })
          app.globalData.bookDetail = that.data.pageData
          console.log(app.globalData.bookDetail)
        }
      })
  },
  onShow: function () {
    wx.setStorage({
      key: 'detail',
      data: this.data.pageData,
    })
  },

  toDetailPage: function (e) {
    var isbn = e.currentTarget.dataset.isbn; //title [data-isbn]
    console.log(isbn)
    wx.navigateTo({
      url: '../weuiSavepage/weuisavepage1?detail='+isbn,
    })
    /*wx.navigateTo({
      url: '../weuiSavepage/weuisavepage1?detail=' + title
    });*/
  }
})