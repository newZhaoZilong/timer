class Timer {
  constructor(initObj = {}) {
    this.interval = initObj.interval || 1000; //间隔时间,
    this.duration = initObj.duration || 10; //倒计时时间，默认10s
    this.callBack = initObj.callBack; //回掉函数，用于执行代码
    this.complete = initObj.complete; //倒计时结束后执行
    this.joinStr = initObj.joinStr; //倒计时数字之间的字符串
  }

  start() {
    console.log('执行start');
    this.isStop = false;
    clearTimeout(this.timeoutId);



    var durationStr = this.durationToStr(this.duration, this.joinStr);
    this.callBack(durationStr, () => {
      
      if (this.duration <= 0) {
        this.complete && this.complete();
      } else {
        //获取当前时间的毫秒数
        var currentTime = Date.now();
        console.log(`${durationStr}===>${currentTime}`);

        var offsetTime = this.lastTime ? (currentTime - this.lastTime - this.interval) : 0;
        this.lastTime = currentTime;
        console.log('offsetTime', offsetTime);

        var correctTime = (this.interval - offsetTime > 0) ? (this.interval - offsetTime) : 0;
        console.log('correctTime', correctTime);
        if (this.isStop) {
          console.log('暂停')
          this.isStop = false;
        }else{
          this.timeoutId = setTimeout(() => {
            this.duration--;
            this.start();
          }, correctTime);
        }

      }

    });
  }
  stop(){
    this.isStop = true;
    this.lastTime = null;
    clearTimeout(this.timeoutId);
    
  }
  durationToStr(dt, intervalStr = ' ') {
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