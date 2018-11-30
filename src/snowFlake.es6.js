class snowFlake {
  constructor (event, options) {
    this.ctx = event.getContext('2d')
    this.width = event.parentNode.clientWidth
    this.height = event.parentNode.clientHeight
    this.snowFlakes = [] // 雪花數組
    this.open = true // 控制是否开启
    event.width = this.width
    event.height = this.height

    this.color = options.color || 'white' // 雪花顏色
    this.number = Math.abs(parseInt(options.number)) || 100 // 雪花數量
    this.rs = Math.abs(parseFloat(options.rs)) || 1 // 雪花大小的半径
    this.ds = Math.abs(parseFloat(options.ds)) || 0 // 雪花最大半径与最小半径的差
    this.vy = Math.abs(parseFloat(options.vy)) || 1 // 雪花y軸下降速度
    this.vx = Math.abs(parseFloat(options.vx)) || 0 // 雪花x軸偏移速度
    this.dy = Math.abs(parseFloat(options.dy)) || 0 // 雪花y軸平均速度偏移量，即最大下落速度和最小下落速度之差除以2
    this.dx = Math.abs(parseFloat(options.dx)) || 0 // 雪花x軸速度偏移量，即向左偏移速度和向右偏移速度绝对值之和
    this.isShadow = options.isShadow || false // 是否显示雪花阴影
    this.shadow = options.shadow || {} // 当isShadow为true时启用 参数为canvas的阴影属性
    this.isOpa = options.isOpa || true // 是否启用透明 （透明选项为随机透明 透明度0.5 - 1）
  }

  start () {
    this.open = true
    this.generateSnowFlakes()
    this.viewResize()
  }

  stop () {
    this.open = false
  }

  snowReset () {
    const size = this.rs + Math.random() * this.ds
    const rx = Math.random() * this.width
    const ry = Math.random() * -this.height
    const opa = this.isOpa ? (Math.random() * 0.5 + 0.5) : 1
    const vy = (this.vy + Math.random() * this.dy) / 2
    const vx = Math.random() * this.dx - this.dx / 2
    const item = {
      size,
      rx,
      ry,
      opa,
      vy,
      vx
    }
    return item
  }

  generateSnowFlakes () {
    const snowFlakes = []
    for (let k = 0; k < this.number; k++) {
      const item = this.snowReset()
      snowFlakes.push(item)
    }

    this.snowFlakes = snowFlakes
  }

  upDataCanvas () {
    const ctx = this.ctx
    const list = [...this.snowFlakes]
    ctx.clearRect(0, 0, this.width, this.height)

    if (!this.open) return

    for (var i = 0; i < this.number; i++) {
      var el = list[i]
      el.ry += el.vy
      el.rx += el.vx

      ctx.globalAlpha = el.opa
      ctx.beginPath()
      ctx.arc(el.rx, el.ry, el.size, 0, Math.PI * 2, false)
      ctx.closePath()
      ctx.fill()

      if (el.ry > this.height) {
        list.splice(i, 1, this.snowReset())
      }
    }
    this.snowFlakes = [...list]
    window.requestAnimationFrame(() => {
      this.upDataCanvas()
    })
  }

  viewResize () {
    const ctx = this.ctx
    ctx.fillStyle = this.color
    if (this.isShadow) {
      for (let key in this.shadow) {
        ctx[key] = this.shadow[key]
      }
    }
    this.upDataCanvas()
  }
}

export default snowFlake
