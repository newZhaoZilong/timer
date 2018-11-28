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
       this.timer = new Timer({
        duration:180,
        joinStr:':',
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
    
  },
  stop:function(){
    this.timer.stop();
  },
  start:function(){
    this.timer.start();
  },
})
