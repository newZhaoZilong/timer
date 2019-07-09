class Timer {
<<<<<<< HEAD
  constructor(initObj = {}) {
    this.interval = initObj.interval || 1000; //间隔时间,
    this.duration = initObj.duration || 10; //倒计时时间，默认10s
    this.callBack = initObj.callBack; //回掉函数，用于执行代码
    this.complete = initObj.complete; //倒计时结束后执行
    this.joinStr = initObj.joinStr; //倒计时数字之间的字符串
=======
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
>>>>>>> parent of c71504f... 1.计时器优化
  }

  start(startTime) {
    console.log('执行start');
    //这里只能避免简单的连续点击，不能避免快速的连续点击多次
    //如果是这种情况可以在点击的时候设置button为不可点击状态
    clearTimeout(this.timeoutId);
<<<<<<< HEAD
=======
    //首先获取字符串
    var durationStr = this.durationToStr(this.duration, this.joinStr);
    //执行回调将时间字符串传出
    this.callBack(durationStr);
>>>>>>> parent of c71504f... 1.计时器优化

    if (startTime){
      this.duration = startTime;
    }

    var durationStr = this.durationToStr(this.duration, this.joinStr);
    this.callBack(durationStr, () => {
      if (this.duration <= 0) {
        console.log('计时结束');
        this.complete && this.complete();
      } else {
        //获取当前时间的毫秒数
        var currentTime = Date.now();
        var offsetTime = this.lastTime ? (currentTime - this.lastTime - this.interval) : 0;
        this.lastTime = currentTime;
        var correctTime = (this.interval - offsetTime > 0) ? (this.interval - offsetTime) : 0;

        console.log(`当前时间:${currentTime} 偏移时间:${offsetTime} 校准后的延时时间${correctTime}`);
        if (this.isStop) {
          console.log('暂停')
          this.isStop = false;
        } else {
          this.timeoutId = setTimeout(() => {
            this.duration--;
            this.start();
          }, correctTime);
        }
      }
    });
  }
  stop() {
    console.log('执行start');
    this.lastTime = null;
    clearTimeout(this.timeoutId);
  }
<<<<<<< HEAD
  durationToStr(dt, intervalStr = ' ') {
=======

  durationToStr(dt, intervalStr = ' ') {
    if (this.easy) {
      return dt;
    }
>>>>>>> parent of c71504f... 1.计时器优化
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