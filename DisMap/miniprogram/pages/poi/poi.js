//index.js
//获取应用实例
let app = getApp();
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");
let markersData = [];
Page({

  data: {
    lonlat: "",
    city: "",
    tips: []
  },
  onLoad(e) {
    let { lonlat, city } = e;
    this.setData({
      lonlat, city
    })
  },
  bindInput() {
    let { latitude, longitude, city } = this.data;
    let url = `/pages/inputtip2/inputtip2?city=${city}&lonlat=${longitude},${latitude}`;
    wx.redirectTo({ url });
  },
 touchfood:function(e){
   
     console.log(e);
   let { lonlat, city } = this.data;

     let keyword="餐厅"
     let pages = getCurrentPages();
     let prevPage = pages[pages.length - 2];  //上一个页面
     // console.log(pages);
     if (keyword) {
       prevPage.setData({ keyword });
       amap.getPoiAround(keyword)
         .then(d => {
           // console.log(d);
           let { markers } = d;
           markers.forEach(item => {
             item.iconPath = "/images/marker.png";
           })
           prevPage.setData({ markers });
           prevPage.showMarkerInfo(markers[0]);
           prevPage.changeMarkerColor(0);
         })
         .catch(e => {
           console.log(e);
         })
     }
     let preurl = "/pages/xx2/xx2";
     wx.navigateBack({
       url: preurl
     })
   
 },
 touchhotel:function(e)
 {
   console.log(e);
   let { lonlat, city } = this.data;

   let keyword = "酒店"
   let pages = getCurrentPages();
   let prevPage = pages[pages.length - 2];  //上一个页面
   // console.log(pages);
   if (keyword) {
     prevPage.setData({ keyword });
     amap.getPoiAround(keyword)
       .then(d => {
         // console.log(d);
         let { markers } = d;
         markers.forEach(item => {
           item.iconPath = "/images/marker.png";
         })
         prevPage.setData({ markers });
         prevPage.showMarkerInfo(markers[0]);
         prevPage.changeMarkerColor(0);
       })
       .catch(e => {
         console.log(e);
       })
   }
   let preurl = "/pages/xx2/xx2";
   wx.navigateBack({
     url: preurl
   })
 },
 touchsight:function(e)
 {
   console.log(e);
   let { lonlat, city } = this.data;

   let keyword = "景点"
   let pages = getCurrentPages();
   let prevPage = pages[pages.length - 2];  //上一个页面
   // console.log(pages);
   if (keyword) {
     prevPage.setData({ keyword });
     amap.getPoiAround(keyword)
       .then(d => {
         // console.log(d);
         let { markers } = d;
         markers.forEach(item => {
           item.iconPath = "/images/marker.png";
         })
         prevPage.setData({ markers });
         prevPage.showMarkerInfo(markers[0]);
         prevPage.changeMarkerColor(0);
       })
       .catch(e => {
         console.log(e);
       })
   }
   let preurl = "/pages/xx2/xx2";
   wx.navigateBack({
     url: preurl
   })
 },
 touchbank:function(e)
 {
   console.log(e);
   let { lonlat, city } = this.data;

   let keyword = "银行"
   let pages = getCurrentPages();
   let prevPage = pages[pages.length - 2];  //上一个页面
   // console.log(pages);
   if (keyword) {
     prevPage.setData({ keyword });
     amap.getPoiAround(keyword)
       .then(d => {
         // console.log(d);
         let { markers } = d;
         markers.forEach(item => {
           item.iconPath = "/images/marker.png";
         })
         prevPage.setData({ markers });
         prevPage.showMarkerInfo(markers[0]);
         prevPage.changeMarkerColor(0);
       })
       .catch(e => {
         console.log(e);
       })
   }
   let preurl = "/pages/xx2/xx2";
   wx.navigateBack({
     url: preurl
   })
 },
 touchcinema:function(e)
 {
   console.log(e);
   let { lonlat, city } = this.data;

   let keyword = "电影院"
   let pages = getCurrentPages();
   let prevPage = pages[pages.length - 2];  //上一个页面
   // console.log(pages);
   if (keyword) {
     prevPage.setData({ keyword });
     amap.getPoiAround(keyword)
       .then(d => {
         // console.log(d);
         let { markers } = d;
         markers.forEach(item => {
           item.iconPath = "/images/marker.png";
         })
         prevPage.setData({ markers });
         prevPage.showMarkerInfo(markers[0]);
         prevPage.changeMarkerColor(0);
       })
       .catch(e => {
         console.log(e);
       })
   }
   let preurl = "/pages/xx2/xx2";
   wx.navigateBack({
     url: preurl
   })
 },
 touchparking:function(e)
 {
   console.log(e);
   let { lonlat, city } = this.data;

   let keyword = "停车场"
   let pages = getCurrentPages();
   let prevPage = pages[pages.length - 2];  //上一个页面
   // console.log(pages);
   if (keyword) {
     prevPage.setData({ keyword });
     amap.getPoiAround(keyword)
       .then(d => {
         // console.log(d);
         let { markers } = d;
         markers.forEach(item => {
           item.iconPath = "/images/marker.png";
         })
         prevPage.setData({ markers });
         prevPage.showMarkerInfo(markers[0]);
         prevPage.changeMarkerColor(0);
       })
       .catch(e => {
         console.log(e);
       })
   }
   let preurl = "/pages/xx2/xx2";
   wx.navigateBack({
     url: preurl
   })
 },
 touchsubway:function(e)
 {
   console.log(e);
   let { lonlat, city } = this.data;

   let keyword = "地铁站"
   let pages = getCurrentPages();
   let prevPage = pages[pages.length - 2];  //上一个页面
   // console.log(pages);
   if (keyword) {
     prevPage.setData({ keyword });
     amap.getPoiAround(keyword)
       .then(d => {
         // console.log(d);
         let { markers } = d;
         markers.forEach(item => {
           item.iconPath = "/images/marker.png";
         })
         prevPage.setData({ markers });
         prevPage.showMarkerInfo(markers[0]);
         prevPage.changeMarkerColor(0);
       })
       .catch(e => {
         console.log(e);
       })
   }
   let preurl = "/pages/xx2/xx2";
   wx.navigateBack({
     url: preurl
   })
 },

 touchpetrol:function(e)
 {
   console.log(e);
   let { lonlat, city } = this.data;

   let keyword = "加油站"
   let pages = getCurrentPages();
   let prevPage = pages[pages.length - 2];  //上一个页面
   // console.log(pages);
   if (keyword) {
     prevPage.setData({ keyword });
     amap.getPoiAround(keyword)
       .then(d => {
         // console.log(d);
         let { markers } = d;
         markers.forEach(item => {
           item.iconPath = "/images/marker.png";
         })
         prevPage.setData({ markers });
         prevPage.showMarkerInfo(markers[0]);
         prevPage.changeMarkerColor(0);
       })
       .catch(e => {
         console.log(e);
       })
   }
   let preurl = "/pages/xx2/xx2";
   wx.navigateBack({
     url: preurl
   })
 },
 touchwc:function(e)
 {
   console.log(e);
   let { lonlat, city } = this.data;

   let keyword = "厕所"
   let pages = getCurrentPages();
   let prevPage = pages[pages.length - 2];  //上一个页面
   // console.log(pages);
   if (keyword) {
     prevPage.setData({ keyword });
     amap.getPoiAround(keyword)
       .then(d => {
         // console.log(d);
         let { markers } = d;
         markers.forEach(item => {
           item.iconPath = "/images/marker.png";
         })
         prevPage.setData({ markers });
         prevPage.showMarkerInfo(markers[0]);
         prevPage.changeMarkerColor(0);
       })
       .catch(e => {
         console.log(e);
       })
   }
   let preurl = "/pages/xx2/xx2";
   wx.navigateBack({
     url: preurl
   })
 }
 
})