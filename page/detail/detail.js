var requests = require('../../request/testRequest.js');
var utils = require('../../utils/util.js');


Page({
  data: {
    loadidngHidden: false,
    bookData:null,
    searchKey:null,
  },
  onLoad: function (option) {
    console.log(option)
    console.log(1)
    this.setData({
     searchKey : option.id
    });
  },
  onReady: function () {
    var id = this.data.searchKey;
    var _this = this;
    var detail = getApp().globalData.detail
    console.log(2)
    console.log(id)
    console.log(_this.data.searchKey)
    wx.request({
      url: 'http://127.0.0.1:8000/api/shell/'+ id,
      method:'get',
      success(result) {
        wx.showToast({
          title: '请求成功',
          icon: 'success',
          mask: true,
          duration: 1000
        })
        _this.setData({
          bookData: result.data,
        })
        getApp().globalData.bookDetail= _this.data.bookData
        console.log(getApp().globalData.bookDetail)
      }
    });
       
  },

  toUpdatePage: function (e) {
    console.log(e.currentTarget.dataset)
    var id = e.currentTarget.dataset.id //图书id [data-id]
    var key = e.currentTarget.dataset.key // 图书内信息[data-key]
    var title = e.currentTarget.dataset.title
    console.log(id)
    wx.navigateTo({
      url: '../weuiupdatepage/updatepage?key=' + key +'&id='+ id+'&title='+title,
    });
  }
  
});