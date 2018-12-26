//index.js
//获取应用实例
const app = getApp()
const Timer = require('../../utils/Timer.js');
Page({
  onLoad() {
    //创建一个计时器
    this.timer = new Timer({
      duration: 30,
      joinStr: ':',
      callBack: (res) => {
        console.log(res);
        this.setData({
          daojishi0: res.time,
          daojishi1: res.list.join(' '),
          daojishi2: res.list.join(':'),
          daojishi3: `${res.list[0]}时${res.list[1]}分${res.list[2]}秒`,
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