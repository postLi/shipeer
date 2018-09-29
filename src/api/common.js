import Axios from 'axios'
window.UPLOADPOLICYDATA = '' // 用来缓存上传policy
window.UPLOADPOLICYDATA_timer = '' // 加个定时器变量，防止没有引用的定时器被自动回收
/* window.UPLOADPOLICYDATA = {
  'accessid': 'LTAIFj5nQSIxEZ8H',
  'policy': 'eyJleHBpcmF0aW9uIjoiMjAxOC0wOS0xNlQxOToyMDowMS4zMTJaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ0bXMvIl1dfQ==',
  'signature': 'A+ZRKPmw0mFXhNNdd5ycyoH6g9c=',
  'dir': 'tms/',
  'host': 'http://aflc.oss-cn-shenzhen.aliyuncs.com',
  'expire': '1537125601'
} */
export function getUploadPolicy() {
  // 后期可添加是否过期的验证
  if (window.UPLOADPOLICYDATA) {
    return new Promise((resolve) => {
      resolve(window.UPLOADPOLICYDATA)
    })
  } else {
    return Axios.get('/anfacommonservice/common/oss/v1/policy').then(res => {
      window.UPLOADPOLICYDATA = res.data || ''
      // 定时清除旧数据
      window.UPLOADPOLICYDATA_timer = setTimeout(() => {
        window.UPLOADPOLICYDATA = ''
      }, 1 * 60 * 1000)
      return window.UPLOADPOLICYDATA
    })
  }
}
