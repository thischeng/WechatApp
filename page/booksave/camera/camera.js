const searchUrl = "http://127.0.0.1:8000/api/book/forIsbn/"
const saveUrl = "http://127.0.0.1:8000/api/shell/"


Page({
  onShareAppMessage() {
    return {
      title: 'camera',
      path: 'page/component/pages/camera-scan-code/camera-scan-code'
    }
  },

  data: {
    result: {},
    loading: 1,
    saving:0,
    pageData:null,
  },
  onReady() {
    wx.showModal({
      title: '提示',
      content: '将摄像头对准一维码即可扫描',
      showCancel: false
    })
  },
  scanCode(e) {
    console.log('scanCode:', e)
    this.setData({
      result: e.detail,
    })
    var data=this.data.result
    if(data.type=="barcode"){
      this.data.loading=1
    }
    else
    {
      wx.showToast({
        title: '不是isbn',
        duration:1000
      })
    }
  },
  navigateBack() {
    wx.navigateBack()
  },
  error(e) {
    console.log(e.detail)
  },

  searchLibrary:function(e){
    var that=this
    var s = that.data.result.result
    if(that.data.loading){
      wx.request({
        url:searchUrl,
        method:'get',
        data:{
          isbn:s
        },
        success(res) {
          wx.showToast({
            title: '查询成功',
            icon: 'success',
            mask: true,
            duration: 1000
          }),
          that.setData({
            pageData: res.data,
            saving:1
          })
          var data = that.data.pageData
          getApp().globalData.bookDetail = data
          console.log(getApp().globalData.bookDetail)
        }
      })
        
    }
    else{
      wx.showModal({
        title: '提示',
        content: '请将摄像头扫描Isbn书码',
        showCancel: false
      })
    }
  },

  saveBook:function(){
  if(this.data.saving==1){
    wx.navigateTo({
      url: '../../weuiSavepage/weuisavepage',
    })
  }
  else{
    wx.showModal({
      title: '提示',
      content: '请将摄像头扫描Isbn书码',
      showCancel: false
    })
  }
  }


})
