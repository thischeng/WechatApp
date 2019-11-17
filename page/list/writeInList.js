// page/list/list.js
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
        url: 'http://127.0.0.1:8000/api/book/searchBook/',
        data: {
          title: that.data.searchKey
        },
        success(result) {
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
    var title = e.currentTarget.dataset.title; //title [data-title]
    console.log(title)
    wx.navigateTo({
      url: '../weuiSavepage/weuisavepage1?detail=' + title
    });
  }
})