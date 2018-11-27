//index.js
//获取应用实例
const app = getApp()
const Timer = require('../../utils/Timer.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad(){
    console.log('nihao');
      var timer = new Timer({
        callBack: (daojishi,resolve)=>{
          this.setData({
            daojishi: daojishi
          }, resolve)
        },
        complete:()=>{
          console.log('计时结束')
        }
      });
    // var time_str1 = timer.durationToStr(20,':');
    // var time_str2 = timer.durationToStr(60,':');
    // var time_str3 = timer.durationToStr(100,':');
    // var time_str4 = timer.durationToStr(3600,':');
    // var time_str5 = timer.durationToStr(4000,':');
    // console.log(time_str1);
    // console.log(time_str2);
    // console.log(time_str3);
    // console.log(time_str4);
    // console.log(time_str5);
    timer.start();
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
