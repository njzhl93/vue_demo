<template>
  <div>
    <project-select-bar get_months :projects="projects" :months="months" @projectChange="tableChange"></project-select-bar>
    <Card>
      <tables ref="tables" search-place="top" v-model="tableData" :columns="columns"/>
    </Card>
    <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
      <Card shadow>
        <chart-bar style="height: 300px;" v-model="barData" text="报警数量"/>
      </Card>
    </i-col>
  </div>
</template>

<script>
  import Tables from '_c/tables'
  import ProjectSelectBar from '_c/select-bar'
  import { ChartBar } from '_c/charts'
  import { getAlertsIndexData, getAlertsData } from '@/api/data'
  export default {
    name: 'alerts_page',
    components: {
      Tables,
      ProjectSelectBar,
      ChartBar
    },
    data () {
      return {
        columns: [
          {title: '警报级别', key: 'severity', sortable: true},
          {title: '警报次数', key: 'count', sortable: true}
        ],
        tableData: [],
        projects: [],
        months: [],
        barData: {}
      }
    },
    methods: {
      tableChange (data) {
        getAlertsData(data.project, data.month).then(res => {
          this.tableData = res.data.alert_count
          this.changeChart(res.data.alert_count)
        })
      },
      changeChart (data) {
        let bar_data = {}
        data.forEach((item, index) => {
          bar_data[item.severity] = item.count
        })
        this.barData = bar_data
      }
    },
    mounted () {
      getAlertsIndexData({}).then(res => {
        this.projects = res.data.projects
        this.months = res.data.months
        getAlertsData('立维', this.months[0]).then(res => {
          this.tableData = res.data.alert_count
          this.changeChart(res.data.alert_count)
        })
      })
    }

  }
</script>
