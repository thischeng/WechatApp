var api = require('../../request/testApi.js')

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  name: "manage",
  data: {
    
    count:null,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    var that = this;
    wx.request({
      url: api.Count_Book,
      header: {
        'Authorization': 'JWT ' + app.globalData.token
      },
      data:{
        id:app.globalData.user_id
      },
        success(result) {
            that.setData({
              count: result.data
            }),
            console.log(that.count)
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    var that = this;
    wx.request({
      url: api.Count_Book,
      header: {
        'Authorization': 'JWT ' + app.globalData.token
      },
      data: {
        id: app.globalData.user_id
      },
      success(result) {
        that.setData({
          count: result.data
        }),
          console.log(that.count)
      }
    })
  },


  //以下为自定义点击事件
  toManage:function(e){
    console.log(e.currentTarget.dataset)
    var key = e.currentTarget.dataset.key // 图书内信息[data-key]
    var title = e.currentTarget.dataset.title
    if (title == '书柜') {
    wx.navigateTo({
      url: '../manageDetail/manageDetail?key=' + key +'&title=' + title,
     })
    }
    else if (title == '作者'){
      wx.navigateTo({
      url: '../manageDetail/authorManageDetail?key=' + key + '&title=' + title,
    })
    }
  }
})

