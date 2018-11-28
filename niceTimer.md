#一个有自动校准功能的计时器

倒计时是比较常用的工具，最近正好可以写一个计时器对象练手

##倒计时流程
###工具方法

倒计时首先有一些工具的方法，一般是输入一个倒计时数字，然后将其转为一串类似'00：00：10'这种形式的字符串，所以我写了一个方法如下：

      function durationToStr(dt, intervalStr = ' ') {
        var hour = parseInt(dt / 3600);
        var min = parseInt((dt / 60 - hour * 60));
        var s = parseInt(dt - hour * 3600 - min * 60);
        return [hour, min, s].map((v) => {
          v = v.toString();
          return v[1] ? v : '0' + v;
        }).join(intervalStr);
      }
      
思路是先将数字除以3600获取当前的小时数，然后减去小时占用的秒数，剩下的数除以60获取当前的分钟数，然后减去小时和分钟占用的秒数，获取
当前的秒数，然后放到数组里，通过map遍历的将数字修改成对应的字符串然后通过join方法拼接成最终需要的'00:00:30'这种字符串

###明确核心思想

首先计时器的核心方法我先确定的有两个，一个是构造函数，因为创建对象的时候需要传入一些重要参数，考虑传入一个initObj对象，对象里有很多属性，都是Timer对象需要的初始化参数，如倒计时时间，其实核心的参数就这一个，
然后定义一个核心方法，start，最终的效果是构造函数new一个Timer对象，传入一个参数对象，之后就可以使用这个对象的start
方法开始倒计时，目标其实就是这样简单，考虑到对外输出，就必须提供一个回掉函数，也当作参数在初始化的时候传入
构造方法大概是这样的：这是es6的写法

      constructor(initObj = {}) {
        this.interval = initObj.interval || 1000; //间隔时间,
        this.duration = initObj.duration || 10; //倒计时时间，默认10s
        this.callBack = initObj.callBack; //回掉函数，用于执行代码
        this.complete = initObj.complete; //倒计时结束后执行
        this.joinStr = initObj.joinStr; //倒计时数字之间的字符串
      }  

###执行流程
执行流程主要是放在start方法里

1. 首先将30这个数字通过上面的工具方法将数字转为倒计时字符串

2. 调用回掉函数，将倒计时字符串传进去，这样就将数据提供了出去

3. 根据间隔时间，一般为1秒，设置相应的计时器

4. 等到1秒结束后，执行计时器的回掉函数，回掉函数里将计时数字减去1，变成29，重新执行start方法，重复第一步，这时数字变为29，

5. 在第二步和第三步之间判断计时数字是否为0，如果为0，执行complete函数，结束

这里其实有几个疑问，为什么先执行第二步而不是先执行第四步，因为我想的是，如果是30秒，首先应该把00:00:30显示到界面上，所以先把数据提供出去，
再执行延时器，

那又为什么是计时器结束后秒数减一而不是第三步的时候就减一，感觉一样阿，这里是因为有时可能需要暂停计时，这个时候一般是清除计时器，比如这个时候
已经显示是00:00:15了，暂停清除了计时器，如果在延时器之前秒数已经减一了，那么秒数是14，下次重新开始计时器，因为秒数是14，会马上提供出00:00:14，
00:00:15会马上变为00:00:14,这样不太合理，按常理来讲,应该是1秒后才变化，所以应该在延时器的回掉函数