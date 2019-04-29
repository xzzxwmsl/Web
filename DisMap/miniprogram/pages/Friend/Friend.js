var QRCode = require('../../utils/weapp-qrcode.js')
var qrcode;
var app = getApp()
const db = wx.cloud.database()
const _ = db.command

Page({
  data: {
    showPic: false,
    image: ''
  },
  onLoad: function (options) {
    if (app.globalData.openid == null) {
      wx.showToast({
        title: '失败，请重启',
        icon: 'fail',
        duration: 2000
      })
    }

    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: app.globalData.openid,
      // image:'/images/bg.jpg',
      width: 150,
      height: 150,
      colorDark: "#1CA4FC",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  confirmHandler: function (e) {
    var value = e.detail.value
    qrcode.makeCode(value)
  },
  tapHandler: function () {
    this.setData({
      showPic: true
    })
  },
  addFriend: function () {
    wx.scanCode({
      success(res) {
        var friend = res.result

        ////////////
        db.collection('Friend').where({
          _openid: app.globalData.openid // 填入当前用户 openid
        }).get({
          success(res) {
            console.log(res.data.length)
            if (res.data.length == 0) {
              console.log("no data,first visit")
              db.collection('Friend').add({
                data: {
                  friend: [friend]
                },
                success(res1) {
                  console.log(res1 + "scuuess add")
                },
                fail: console.error
              })
            } else {
              var _id = res.data[0]._id
              console.log("Update")
              console.log(_id)
              console.log(friend)
              // db.collection('Step').doc(_id).update({
              //   data: {
              //     UserInfo: app.globalData.UserInfo,
              //     TimeList: timestamp,
              //     StepList: step
              //   },
              //   success(res) {
              //     console.log("Update")
              //     console.log(res)
              //   },
              //   fail(res) {
              //     console.log(res)
              //   }
              // })
              db.collection('Friend').doc(_id).get({
                success(re) {
                  console.log(friend + re.data.friend.indexOf(friend))
                  if (re.data.friend.indexOf(friend) == -1) {
                    //there are no such people
                    console.log('AFQ')
                    db.collection('Friend').doc(_id).update({
                      data: {
                        friend: _.push(friend)
                      }, success(res) {
                        wx.showToast({
                          title: '成功添加',
                          icon: 'success',
                          duration: 3000
                        })
                      }
                    })
                  } else {
                    wx.showToast({
                      title: '该用户已经是您的好友',
                      icon: 'success',
                      duration: 2000
                    })
                  }


                },
                fail(re) {
                  console.log("ADD FAIL")
                }
              })
            }
          }
        })

        //////////



      }
    })
  },
  // 长按保存
  save: function () {
    console.log('save')
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          qrcode.exportImage(function (path) {
            wx.saveImageToPhotosAlbum({
              filePath: path,
            })
          })
        }
      }
    })
  }
})