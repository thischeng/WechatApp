var api = require('../../request/testApi.js');

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "homepage",
  /**
   * 页面的初始数据
   */

  data: {
    hasLogin:false, //判断是否在小程序中登录
    isLogin:false, //判断是否在后端登录
    hasUserInfo : false, //判断是否获得用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(option) {
    var that = this
    wx.getStorage({
      key: 'jwt_token',
      success: function (res) {

        var token = res.data
        app.globalData.token = res.data
        console.log("----------------------------1")
        console.log(app.globalData.token)
        console.log('---------------2')
        wx.request({
          url: api.Refresh_Token,
          method: 'POST',
          header: {
            'content-type': 'multipart/form-data;boundary=--------------------------123456'
          },
          data: '\r\n\r\n----------------------------123456' +
            '\r\nContent-Disposition: form-data; name="token' +
            '"\r\n' +
            '\r\n' + token + '\r\n----------------------------123456--',
          success(key) {
            console.log(key)
            if (key.statusCode == 400) {
              that.setData({
                isLogin: false,
              })
            }
            else if (key.data.token) {
              wx.setStorageSync('jwt_token', key.data.token)
              that.setData({
                isLogin: true,
              })
            }
          }
        })
        wx.getStorage({
          key: 'user_id',
          success: function (back) {
            console.log(back.data)
            app.globalData.user_id = back.data
            console.log(app.globalData.user_id)
          }
        })
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
  login(info) {
    const that = this
    const userInfo = info.detail.userInfo  //获取用户信息
    console.log(info)
    console.log(userInfo)
    app.globalData.userInfo = userInfo //把用户信息设置到全局变量中
    console.log(app.globalData.userInfo)
    console.log('-------------')
    that.setData({
      hasUserInfo: true
    })
    //微信登录
    wx.login({
      success(res) {
        console.log(res)
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true
        }),
        wx.request({
          url: api.Get_Token,
          method:'POST',
          data:{
            jscode:res.code,
            nickname: app.globalData.userInfo.nickName,
          },
          success(res){
            console.log(res)
            wx.setStorageSync('jwt_token', res.data.token)
            wx.setStorageSync('user_id',res.data.user_id)
            app.globalData.user_id = res.data.user_id
            console.log("-------this is globalid:")
            console.log(app.globalData.user_id)
            that.setData({
              isLogin:true, //已在后端登录
              hasUserInfo:true
            })
            app.globalData.isLogin=true
          }
            })
          }
        })
      },

  logout: function (res) {
    this.setData({
      isLogin: false,
      hasUserInfo: false
    })
    app.globalData.isLogin = false
    wx.removeStorageSync('jwt_token')
    wx.removeStorageSync('user_id')
  }


})

