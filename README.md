# snowflake
###雪花特效 利用canvas
###可以克隆下来直接使用
###使用方法如下
```
<script src="./src/snowFlake.es5.js"></script>
<script>
  var canvas = document.getElementById('snowItem')
  var flowers = new snowFlake(canvas, {
    isShadow: true, // 是否显示雪花阴影
    shadow: { // 当isShadow为true时启用 参数为canvas的阴影属性
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: '10',
      shadowColor: 'white'
    },
    color: 'white', // 雪花顏色
    number: 25, // 雪花數量
    rs: 3, // 雪花大小的半径
    ds: 2, // 雪花最大半径与最小半径的差
    isOpa: true, // 是否启用透明 （透明选项为随机透明 透明度0.5 - 1）
    vy: 5, // 雪花y軸下降速度
    vx: 1, // 雪花x軸偏移速度
    dy: 1, // 雪花y軸平均速度偏移量，即最大下落速度和最小下落速度之差除以2
    dx: 1 // 雪花x軸速度偏移量，即向左偏移速度和向右偏移速度绝对值之和
  })
  flowers.start()
</script>
```
snowFlake拥有两个方法，start()开启 stop()关闭
es6的可以直接
```import snowFlake from './src/snowFlake.es5.js'```
使用方法不变
