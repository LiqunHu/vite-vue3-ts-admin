import CryptoJS from 'crypto-js'
import _ from 'lodash'
import moment from 'moment'

const loadJs = function(urlstr) {
  return new Promise(function(resolve, reject) {
    for (let c of document.head.children) {
      if (c.tagName === 'SCRIPT') {
        if (c.src === urlstr) {
          resolve()
        }
      }
    }
    let head = document.getElementsByTagName('head')[0]
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = urlstr
    script.onerror = reject
    script.onload = script.onreadystatechange = function() {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        // Handle memory leak in IE
        script.onload = script.onreadystatechange = null
        resolve()
      }
    }
    head.insertBefore(script, head.firstChild)
  })
}

const loadCss = function(cssstr) {
  return new Promise(function(resolve, reject) {
    for (let c of document.head.children) {
      if (c.tagName === 'LINK') {
        if (c.href === cssstr) {
          resolve()
        }
      }
    }
    let head = document.getElementsByTagName('head')[0]
    let link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = cssstr
    link.onerror = reject
    link.onload = link.onreadystatechange = function() {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        // Handle memory leak in IE
        link.onload = link.onreadystatechange = null
        resolve()
      }
    }
    head.insertBefore(link, head.firstChild)
  })
}

const generateRandomAlphaNum = function(len) {
  let rdmString = ''
  // toSting接受的参数表示进制，默认为10进制。36进制为0-9 a-z
  for (; rdmString.length < len; ) {
    rdmString += Math.random()
      .toString(16)
      .substr(2)
  }
  return rdmString.substr(0, len)
}

const aesEncryptModeCFB = function(msg, pwd) {
  let magicNo = generateRandomAlphaNum(32)

  let key = CryptoJS.enc.Hex.parse(CryptoJS.MD5(pwd).toString())
  let iv = CryptoJS.enc.Hex.parse(magicNo)

  let identifyCode = CryptoJS.AES.encrypt(msg, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
  return [magicNo, identifyCode]
}

const clearStoreData = function() {
  window.localStorage.clear()
}

const setStoreData = function(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const getStoreData = function(key) {
  let storeStr = window.localStorage.getItem(key)
  if (storeStr) {
    return JSON.parse(storeStr)
  } else {
    return null
  }
}

const removeStoreData = function(key) {
  window.localStorage.removeItem(key)
}
const clearSessionStoreData = function() {
  window.sessionStorage.clear()
}

const setSessionStoreData = function(key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

const getSessionStoreData = function(key) {
  let storeStr = window.sessionStorage.getItem(key)
  if (storeStr) {
    return JSON.parse(storeStr)
  } else {
    return null
  }
}

const removeSessionStoreData = function(key) {
  window.sessionStorage.removeItem(key)
}

const checkAuth = function(key) {
  let userinfo = getStoreData('userinfo')
  if (_.findIndex(userinfo.authApis, { api_function: key }) >= 0) {
    return true
  } else {
    return false
  }
}

//设置参数，将属性值为 null,undefined,空 属性移除
const clearEmptyParams = params => {
  for (let [key, value] of Object.entries(params)) {
    if (value === '' || value == null) delete params[key]
    if (Array.isArray(value)) {
      if (value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          params[key][i] = clearEmptyParams(value[i])
        }
      }
    }
  }
  return params
}

/**
 * 计算两个日期间隔
 * @param start 开始时间
 * @param end 结束时间
 * @param type 'day' 'month' 'minute' 'seconds'
 * @returns {number}
 */
const diff = (start, end, type = 'day') => {
  if (!start || !end) {
    return 0
  }
  const startDate = moment(new Date(start))
  const endDate = moment(new Date(end))
  return endDate.diff(startDate, type)
}

const isFloat = function(v) {
  return /^-?\d*\.\d+$/.test(v)
}

//显示数据如果是浮点型，则保留3位小数
const resetData = function(data) {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      data[i] = resetData(data[i])
    }
  } else if (_.isObject(data)) {
    for (let [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        data[key] = resetData(value)
      } else if (isFloat(value)) {
        if (key !== 'quantity') continue
        if (value > 0) {
          data[key] = parseFloat((value * 1).toFixed(3))
        } else {
          data[key] = -parseFloat(Math.abs(value * 1).toFixed(3))
        }
      }
    }
  }
  return data
}

export default {
  loadJs,
  loadCss,
  aesEncryptModeCFB,
  clearStoreData,
  setStoreData,
  getStoreData,
  removeStoreData,
  clearSessionStoreData,
  setSessionStoreData,
  getSessionStoreData,
  removeSessionStoreData,
  checkAuth,
  clearEmptyParams,
  diff,
  isFloat,
  resetData
}
