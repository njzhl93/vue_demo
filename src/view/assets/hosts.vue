<template>
  <div>
    <project-select-bar :projects="projects" @projectChange="tableChange"></project-select-bar>
    <Card>
      <tables ref="tables" searchable search-place="top" v-model="tableData" :columns="columns"/>
    </Card>
  </div>
</template>
<script>
  import Tables from '_c/tables'
  import ProjectSelectBar from '_c/select-bar'
  import { getHostsIndexData, getHostsData } from '@/api/data'
  export default {
    name: 'hosts_page',
    components: {
      Tables,
      ProjectSelectBar
    },
    data () {
      return {
        columns: [
          {title: '服务器名称', key: 'name', sortable: true},
        ],
        tableData: [],
        projects: [],
      }
    },
    methods: {
      tableChange (data) {
        getHostsData(data.project).then(res => {
          this.tableData = res.data.hosts
        })
      }
    },
    mounted () {
      getHostsIndexData({}).then(res => {
        this.projects = res.data.projects
      })
      getHostsData('立维').then(res => {
        this.tableData = res.data.hosts
      })
    }

  }
</script>
