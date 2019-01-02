<template>
  <div>
    <project-select-bar get_months :projects="projects" :months="months" @projectChange="tableChange"></project-select-bar>
    <Card>
      <tables ref="tables" searchable search-place="top" v-model="tableData" :columns="columns"/>
    </Card>
  </div>
</template>

<script>
  import Tables from '_c/tables'
  import ProjectSelectBar from '_c/select-bar'
  import { getWorkOrdersIndexData, getWorkOrdersData } from '@/api/data'
  export default {
    name: 'work_orders_page',
    components: {
      Tables,
      ProjectSelectBar
    },
    data () {
      return {
        columns: [
          {title: '工单类型', key: 'event_type', sortable: true},
          {title: '标题', key: 'title', sortable: true},
          {title: '难度', key: 'difficulty', sortable: true},
          {title: '完成时间', key: 'spend_hours', sortable: true},
        ],
        tableData: [],
        projects: [],
        months: [],
      }
    },
    methods: {
      tableChange (data) {
        getWorkOrdersData(data.project, data.month).then(res => {
          this.tableData = res.data.work_orders_list
        })
      }
    },
    mounted () {
      getWorkOrdersIndexData({}).then(res => {
        this.projects = res.data.projects
        this.months = res.data.months
        getWorkOrdersData('立维', this.months[0]).then(res => {
          this.tableData = res.data.work_orders_list
        })
      })
    }

  }
</script>
