

class Timer{
  constructor(initObj={}){
    
    this.interval = initObj.interval || 1000;
    this.duration = initObj.duration || 10;
    this.callBack = initObj.callBack;
    this.complete = initObj.complete;
  }
  update(){
    var durationStr = this.durationToStr(this.duration, this.intervalStr);
    this.duration--;
    if (this.duration >= 0) {
      // new Promise(function(resolve,reject){
      //   this.callBack(resolve,);
      // })
      //   .then(this.start);
      this.callBack(durationStr,()=>{
        setTimeout(() => {
          this.start();
        }, 1000)
      });
      
      
    }
  }
  start() {
    var durationStr = this.durationToStr(this.duration, this.intervalStr);
    this.callBack(durationStr);
    this.duration--;
    if (this.duration<0) {
        this.complete && this.complete();
        return;
    }
    



    //获取当前时间的毫秒数
    var currentTime = Date.now();
    console.log(`${durationStr}===>${currentTime}`);
    //首先理想状态下，当前时间=上次时间+间隔时间
    //所以当前时间-上次时间-间隔时间 就是偏移时间，如果是正数说明之前走的慢了，下次要走快点，就是setTimeout延时数值要小点，负数相反

    var offsetTime = this.lastTime ? (currentTime - this.lastTime - this.interval) : 0;
    this.lastTime = currentTime;
    console.log('offsetTime', offsetTime);
    //通过间隔时间-偏移时间计算出下次setTimeout应该延时的准确时间，这是只对上次负责
    //如果延时为负数，说明偏差时间过大，之前我考虑是否计算校正时间的时候再减去上次没减完的剩余偏差时间，
    //直到减完为止，现在还是看需求吧，如果非要较真的话，也是可以做到的
    var correctTime = (this.interval - offsetTime > 0) ? (this.interval - offsetTime) : 0; 
    console.log('correctTime', correctTime);
    setTimeout(()=>{
      this.start();
    }, correctTime);
  }
  durationToStr(dt,intervalStr=' '){
    var hour = parseInt(dt / 3600);
    var min = parseInt((dt / 60 - hour * 60) );
    var s = parseInt(dt - hour * 3600 - min * 60);
    return [hour, min, s].map((v) => {
      v = v.toString();
      return v[1] ? v : '0' + v;
    }).join(intervalStr);
  }
}



module.exports = Timer