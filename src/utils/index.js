export function loadJs(src, callback) {
  return new Promise((resolve, reject) => {
    var doc = document
    var script = doc.createElement('script')
    var head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement
    script.async = 'async'

    script.onload = script.onreadystatechange = function() {
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
        // Handle memory leak in IE
        script.onload = script.onreadystatechange = null

        // Remove the script
        if (head && script.parentNode) {
          head.removeChild(script)
        }

        // Dereference the script
        script = undefined

        // Callback if not abort
        if (callback) {
          callback()
        }
        resolve()
      }
    }

    script.onerror = function(err) {
      reject('加载失败:' + JSON.stringify(err))
    }

    script.src = src
    head.insertBefore(script, head.firstChild)
  })
}
export function numFilter(value) {
  let realVal = Number(value).toFixed(2)
  return Number(realVal)
}
export const pickerOptions2 = [{
  text: '今天',
  onClick(picker) {
    const end = new Date()
    const start = new Date(end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' 00:00:00')
    picker.$emit('pick', [start, end])
  }
}, {
  text: '昨天',
  onClick(picker) {
    const day = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    const end = new Date(day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + ' 23:59:59')
    const start = new Date(day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + ' 00:00:00')
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一周',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '本月',
  onClick(picker) {
    let _end = new Date()
    const start = new Date(_end.getFullYear(), _end.getMonth(), 1)
    _end = new Date(_end.getFullYear(), _end.getMonth() + 1, 1)

    const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '上个月',
  onClick(picker) {
    let day = new Date()
    day = new Date(day.getFullYear(), day.getMonth(), 1)
    const start = new Date(day.getFullYear(), day.getMonth() - 1, 1)
    const end = new Date(day.getFullYear(), day.getMonth() - 1, (day.getTime() - start.getTime()) / (24 * 60 * 60 * 1000))
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近三个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    picker.$emit('pick', [start, end])
    console.log(picker)
  }
}]

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if (!time) {
    return ''
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    // 判断时毫秒还是字符串
    time = typeof time === 'number' ? time : ('' + time).trim()
    // 如果是秒级单位则转成毫秒
    if (/^\d{10}$/.test(time)) {
      time = parseInt(time) * 1000
    } else if (/(\d){4}-(\d){2}-(\d){2}\s+(\d){2}:(\d){2}:(\d){2}/.test(time)) {
      // IE需要标准格式
      // time = time.replace(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/, '$1-$2-$3T$4:$5:$6Z')
      time = time.replace(/-/g, '/')
    }

    date = new Date(time)
  }
  // 如果不能正确转换，则返回原有的数据
  if (date.toString().indexOf('Invalid') !== -1) {
    return time
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

