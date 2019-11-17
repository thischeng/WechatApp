const uploadurl = "http://127.0.0.1:8000/api/shell/"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:null,
    imageIndex:1,
    publishDateIndex:1,
    imageList: [],
    pageData:null,
    freshData:null,
    imageURL:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
    pageData:getApp().globalData.bookDetail,
      imageURL: getApp().globalData.bookDetail.image
  })
    console.log(getApp().globalData.bookDetail)
    console.log(1)
    console.log(this.data.pageData.image)
    this.getImage(this)
  },

  getImage(e) {
    var that = this
    const current = that.data.imageURL

    console.log('-----------------')
    console.log(current)
    console.log('this is loadimage')
    wx.downloadFile({
      url: current,
      success(res) {
        console.log('downloadFile success, res is', res)
        let list = []
        list.push(res.tempFilePath)
        that.setData({
          imageList: list
        })
      },
      fail({ errMsg }) {
        console.log('downloadFile fail, err is:', errMsg)
      }
    })
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
    /*this.setData({
      pageData:null,
    }),
    getApp().globalData.bookDetail=null*/
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    /*this.setData({
      pageData: null,
    }),
      getApp().globalData.bookDetail = null*/
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  setNull:function(e){

  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

        console.log('uploadImage success, res is:', res)

        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1000
        })

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          imageList: res.tempFilePaths,
          imageIndex:0
        }
        );
      }
    })
  }, 

  loadImage(e){
    var that=this
    const current = e.currentTarget.dataset.image
    console.log('-----------------')
    console.log(current)
    console.log('this is loadimage')
     wx.downloadFile({
      url: e.currentTarget.dataset.image,
      success(res) {
        console.log('downloadFile success, res is', res)
        let list=[]
        list.push(res.tempFilePath)
        that.setData({
          imageList: list
        })
      },
      fail({ errMsg }) {
        console.log('downloadFile fail, err is:', errMsg)
      }
    }),
    wx.previewImage({
      current,
      urls: that.data.imageList
    })
  },

  previewImage(e) {
    const current = e.target.dataset.src

    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },

  bindDateChange:function(e){
    this.setData({
      date: e.detail.value,
      publishDateIndex:0
    })
  },

  loadDate:function(e){
    this.setDate({
      date:e.currentTarget.dataset.date
    })
    console.log(e.currentTarget.dataset.date)
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e.detail.value)
    this.data.freshData = e.detail.value
    var imageURL = this.data.pageData.image
    console.log('freshData:')
    console.log(this.data.freshData)
    console.log(this.data.imageIndex)
    this.upImage();

  },

  formReset: function () {
    console.log('form发生了reset事件')
  },

upImage:function(e){
  var that=this
  wx.uploadFile({
    url: uploadurl,
    filePath: that.data.imageList[0],
    name: 'image',
    formData:that.data.freshData,
    success:function(res){
      console.log(that.data.imageList[0])
      if(res){
        wx.showToast({
          title:'ok',
          loading:1000
        });
      }
    }
  })
},

  upData:function(e){
    var that = this
    wx.uploadFile({
      url: uploadurl,
      filePath: that.data.imageList[0],
      name: 'image',
      formData: that.data.freshData,
      success: function (res) {
        console.log(that.data.imageList[0])
        if (res) {
          wx.showToast({
            title: 'ok',
            loading: 1000
          });
        }
      }
    })
  },


})