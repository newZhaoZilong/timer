class Timer {
<<<<<<< HEAD
<<<<<<< HEAD
  constructor(initObj = {}) {
    this.interval = initObj.interval || 1000; //间隔时间,
    this.duration = initObj.duration || 10; //倒计时时间，默认10s
    this.callBack = initObj.callBack; //回掉函数，用于执行代码
    this.complete = initObj.complete; //倒计时结束后执行
    this.joinStr = initObj.joinStr; //倒计时数字之间的字符串
=======
=======
>>>>>>> c71504fb6f3b315b852ecbdc7900b42fb273c8aa
  constructor({
    interval = 1,
    duration = 10,
    callBack,
    complete,
<<<<<<< HEAD
    joinStr,
    easy = true
=======
>>>>>>> c71504fb6f3b315b852ecbdc7900b42fb273c8aa
  }) {
    this.interval = interval; //间隔时间,
    this.duration = duration; //倒计时时间，默认10s
    this.callBack = callBack; //回掉函数，用于执行代码
    this.complete = complete; //倒计时结束后执行
<<<<<<< HEAD
    this.joinStr = joinStr; //倒计时数字之间的字符串
    this.easy = easy
>>>>>>> parent of c71504f... 1.计时器优化
=======
>>>>>>> c71504fb6f3b315b852ecbdc7900b42fb273c8aa
  }

  start() {
    clearTimeout(this.timeoutId);
<<<<<<< HEAD
<<<<<<< HEAD
=======
    //首先获取字符串
    var durationStr = this.durationToStr(this.duration, this.joinStr);
    //执行回调将时间字符串传出
    this.callBack(durationStr);
>>>>>>> parent of c71504f... 1.计时器优化
=======
    //首先获取字符串
    var durationStr = this.durationToStr();
    //执行回调将时间字符串传出
    this.callBack(durationStr);
>>>>>>> c71504fb6f3b315b852ecbdc7900b42fb273c8aa

    if (this.duration <= 0) {
      this.complete && this.complete();
      return;
    }
    if (!this.lastTime) {
      this.current
    }
    var currentTime = Date.now();
    var offsetTime = this.lastTime ? currentTime - this.lastTime - this.interval * 1000: 0 
    if (Math.abs(offsetTime)>800){
      offsetTime = 0;
    }
    this.lastTime = currentTime - offsetTime;
    console.log('偏移时间', offsetTime, '延时时间', this.interval * 1000 - offsetTime);
    this.timeoutId = setInterval(() => {
      this.duration -= this.interval;
      this.start();
    }, this.interval * 1000 - offsetTime)
  }
  pause() {
    clearTimeout(this.timeoutId);
  }
<<<<<<< HEAD
<<<<<<< HEAD
  durationToStr(dt, intervalStr = ' ') {
=======

  durationToStr(dt, intervalStr = ' ') {
    if (this.easy) {
      return dt;
    }
>>>>>>> parent of c71504f... 1.计时器优化
=======

  durationToStr() {
    var dt = this.duration;
>>>>>>> c71504fb6f3b315b852ecbdc7900b42fb273c8aa
    var hour = parseInt(dt / 3600);
    var min = parseInt((dt / 60 - hour * 60));
    var s = parseInt(dt - hour * 3600 - min * 60);
    return {
      time: dt,
      list: [hour, min, s].map((v) => {
        v = v.toString();
        return v[1] ? v : '0' + v;
      })
    };
  }
}



module.exports = Timer