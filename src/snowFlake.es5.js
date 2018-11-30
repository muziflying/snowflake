var snowFlake = function (event, options) {
  var self = this
  var snowFlakes = [] // 雪花數組
  var snowflake
  var ctx = event.getContext('2d')
  var width = Math.abs(parseInt(options.width)) || event.parentNode.clientWidth
  var height = Math.abs(parseInt(options.height)) || event.parentNode.clientHeight
  var open = true // 控制是否开启
  event.width = width
  event.height = height

  var color = options.color || 'white' // 雪花顏色
  var number = Math.abs(parseInt(options.number)) || 100 // 雪花數量
  var rs = Math.abs(parseFloat(options.rs)) || 1 // 雪花大小的半径
  var ds = Math.abs(parseFloat(options.ds)) || 0 // 雪花最大半径与最小半径的差
  var vy = Math.abs(parseFloat(options.vy)) || 1 // 雪花y軸下降速度
  var dy = Math.abs(parseFloat(options.dy)) || 0 // 雪花y軸平均速度偏移量，即最大下落速度和最小下落速度之差除以2
  var dx = Math.abs(parseFloat(options.dx)) || 0 // 雪花x軸速度偏移量，即向左偏移速度和向右偏移速度绝对值之和
  var isShadow = options.isShadow || false // 是否显示雪花阴影
  var shadow = options.shadow || {} // 当isShadow为true时启用 参数为canvas的阴影属性
  var isOpa = options.isOpa || true // 是否启用透明 （透明选项为随机透明 透明度0.5 - 1）

  var Item = function () {
    this.size = 0
    this.rx = 0
    this.ry = 0
    this.opa = 0
    this.vy = 0
    this.vx = 0

    this.reset()
  }

  Item.prototype.reset = function () {
    this.size = rs + Math.random() * ds
    this.rx = Math.random() * width
    this.ry = Math.random() * -height
    this.opa = isOpa ? (Math.random() * 0.5 + 0.5) : 1
    this.vy = (vy + Math.random() * dy) / 2
    this.vx = Math.random() * dx - dx / 2
  }

  function generateSnowFlakes () {
    snowFlakes = []
    for (var k = 0; k < number; k++) {
      snowflake = new Item()
      snowflake.reset()
      snowFlakes.push(snowflake)
    }
  }

  function upDataCanvas() {
    ctx.clearRect(0, 0, width, height)

    if (!open) return

    for (var i = 0; i < number; i++) {
      var el = snowFlakes[i]
      el.ry += el.vy
      el.rx += el.vx

      ctx.globalAlpha = el.opa
      ctx.beginPath()
      ctx.arc(el.rx, el.ry, el.size, 0, Math.PI * 2, false)
      ctx.closePath()
      ctx.fill()

      if (el.ry > height) {
        el.reset()
      }
    }
    window.requestAnimationFrame(function() {
      upDataCanvas()
    })
  }

  function viewResize() {
    ctx.fillStyle = color
    if (isShadow) {
      for (var key in shadow) {
        ctx[key] = shadow[key]
      }
    }
    upDataCanvas()
  }

  this.start = function () {
    open = true
    generateSnowFlakes()
    viewResize()
  }

  this.stop = function () {
    open = false
  }

  
  window.addEventListener('resize', function () {
    width = Math.abs(parseInt(options.width)) || event.parentNode.clientWidth
    height = Math.abs(parseInt(options.height)) || event.parentNode.clientHeight
    event.width = width
    event.height = height
    viewResize()
  }, {passive: false})
}

try {
  module.exports = snowFlake
}
catch (e) {
}
