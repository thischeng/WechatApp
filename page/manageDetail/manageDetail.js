// page/manageDetail/manageDetail.js
var api=require('../../request/testApi.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageData:null,
    detail:null,
    title:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options)
    console.log(1)
    this.setData({
      detail: options.key,
      title: options.title
    });
    var searchKey=that.data.detail
    wx.request({
      url: api.Shell+searchKey,
      method:'get',
      header: {
        'Authorization': 'JWT ' + app.globalData.token
      },
      data:{
        id: app.globalData.user_id
      },
      success:function(res){
          that.setData({
            pageData: res.data,
            length:res.data.length
          }),
          console.log(that.pageData)
      }
    })
  },
  toDetailPage: function (e) {
    var key = e.currentTarget.dataset.name; //该分类名字 [data-name]
    var title = e.currentTarget.dataset.title
    console.log(title)
    if(title=='书柜'){
      wx.navigateTo({
        url: '../list/list?detail=' + key
    })
    }
    else if(title =='作者'){
      wx.navigateTo({
        url: '../list/authorList?detail=' + key
      })
    }
    
  }
})