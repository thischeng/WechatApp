// page/list/list.js
var api=require('../../request/testApi.js')

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
      wx.request({
        url: api.BookInAuthor,
        header: {
          'Authorization': 'JWT ' + app.globalData.token
        },
        data: {
          author: that.data.searchKey,
          id: app.globalData.user_id
        },
        success(result) {
          wx.showToast({
            title: '请求成功',
            icon: 'success',
            mask: true,
            duration: 1000
          })
          that.setData({
            pageData: result.data
          })
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
    var id = e.currentTarget.dataset.id; //id [data-id]
    console.log(id)
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  }
})