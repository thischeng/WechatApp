var api = require('../../request/testApi.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    detail: null,
    title: null,
    freshData: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(1)
    this.setData({
      id: options.id,
      detail: options.key,
      title: options.title
    });
    console.log(this.data.id)
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
    var bkey = e.currentTarget.dataset.key
    console.log("这是bkey：")
    console.log(bkey)
    if(bkey=='processing'){
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e.detail.value.msg)
    var that = this
    var ID = that.data.id
    var Title = that.data.title
    console.log(Title)
    var message = e.detail.value.msg
    this.data.freshData = e.detail.value
    console.log('token:' + app.globalData.token)
    wx.request({
      url: api.Refresh_BookInfo + ID + '/',
      method: 'put',
      header: {
        'content-type': 'multipart/form-data;boundary=--------------------------123456',
        'Authorization': 'JWT ' + app.globalData.token
      },
      data: '\r\n----------------------------123456' +
        '\r\nContent-Disposition: form-data; name="' + Title +
        '"' +
        '\r\n\r\n' + message +
        '\r\n----------------------------123456' +
        '\r\nContent-Disposition: form-data; name="owner"' +
        '\r\n\r\n' + app.globalData.user_id,
      success: function (res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '更新成功',
            icon: 'success',
            mask: true,
            duration: 1000
          })
        }
        console.log('------------')
        console.log(res)
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '更新失败',
          showCancel: false
        })
      }
    })
  }
  else if(bkey==processed){
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      var that = this
      var ID = that.data.id
      var Title = isfinish
      console.log(Title)
      var message = 1
      //this.data.freshData = e.detail.value
      console.log('token:' + app.globalData.token)
      wx.request({
        url: api.Refresh_BookInfo + ID + '/',
        method: 'put',
        header: {
          'content-type': 'multipart/form-data;boundary=--------------------------123456',
          'Authorization': 'JWT ' + app.globalData.token
        },
        data: '\r\n----------------------------123456' +
          '\r\nContent-Disposition: form-data; name="' + Title +
          '"' +
          '\r\n\r\n' + message +
          '\r\n----------------------------123456' +
          '\r\nContent-Disposition: form-data; name="owner"' +
          '\r\n\r\n' + app.globalData.user_id,
        success: function (res) {
          if (res.statusCode == 200) {
            wx.showToast({
              title: '更新成功',
              icon: 'success',
              mask: true,
              duration: 1000
            })
          }
          console.log('------------')
          console.log(res)
        },
        fail: function (res) {
          wx.showModal({
            title: '提示',
            content: '更新失败',
            showCancel: false
          })
        }
      })
  }
  }


})