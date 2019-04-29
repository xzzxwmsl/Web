//app.js
let wechat = require('./utils/wechat.js');
//app.js
wx.cloud.init();
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    //this.globalData = {}
    var that = this
    //获得登录信息
    wx.getSetting({

      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              that.globalData.UserInfo = res.userInfo
              console.log(that.globalData.UserInfo)
            }
          })
        }
      }
    }),


      // 调用云函数
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid)
          that.globalData.openid = res.result.openid
          console.log('[云函数] [login] user openid: ', that.globalData.openid)
        },
        fail: err => {
          wx.showToast({
            title: '调用数据失败，请重启',
            icon: 'fail',
            duration: 2000
          })
        }
      })

    wx.getWeRunData({
      success(res) {
        //const encryptedData = res.encryptedData
        that.globalData.RunencryptedData = res.encryptedData
        that.globalData.Runiv = res.iv
        wx.showToast({
          title: '成功更新数据',
          icon: 'success',
          duration: 2000
        })
      }
    })

  },
  onShow: function () {
    var that = this


  },

  globalData: {
    shareTicket: '',
    openGid: '',
    RunencryptedData: '',
    Runiv: '',
    UserInfo: null,
    openid: ''
  },
})

