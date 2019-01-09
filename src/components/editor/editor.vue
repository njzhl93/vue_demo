<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>

<script>
  import Editor from 'wangeditor'
  import 'wangeditor/release/wangEditor.min.css'
  import { oneOf } from '@/libs/tools'
  import config from '@/config'
  import store from '@/store'
  const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
  export default {
    name: 'Editor',
    props: {
      value: {
        type: String
      },
      /**
       * 绑定的值的类型, enum: ['html', 'text']
       */
      valueType: {
        type: String,
        default: 'html',
        validator: (val) => {
          return oneOf(val, ['html', 'text'])
        }
      },
      /**
       * @description 设置change事件触发时间间隔
       */
      changeInterval: {
        type: Number,
        default: 100
      },
    },
    computed: {
      editorId () {
        return `editor${this._uid}`
      }
    },
    methods: {
      setHtml (val) {
        this.editor.txt.html(val)
      }
    },
    mounted () {
      this.editor = new Editor(`#${this.editorId}`)
      // 配置服务器端地址
      this.editor.customConfig.uploadImgServer = baseUrl + 'v1/upload_images'
      this.editor.customConfig.uploadImgHeaders = {
        'Authorization': "Bearer " + store.state.user.token
      }
      this.editor.customConfig.onchange = (html) => {
        let text = this.editor.txt.text()
        this.$emit('input', this.valueType === 'html' ? html : text)
        this.$emit('on-change', html, text)
      }
      this.editor.customConfig.onchangeTimeout = this.changeInterval
      // create这个方法一定要在所有配置项之后调用
      this.editor.create()
      // 如果本地有存储加载本地存储内容
      let html = this.value
      if (html) this.editor.txt.html(html)
    }
  }
</script>

<style>

</style>
