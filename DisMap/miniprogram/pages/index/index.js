const app = getApp()
const db = wx.cloud.database()
var time = require('../../utils/utils.js')
Page({
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    //获得登录信息



    wx.getSetting({

      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.UserInfo = res.userInfo
              console.log(app.globalData.UserInfo)
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
          app.globalData.openid = res.result.openid
          console.log('[云函数] [login] user openid: ', app.globalData.openid)
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
        app.globalData.RunencryptedData = res.encryptedData
        app.globalData.Runiv = res.iv
        wx.showToast({
          title: '成功更新数据',
          icon: 'success',
          duration: 2000
        })
      }
    })


    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
    },
    onShow:function(){
      
    },
  navitoMap: function (e) {
    wx.navigateTo({
      url: '../xx/xx'
    })
  },

  
  navitoNear: function (e) {
    console.log("FUCK")
    wx.navigateTo({
      url: '../xx2/xx2'
    })

  }



})