// page/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey:null,
    pageData:null,
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
      url: 'http://127.0.0.1:8000/api/shell/bookInShell/',
      data:{
        info:that.data.searchKey
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
    var id = e.currentTarget.dataset.id; //图书id [data-id]
    console.log(id)
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  }
})