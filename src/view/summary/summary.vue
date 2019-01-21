<template>
  <div>
    <Card>
      <project-select-bar style="display:inline;" get_months :projects="projects" :months="months" @projectChange="changeProject"></project-select-bar>
      <router-link class="ivu-btn ivu-btn-info" :to="{ path:'/report', query: {project: this.project, month: this.month} }" target="_blank">查看月报</router-link>
      <router-link class="ivu-btn ivu-btn-primary" :to="{ path:'/summary_write', query: {project: this.project, month: this.month} }">填写总结信息</router-link>
    </Card>
  </div>
</template>

<script>
  import ProjectSelectBar from '_c/select-bar'
  import { getSummaryIndexData } from '@/api/data'
  export default {
    name: 'summary_page',
    components: {
      ProjectSelectBar
    },
    data () {
      return {
        projects: [],
        months: [],
        project: '',
        month: '',
      }
    },
    methods: {
      changeProject (data) {
        this.project = data.project
        this.month = data.month
      }
    },

    mounted () {
      getSummaryIndexData({}).then(res => {
        this.projects = res.data.projects
        this.months = res.data.months
        this.project = '立维'
        this.month = this.months[0]
      })
    }


  }
</script>
