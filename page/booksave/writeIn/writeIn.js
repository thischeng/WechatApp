var api = require('../../../request/testApi.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    freshData: null,
    data1: null,
    info:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e.detail.value)
    console.log(e.detail.value.msg)
    var that = this
    var message = e.detail.value.msg
    this.data.info = e.detail.value.msg
    this.data.freshData = e.detail.value

    //搜索在架图书
    wx.request({
      url: api.Search_Shell,
      method: 'get',
      header: {
        'Authorization': 'JWT ' + app.globalData.token
      },
      data:{
        title:message,
        id: app.globalData.user_id
      },
      success: function (res) {
        console.log(res)
        if(res.data.length!=0){
          wx.showModal({
            title: '提示',
            content: '图书已收藏',
            showCancel: false
          })
        }
        else{
        console.log('------------')
        that.getShellBook(that)
        console.log('------------')
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '搜索失败',
          showCancel: false
        })
      }
    })
  },

  getShellBook:function(e){
    var msg = this.data.info
    console.log(msg)
    wx.request({
      url: api.Search_Library,
      header: {
        'Authorization': 'JWT ' + app.globalData.token
      },
      data: {
        title: msg,
      },
      success:function(res){
        wx.showToast({
          title: '搜索成功',
          icon: 'success',
          mask: true,
          duration: 1000
        })
        console.log('this is getshellbook')
        wx.navigateTo({
          url: '../../list/writeInList?detail='+msg,
        })
      },
      error:function(res){
        wx.showToast({
          title: '书库中无此书',
          icon: 'success',
          mask: true,
          duration: 1000
        })
      }
    })
  }

})