// pages/deployFunctions/deployFunctions.js

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
            title: '刷新重进',
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
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    timeList: [],
    stepList: [],
    delBtnWidth: 180
  },
  onShow: function () {
    var that = this
    console.log(app.globalData.userInfo)
    wx.login({
      success: function (res) {
        //获取code
        console.log('code-->' + res.code)

        //调用云函数，破解opengid
        wx.cloud.callFunction({
          name: 'opengid',
          data: {
            openid: app.globalData.openid,
            js_code: res.code,
            appId: 'wxcd07a929621b4327',//自己的appid
            encryptedData: app.globalData.RunencryptedData,
            iv: app.globalData.Runiv
          },
          success: function (res) {
            console.log('获得的所有数据res  ' + JSON.stringify(res));
            console.log('打印某一天的数据  ' + res.result.stepInfoList[0].step)//打印某一天的步数
            console.log(time.formatTimeTwo(res.result.stepInfoList[0].timestamp, 'Y/M/D h:m:s'));
            console.log((res.result.stepInfoList.length))
            var timestamp = []
            var step = []
            for (var i = 0; i < res.result.stepInfoList.length; i++) {
              timestamp.push(res.result.stepInfoList[i].timestamp)
              step.push(res.result.stepInfoList[i].step)
            }
            //Get StepInfo
            that.setData({
              timeList: timestamp,
              stepList: step
            })

            wx.showToast({
              title: '获取步数成功！',
              icon: 'success',
              duration: 2000
            })

            var list = []

            for (var i = res.result.stepInfoList.length - 1; i >= 0; i--) {
              var k = {}
              k['rank'] = time.formatTimeTwo(timestamp[i], 'M/D')
              k['txtStyle'] = ''
              k['icon'] = app.globalData.UserInfo.avatarUrl
              k['name'] = app.globalData.UserInfo.nickName
              k['pace'] = step[i]
              list.push(k)
            }

            that.setData({
              list: list
            })

            //DataBase
            db.collection('Step').where({
              _openid: app.globalData.openid // 填入当前用户 openid
            }).get({
              success(res) {
                console.log(res.data.length)
                if (res.data.length == 0) {
                  console.log("231")
                  db.collection('Step').add({
                    data: {
                      UserInfo: app.globalData.UserInfo,
                      TimeList: timestamp,
                      StepList: step
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
                  db.collection('Step').doc(_id).update({
                    data: {
                      UserInfo: app.globalData.UserInfo,
                      TimeList: timestamp,
                      StepList: step
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

          },
          fail: function (err) {
            console.log('getShareTiket---err' + JSON.stringify(err))
            wx.showToast({
              title: '刷新重进',
              icon: 'fail',
              duration: 2000
            })
          }
        })
      }
    })

  }
})