

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
        url: 'http://127.0.0.1:8000/api/shell/countBook',
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
    
  },


  //以下为自定义点击事件
  toManage:function(e){
    console.log(e.currentTarget.dataset)
    var key = e.currentTarget.dataset.key // 图书内信息[data-key]
    var title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '../manageDetail/manageDetail?key=' + key +'&title=' + title,
    });
  }
})

