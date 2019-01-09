<template>
  <div>
    <Card>
      <h4>{{this.project}}-{{this.month}} 总结</h4>
      <button class="ivu-btn ivu-btn-primary" @click="updateSummary">更新</button>
    </Card>
    <Card>
      <h4>设备运维</h4>
      <span>运维设备上方</span>
      <textarea v-model="assetsHead" cols="30" rows="2"></textarea>
      <span>运维设备下方</span>
      <textarea v-model="assetsTail" cols="30" rows="2"></textarea>
    </Card>
    <Card>
      <h4>报警概况</h4>
      <span>报警概况上方</span>
      <textarea v-model="alertCountHead" cols="30" rows="2"></textarea>
      <span>报警概况下方</span>
      <textarea v-model="alertCountTail" cols="30" rows="2"></textarea>
    </Card>
    <Card>
      <h4>应用分析及服务器性能分析</h4>
      <div>
        <span>CPU</span>
        <textarea v-model="cpu" cols="30" rows="2"></textarea>
        <span>内存</span>
        <textarea v-model="men" cols="30" rows="2"></textarea>
      </div>
      <div style="margin-top: 20px">
        <span>硬盘</span>
        <textarea v-model="disk" cols="30" rows="2"></textarea>
        <span>网络</span>
        <textarea v-model="net" cols="30" rows="2"></textarea>
      </div>
    </Card>
    <Card>
      <h4>数据库巡检</h4>
      <span>数据库巡检上方</span>
      <textarea v-model="dbinfoHead" cols="30" rows="2"></textarea>
      <span>数据库巡检下方</span>
      <textarea v-model="dbinfoTail" cols="30" rows="2"></textarea>
    </Card>
    <Card>
      <h4>本月问题汇总</h4>
      <span>报警汇总</span>
      <textarea v-model="alert" cols="30" rows="2"></textarea>
      <span>工单汇总</span>
      <textarea v-model="workorder" cols="30" rows="2"></textarea>
    </Card>
    <Card>
      <h4>总结</h4>
      <span>概述</span>
      <textarea v-model="overview" cols="30" rows="2"></textarea>
      <span>建议</span>
      <textarea v-model="advise" cols="30" rows="2"></textarea>
    </Card>
    <Card>
      <h4>数据库巡检内容</h4>
      <editor v-model="dbCheck" v-if="dbCheckFlag"/>
    </Card>
  </div>
</template>

<script>
  import { getSummaryData, updateSummaryData } from '@/api/data'
  import Editor from '_c/editor'
  export default {
    name: 'summary_write',
    components: {
      'editor': Editor
    },
    data () {
      return {
        project: '',
        month: '',
        assetsHead: '',
        assetsTail: '',
        alertCountHead: '',
        alertCountTail: '',
        cpu: '',
        men: '',
        disk: '',
        net: '',
        dbinfoHead: '',
        dbinfoTail: '',
        alert: '',
        workorder: '',
        overview: '',
        advise: '',
        dbCheck: '',
        dbCheckFlag: false
      }
    },
    methods: {
      updateSummary () {
        let data = {
          "assets_head": this.assetsHead,
          "assets_tail": this.assetsTail,
          "alert_count_head": this.alertCountHead,
          "alert_count_tail": this.alertCountTail,
          "cpu": this.cpu,
          "men": this.men,
          "disk": this.disk,
          "net": this.net,
          "dbinfo_head": this.dbinfoHead,
          "dbinfo_tail": this.dbinfoTail,
          "alert": this.alert,
          "workorder": this.workorder,
          "advise": this.advise,
          "month": this.month,
          "project": this.project,
          "db_check_content": this.dbCheck
        }
        updateSummaryData(data).then(res => {
          if (res.data.message === 'ok') {
            alert('更新成功');
          }
        })
      },
      handleChange (html, text) {
        console.log(html, text)
      }
    },
    mounted () {
      this.project = this.$route.query.project
      this.month = this.$route.query.month
      this.dbCheck = 'aabbdd'
      getSummaryData(this.project, this.month).then(res => {
        let summary = res.data.summary_data
        this.assetsHead = summary.assets_head
        this.assetsTail = summary.assets_tail
        this.alertCountHead = summary.alert_count_head
        this.alertCountTail = summary.alert_count_tail
        this.cpu = summary.cpu
        this.men = summary.men
        this.disk = summary.disk
        this.net = summary.net
        this.dbinfoHead = summary.dbinfo_head
        this.dbinfoTail = summary.dbinfo_tail
        this.alert = summary.alert
        this.workorder = summary.workorder
        this.overview = summary.overview
        this.advise = summary.advise
        this.dbCheck = summary.db_check_content
        this.dbCheckFlag = true
      })
    }


  }
</script>

<style lang="less">
  textarea {
    margin-bottom: -15px;
  }
</style>
