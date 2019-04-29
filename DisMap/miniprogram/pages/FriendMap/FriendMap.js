// miniprogram/pages/FriendMap/FriendMap.js
const app = getApp()
const db = wx.cloud.database()
var time = require('../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:1,
    longitude:1,
    markers:null,
    textData: {name:'null'}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('接收到：' + options.openid)
    var openid = options.openid
    var name = options.name
    var that = this
    var list = []

    db.collection("Location").where({
      _openid: openid
    }).get({
      success(res) {
        console.log(res)
        console.log(res.data.length+"SSS")
        if(res.data.length == 0){
          wx.showToast({
            title: '无信息',
            icon: 'fail',
            duration: 2000
          })
        }else{
          console.log(res.data[0])
          var latitude = res.data[0].latitude
          var longitude = res.data[0].longitude
          console.log("XX")
          db.collection("Step").where({
            _openid: openid
          }).get({
            success(re) {
              var icon = re.data[0].UserInfo.avatarUrl
              console.log(icon)
              var marker = { latitude: latitude, longitude: longitude }
              var markers = []
              markers.push(marker)
              console.log(markers)
              var _this = that
              _this.setData({
                latitude: latitude,
                longitude: longitude,
                markers: markers,
                textData: { name: name}
              })
            }
          })
          
        }
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