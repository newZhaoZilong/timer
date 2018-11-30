//index.js
//获取应用实例
const app = getApp()
const Timer = require('../../utils/Timer2.js');
Page({
  onLoad() {
    //创建一个计时器
    this.timer = new Timer({
      duration: 30,
      joinStr: ':',
      callBack: (daojishi) => {
        this.setData({
          daojishi: daojishi
        })
      },
      complete: () => {
        console.log('计时结束')
      }
    });
  },
  //开始计时器
  start: function () {
    this.timer.start();
  },
  //停止计时器
  pause: function() {
    this.timer.pause();
  },
})