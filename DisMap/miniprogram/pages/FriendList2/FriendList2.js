// pages/new/new.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var list = []
    var that = this
    db.collection("Friend").where({
      _openid: app.globalData.openid
    }).get({
      success(res) {
        //Collect Friend info
        var friNum = res.data[0].friend.length
        console.log(friNum)
        for (var i = 0; i < friNum; i++) {

          !function (j) { // 注意这里
            var friid = res.data[0].friend[j]
            db.collection("Step").where({
              _openid: friid
            }).get({
              success(re) {
                var k = {}
                k['openid'] = friid
                k['rank'] = "*"
                k['txtStyle'] = ''
                k['icon'] = re.data[0].UserInfo.avatarUrl
                k['name'] = re.data[0].UserInfo.nickName
                k['pace'] = 88
                list.push(k)
                that.setData({
                  list: list
                })
              }
            })

          }(i);
        }

      }
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})