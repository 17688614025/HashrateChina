// 设置一个固定的key值
const KEY = 'Authorization'
// 暴露三个方法

// 设置token
export function setToken(token) {
  window.localStorage.setItem(KEY, token)
}

// 获取token
export function getToken() {
  return window.localStorage.getItem(KEY)
}

// 删除token
export function removeToken() {
  // 根据key,删除指定的值
  window.localStorage.removeItem(KEY)
}

/**
 * get请求参数拼接
 * @param {object} data
 */
export const toString = data => {
  let toString = ''
  let num = 0
  for (const key in data) {
    num++
    if (data[key] === undefined || data[key] === null) {
      delete data.key
    } else {
      const obj = data[key]
      if (Array.isArray(obj)) {
        const arrayString = obj.join(',')
        toString += key + '=' + arrayString + '&'
      } else {
        if (num >= Object.keys(data).length) {
          toString += key + '=' + data[key]
        } else {
          toString += key + '=' + data[key] + '&'
        }
      }
    }
  }
  toString.substring(0, toString.length - 1).replace(/$/, '')
  return toString
}

/**
 * 分割千分位
 * @param {Number} num [要格式化的数字]
 * @param {Int} n [保留几位小数]
 * @param {String} g [转换的单位]
 */
export const toThousands = (num, n, g) => {
  let zeroStr = ''
  if (n) {
    for (let i = 0; i < n; i++) {
      zeroStr += '0'
    }
  }
  if (g === 'nanoFIL') {
    num = num / Math.pow(10, 9)
  } else if (g === 'FIL') {
    num = num / Math.pow(10, 18)
  }
  num = (num || 0).toString()
  const isCents = num.includes('.')
  const ints = isCents ? num.split('.')[0] : num
  let cents = isCents ? num.split('.')[1] : zeroStr
  cents =
    cents.length > n
      ? cents.substr(0, n)
      : cents + zeroStr.substr(0, n - cents.length)

  return n
    ? [ints.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'), cents].join('.')
    : ints.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

/**
 * 分割千分位
 * @param {Number} num [要格式化的数字]
 * @param {Int} n [保留几位小数]
 * @param {String} g [转换的单位]
 */
export const switchUnit = (num, n) => {
  let zeroStr = ''
  let _unit = ''
  if (n) {
    for (let i = 0; i < n; i++) {
      zeroStr += '0'
    }
  }
  const nanoFIL = num / Math.pow(10, 9)
  const FIL = num / Math.pow(10, 18)
  if (FIL < Math.pow(10, -6) && nanoFIL > Math.pow(10, -3)) {
    num = nanoFIL
    _unit = 'nanoFIL'
  } else if (FIL > Math.pow(10, -6)) {
    num = FIL
    _unit = 'FIL'
  } else {
    _unit = 'attoFIL'
  }
  num = (num || 0).toString()
  const isCents = num.includes('.')
  const ints = isCents ? num.split('.')[0] : num
  let cents = isCents ? num.split('.')[1] : zeroStr
  cents =
    cents.length > n
      ? cents.substr(0, n)
      : cents + zeroStr.substr(0, n - cents.length)
  const strNum = n
    ? [ints.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'), cents].join('.')
    : ints.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return (num > 0 ? strNum : 0) + ' ' + _unit
}

/**
 * 时间戳转换距离
 * @param {Number} t [时间戳]
 */
export const timestamp = t => {
  const _s = t > 1000000000 ? parseInt(new Date().getTime() / 1000 - t) : t
  const _m = parseInt(_s / 60)
  const _h = parseInt(_m / 60)
  const _d = parseInt(_h / 24)
  if (_m && !_h) {
    return `${_m}分${_s % 60}秒前`
  } else if (_h && !_d) {
    return `${_h}时${_m % 60}分${_s % 60}秒前`
  } else if (_d) {
    return `${_d}天${_h % 24}时${_m % 60}分${_s % 60}秒前`
  } else {
    return `${_s}秒前`
  }
}

/**
 * 时间戳转换为：y-m-d h:m
 * @param {Number} now [时间戳]
 */
export const formatDate = now => {
  const unit = num => {
    return num > 9 ? num : '0' + num
  }
  now = new Date(now * 1000)
  const year = now.getFullYear() // 取得4位数的年份
  const month = now.getMonth() + 1 // 取得日期中的月份，其中0表示1月，11表示12月
  const date = now.getDate() // 返回日期月份中的天数（1到31）
  const hour = now.getHours() // 返回日期中的小时数（0到23）
  const minute = now.getMinutes() // 返回日期中的分钟数（0到59）
  // const second=now.getSeconds(); //返回日期中的秒数（0到59）
  return (
    year +
    '-' +
    unit(month) +
    '-' +
    unit(date) +
    ' ' +
    unit(hour) +
    ':' +
    unit(minute)
  )
}

/**
 * 字符太长，中间显示省略
 * @param {String} str [要省略的字符串]
 * @param {Int} num [最大长度]
 */
export const subStrCenter = (str, num = 20) => {
  return str && str.length > num
    ? str.substr(0, 4) + '...' + str.substr(str.length - 4)
    : str
}

/**
 *  字节单位转换函数（KiB MiB GiB TiB PiB EiB ZiB）
 * @param {Number} byte [字节个数]
 * @param {String} Bi [转换的字节单位]
 * @param {Int} fixedNum [小数位数]
 */
export function byteConvert(bytes, Bi, fixedNum = 2) {
  if (isNaN(bytes)) {
    return ''
  }
  let size = ''
  const symbols = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  if (Bi && symbols.includes(Bi)) {
    size = bytes / Math.pow(1024, symbols.indexOf(Bi))
    if (size.toString().length > size.toFixed(fixedNum).toString().length) {
      size = size.toFixed(fixedNum)
    }
  } else {
    const b = bytes
    bytes = b < 0 ? bytes.split('-')[1] : b
    let exp = Math.floor(Math.log(bytes) / Math.log(2))
    if (exp < 1) {
      exp = 0
    }
    const i = Math.floor(exp / 10)
    bytes = bytes / Math.pow(2, 10 * i)

    if (bytes.toString().length > bytes.toFixed(fixedNum).toString().length) {
      bytes = bytes.toFixed(fixedNum)
    }

    size = (b < 0 ? '-' : '') + bytes + ' ' + symbols[i]
  }
  return size
}
/**
 * 获取随机颜色
 * @param {*} _
 */
export const rgb = _ => {
  var r = Math.floor(Math.random() * 256)
  var g = Math.floor(Math.random() * 256)
  var b = Math.floor(Math.random() * 256)
  var rgb = 'rgb(' + r + ',' + g + ',' + b + ')'
  return rgb
}

/**
 * 字典切换成中文
 * @param {String} key 数据的key
 * @param {String} val 数据的值
 */
export const dicSwitch = (key, val) => {
  const dic = {
    actor: {
      storageminer: '矿工账户',
      multisig: '多重签名',
      account: '普通账户'
    },
    type: {
      receive: '接收',
      reward: '区块奖励',
      'miner-fee': '矿工手续费',
      'burn-fee': '销毁手续费',
      burn: '销毁'
    },
    exitCode: {
      0: 'OK'
    }
  }
  return dic[key][val] || '未知'
}

/**
 * 当前鼠标位置
 * @param {*} point
 * @param {*} params
 * @param {*} dom
 * @param {*} rect
 * @param {*} size
 */
export const position = (point, params, dom, rect, size) => {
  // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
  var x = 0 // x坐标位置
  var y = 0 // y坐标位置

  var pointX = point[0]
  var pointY = point[1]

  // 提示框大小
  var boxWidth = size.contentSize[0]
  var boxHeight = size.contentSize[1]

  // boxWidth > pointX 说明鼠标左边放不下提示框
  if (boxWidth > pointX) {
    x = 5
  } else { // 左边放的下
    x = pointX - boxWidth
  }

  // boxHeight > pointY 说明鼠标上边放不下提示框
  if (boxHeight > pointY) {
    y = 5
  } else { // 上边放得下
    y = pointY - boxHeight
  }
  return [x, y]
}
