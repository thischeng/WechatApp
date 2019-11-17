const putShellUrl='http://127.0.0.1:8000/api/shell/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    detail:null,
    title:null,
    freshData:null,
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
      title:options.title
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
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e.detail.value)
    console.log(e.detail.value.msg)
    var that = this
    var ID = that.data.id
    var Title = that.data.title
    var message=e.detail.value.msg
    this.data.freshData = e.detail.value
    
    wx.request({
      url:putShellUrl+ID+'/',
      data: '\r\n--------------------------123456789' +
        '\r\nContent-Disposition: form-data; name="'+Title+
        '"\r\n' +
        '\r\n\r\n' + message,
      method:'put',
      header:{
        'content-type':'multipart/form-data;boundary=--------------------------123456789'
      },
      success:function(res){
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          mask: true,
          duration: 1000
        })
        console.log('------------')
        console.log(res)
      },
      fail:function(res){
        wx.showModal({
          title: '提示',
          content: '更新失败',
          showCancel: false
        })
      }
    })
  }


  
})