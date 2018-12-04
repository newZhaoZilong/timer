class Timer {
  constructor({
    interval = 1,
    duration = 10,
    callBack,
    complete,
    joinStr,
    easy = true
  }) {
    this.interval = interval; //间隔时间,
    this.duration = duration; //倒计时时间，默认10s
    this.callBack = callBack; //回掉函数，用于执行代码
    this.complete = complete; //倒计时结束后执行
    this.joinStr = joinStr; //倒计时数字之间的字符串
    this.easy = easy
  }

  start() {
    clearTimeout(this.timeoutId);
    //首先获取字符串
    var durationStr = this.durationToStr(this.duration, this.joinStr);
    //执行回调将时间字符串传出
    this.callBack(durationStr);

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

  durationToStr(dt, intervalStr = ' ') {
    if (this.easy) {
      return dt;
    }
    var hour = parseInt(dt / 3600);
    var min = parseInt((dt / 60 - hour * 60));
    var s = parseInt(dt - hour * 3600 - min * 60);
    return [hour, min, s].map((v) => {
      v = v.toString();
      return v[1] ? v : '0' + v;
    }).join(intervalStr);
  }
}



module.exports = Timer