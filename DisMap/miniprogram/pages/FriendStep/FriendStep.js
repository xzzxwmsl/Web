// pages/chooseLib/chooseLib.js
const app = getApp()
const db = wx.cloud.database()
var time = require('../../utils/utils.js')
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
    console.log('接收到：' + options.openid)
    var openid = options.openid
    var that = this
    var list = []

    db.collection("Step").where({
      _openid: openid
    }).get({
      success(res) {
        console.log(res.data[0])
        var long = res.data[0].StepList.length
        var steplist = res.data[0].StepList
        var timelist = res.data[0].TimeList
        var name = res.data[0].UserInfo.nickName
        var avatarUrl = res.data[0].UserInfo.avatarUrl
        console.log(name)
        for (var i = long - 1; i >= 0; i--) {
          var k = {}
          k['rank'] = time.formatTimeTwo(timelist[i], 'M/D')
          k['txtStyle'] = ''
          k['icon'] = avatarUrl
          k['name'] = name
          k['pace'] = steplist[i]
          list.push(k)
        }
        console.log(list)
        that.setData({
          list: list
        })
        // for (var j = res.data[0].StepList.length - 1; j >= 0; j--) {


        //     console.log(list)
        //     that.setData({
        //       list:list
        //     })
        // }
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