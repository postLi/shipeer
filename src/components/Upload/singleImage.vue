<template>
  <div class="upload-container" :class="{'uploadlist': showFileList}">
    <el-upload
      class="image-uploader"
      v-if="uploadUrl"
      :data="upload"
      :action="uploadUrl"
      :multiple="false"
      :drag="!showFileList"
      :show-file-list="showFileList"
      :file-list="filelist"
      :limit="limit"
      :before-upload="beforeUpload"
      :list-type="listtype"
      :on-exceed="onexceed"
      :disabled="disabled"
      :on-remove="handleRemove"
      :on-error="handleError"
      :on-success="handleImageScucess">
      <slot name="content">
        <div v-if="!showtc">
          <!--<div v-if="title && !showFileList" class="upload__title">{{ title }}</div>-->
          <el-button size="medium" icon="el-icon-plus"></el-button>
          <el-button class="uploadtwocode" :size="size" @click.stop.prevent="showtc = true" v-if="twocode"
                     type="primary">二维码上传
          </el-button>
          <!--<div class="el-upload__text" v-if="!showFileList">将文件拖拽到此区域</div>-->
          <!--<div v-if="tip" class="upload__tip">{{ tip }}</div>-->
        </div>
        <div class="twocodebox" @click.stop.prevent @mouseover="showtwocdetip = true" @mouseout="showtwocdetip = false"
             v-else>
          <div>
            <img :src="twocodeurl" alt="">
          </div>
          <el-button :size="size" @click="showtc = false" type="primary">本地上传</el-button>
          <el-button :size="size" @click="changeTwocode" type="primary">更换二维码</el-button>
        </div>

      </slot>
    </el-upload>
    <div class="image-preview" v-if="imageUrl && !showFileList">
      <div class="image-preview-wrapper">
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i @click="rmImage(imageUrl)" class="el-icon-delete"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 上传接口
  import {getUploadPolicy, getTwocodeUrl} from '@/api/common'
  // import {getUploadPolicy, getUploadId, getUploadIdInfo, getTwocodeUrl} from '@/api/common'
  import {parseTime} from '@/utils/'
  // import QRCode from 'qrcode'

  export default {
    name: 'singleImageUpload',
    props: {
      value: [String, Array],
      title: {
        type: String,
        default: ''
      },
      tip: {
        type: String,
        default: '（jpg/png。小于5M）'
      },
      size: {
        type: String,
        default: 'mini'
      },
      'showFileList': {
        type: Boolean,
        default: false
      },
      limit: {
        type: Number,
        default: 1
      },
      listtype: {
        type: String,
        default: 'picture',
        enum: ['text', 'picture', 'picture-card']
      },
      disabled: {
        type: Boolean,
        default: false
      },
      twocode: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      imageUrl() {
        return this.value
      }
    },
    data() {
      return {
        tempUrl: '',
        dataObj: {token: '', key: ''},
        // 上传参数文档
        // https://help.aliyun.com/document_detail/31988.html
        // OSS PostObject错误及排查
        // https://yq.aliyun.com/articles/58524
        upload: {
          'key': '', // 文件名称
          'policy': '',
          'OSSAccessKeyId': '',
          'success_action_status': '201', // 让服务端返回200,不然，默认会返回204;201会返回xml格式
          // 'callback': 'callbackbody',
          'signature': ''
        },
        uploadUrl: '',
        dir: '',
        filelist: [],
        showtc: false,
        showtwocdetip: true,
        twocodeurl: ''
      }
    },
    watch: {
      showtc() {
        if (this.showtc) {
          this.changeTwocode()
        } else {
          clearInterval(this.uptimer)
        }
      },
      value: {
        handler(newVal) {
          if (this.showFileList) {
            let arr = Array.isArray(newVal) ? newVal : newVal ? newVal.split(',') : []
            arr = arr.filter(el => el)
            this.filelist = []
            this.filelist = arr.map(el => {
              const obj = {}
              obj.url = el
              return obj
            })
          } else {
            this.filelist = newVal ? [newVal] : []
          }
        },
        immediate: true
      }
    },
    mounted() {
      this.init()
    },
    updated() {
      console.log('single image updated~~~')
    },
    beforeDestroy() {
      console.log('beforeDestroy')
      clearInterval(this.uptimer)
    },
    methods: {
      init() {
        // 从后台获取policy
        return getUploadPolicy().then(data => {
          this.upload.OSSAccessKeyId = data.accessid
          this.upload.policy = data.policy
          this.upload.signature = data.signature
          this.uploadUrl = data.host
          this.dir = data.dir

          // this.upload.key = data.dir + this.random_string() + type
        }).catch(() => {
        })
      },
      rmImage(url) {
        this.filelist = this.filelist.filter(el => {
          return el.url !== url
        })
        this.emitInput('')
        this.showtc = false
      },
      // 超出上传数量
      onexceed(file, filelist) {
        this.$message.error(`最多上传 ${this.limit} 张!`)
      },
      // 删除列表
      handleRemove(file, fileList) {
        console.log('handleRemove:', file, fileList)
        this.filelist = fileList
        this.emitInput()
      },
      // 设置随机的文件名
      random_string(len) {
        len = len || 32
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        var maxPos = chars.length
        var pwd = ''
        for (var i = 0; i < len; i++) {
          pwd += chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
      },
      emitInput(val) {
        if (val) {
          this.filelist.push({
            url: val
          })
        }

        this.$emit('input', this.showFileList ? this.filelist.map(el => {
          return el.url
        }).join(',') : val)
      },
      handleImageScucess(xml) {
        let url = ''
        if (xml.indexOf('Location') !== -1) {
          url = xml.match(/<Location>([^<]+)<\/Location>/m)
          url = url ? url[1] : ''
        }
        this.emitInput(url)
        // this.imageUrl = url
      },
      handleError(err) {
        this.$message.error('上传错误：' + JSON.stringify(err))
        this.$emit('error', err)
      },
      beforeUpload(file) {
        const isJPG = /image\/\w+/.test(file.type) && /(jpe?g|png)/i.test(file.type)
        const isLt5M = file.size / 1024 / 1024 < 5
        let type = file.name.match(/([^\.]+)$/)
        type = type ? '.' + type[1] : ''

        return new Promise((resolve, reject) => {
          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
            reject(false)
          } else if (!isLt5M) {
            this.$message.error('上传头像图片大小不能超过 5MB!')
            reject(false)
          } else {
            // 上传前统一获取下凭证
            this.init().then(res => {
              // 设置文件名
              this.upload.key = this.dir +'/aflc/'+ parseTime(new Date(), '{y}{m}{d}') + '/' + this.random_string() + type
              resolve(true)
            }).catch(err => {
              this._handlerCatchMsg(err)
              resolve(false)
            })
          }
        })
      },
      changeTwocode() {
        clearInterval(this.uptimer)
        // 请求uploadid
        getUploadId().then(res => {
          this.upid = res.data
          this.startFetchData()
          const url = 'http://' + location.host + '/static/upload.html?len=1&access_token=' + this.access_token + '&id=' + res.data + '&url=' + (window.tms_testapiurl || '')
          console.log('url:', url)
          // QRCode.toDataURL(url, {
          //   rendererOpts: {
          //     margin: 0
          //   }
          // }).then(url => {
          //   this.twocodeurl = url
          // })
          // this.twocodeurl = getTwocodeUrl('//' + location.host +'/static/upload.html?len=1&id=' +res.data)
        }).catch(err => {
          this.$message.error('生成二维码出错了~')
        })
      },
      startFetchData() {
        clearInterval(this.uptimer)
        let thetime = 0
        this.uptimer = setInterval(() => {
          thetime += 5000
          // 当超过10分钟时，自动刷新二维码并提示
          if (thetime > 9.5 * 60 * 1000) {
            this.$message.info('二维码过期了，已重新生成~')
            this.changeTwocode()
            return false
          }
          getUploadIdInfo(this.upid).then(res => {
            const data = res.data
            if (data && data.id === this.upid && data.url) {
              clearInterval(this.uptimer)
              // this.value = data.url
              this.showtc = false
              this.emitInput(decodeURIComponent(data.url))
            }
          }).catch(err => {
            // this.changeTwocode()
            this.$message.info('二维码过期了，请重新扫描上传~')
          })
        }, 5000)
      }
    }
  }
</script>
<style lang="scss">
  .uploadlist {
    display: inline-block;
    width: auto !important;
    height: auto;

    .el-upload {
      width: auto;

      .el-button {
        margin-top: 0;
      }
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/style/mixin.scss";

  .uploadtwocode {
    position: relative;
  }

  .twocodebox {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    img {
      width: 138px;
      height: 86px;
    }
    .el-button {
      margin-top: 0 !important;
    }
  }

  .upload-container {
    width: 100%;
    position: relative;
    @include clearfix;

    .el-upload .el-upload-dragger {
      height: 116px;
    }
    .image-uploader {
      width: 100%;
      height: 100%;
    }
    .image-preview {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: #fff;
      top: 0;
      left: 0;
      .image-preview-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .image-preview-action {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s;
        cursor: pointer;
        text-align: center;
        line-height: 200px;
        .el-icon-delete {
          font-size: 36px;
          position: relative;
          top: -45%;
        }
        /*.el-icon-delete:before {*/
          /*content: '';*/
          /*display: block;*/
          /*!*position: absolute;*!*/
          /*!*top: 1px;*!*/
          /*!*left: 1px;*!*/
          /*!*opacity: 1;*!*/
        /*}*/
      }
      &:hover {
        .image-preview-action {
          opacity: 1;
        }
      }
    }
    .el-button {
      margin-top: 24px;
    }
    .el-upload__text {
      margin-top: 10px;
      margin-bottom: 5px;
      font-size: 12px;
    }
    .upload__tip {
      font-size: 12px;
      color: #999;
    }
    .upload__title {
      font-size: 13px;
      color: #666;
      margin-top: 14px;
    }
  }

</style>
