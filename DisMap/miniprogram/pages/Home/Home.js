var app = getApp()
const db = wx.cloud.database()
var t=0
Page({
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
  },
  data: {
    avatarUrl: null,
    user: '../../images/user.png',
    login:false
  },
  aaa: function () {
    console.log("OKL")

    wx.getUserInfo({
      success: res => {
        app.globalData.UserInfo = res.userInfo
        var _this = this
        console.log(app.globalData.UserInfo + "XXXXXXXXXXXXXX")
        if(t % 2 == 0 ){
          _this.setData({
            login:true,
            avatarUrl: res.userInfo.avatarUrl
          })
          t++
        }else{
          _this.setData({
            login: false,
            avatarUrl: null
          })
          t++
        }
      }
    })

    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(latitude)

        db.collection('Location').where({
          _openid: app.globalData.openid // 填入当前用户 openid
        }).get({
          success(res) {
            console.log(res)
            console.log(res.data.length)
            if (res.data.length == 0) {
              console.log("231")
              db.collection('Location').add({
                data: {
                  latitude: latitude,
                  longitude: longitude,
                  speed: speed,
                  accuracy: accuracy
                },
                success(res1) {
                  console.log(res1)
                },
                fail: console.error
              })
            } else {
              var _id = res.data[0]._id
              console.log("Update")
              console.log(_id)
              db.collection('Location').doc(_id).update({
                data: {
                  latitude: latitude,
                  longitude: longitude,
                  speed: speed,
                  accuracy: accuracy
                },
                success(res) {
                  console.log("Update")
                  console.log(res)
                },
                fail(res) {
                  console.log(res)
                }
              })
            }
          }
        })


      }
    })

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


  }
})