<template>
  <div>
    <project-select-bar get_months :projects="projects" :months="months" @projectChange="changeChart"></project-select-bar>
    <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
      <Card shadow>
        <chart-line style="height: 300px;" id="slow-queries-chart" v-model="slowQueriesData" hasDataZoom :legends="slowQueriesLegend" :label="slowQueriesLabel" text="慢查询数"/>
      </Card>
      <Card shadow>
        <chart-line style="height: 300px;" id="threads-connected-chart" v-model="connectLineData" hasDataZoom :legends="connectLegend" :label="connectLabel" text="连接数"/>
      </Card>
      <Card shadow>
        <chart-line style="height: 300px;" id="tps-chart" v-model="tpsData" hasDataZoom :legends="tpsLegend" :label="tpsLabel" text="tps"/>
      </Card>
      <Card shadow>
        <chart-line style="height: 300px;" id="qps-chart" v-model="qpsData" hasDataZoom :legends="qpsLegend" :label="qpsLabel" text="qps"/>
      </Card>
    </i-col>
  </div>
</template>
<script>
  import ProjectSelectBar from '_c/select-bar'
  import { ChartLine } from '_c/charts'
  import { getDbInfoIndexData, getDbInfoData } from '@/api/data'
  import { echartShowLoading } from '@/libs/util'
  export default {
    name: 'db_info_page',
    components: {
      ProjectSelectBar,
      ChartLine
    },
    data () {
      return {
        projects: [],
        months: [],
        slowQueriesData: [],
        slowQueriesLegend: [],
        slowQueriesLabel: '',
        connectLineData: [],
        connectLegend: [],
        connectLabel: '',
        tpsData: [],
        tpsLegend: [],
        tpsLabel: '',
        qpsData: [],
        qpsLegend: [],
        qpsLabel: ''
      }
    },
    methods: {
      changeChart (data) {
        let types = ['slow_queries', 'threads_connected', 'tps', 'qps']
        let doms = ['slow-queries-chart', 'threads-connected-chart', 'tps-chart', 'qps-chart']
        echartShowLoading(doms)
        let project = data.project
        let month = data.month
        types.forEach((type, index) => {
          this.getDbData(project, month, type)
        })
      },
      getDbData (project, month, type) {
        getDbInfoData(project, month, type).then(res => {
          let dbinfo = res.data.dbinfo
          let db_data = []
          let legend = []
          for(let hostname in dbinfo) {
            let data_row = {}
            data_row['name'] = hostname;
            data_row['type'] = 'line';
            data_row['data'] = dbinfo[hostname];
            data_row['symbol'] = 'none';
            db_data.push(data_row);
            legend.push(hostname)
          }
          if(type=='slow_queries'){
            this.slowQueriesData = db_data
            this.slowQueriesLegend = legend
            this.slowQueriesLabel = ''
          }
          else if(type=='threads_connected'){
            this.connectLineData = db_data
            this.connectLegend = legend
            this.connectLabel = '个'
          }
          else if(type=='tps'){
            this.tpsData = db_data
            this.tpsLegend = legend
            this.tpsLabel = ''
          }
          else if(type=='qps'){
            this.qpsData = db_data
            this.qpsLegend = legend
            this.qpsLabel = ''
          }
        })
      }
    },
    mounted () {
      getDbInfoIndexData({}).then(res => {
        this.projects = res.data.projects
        this.months = res.data.months
        this.changeChart({'project': '立维', 'month': this.months[0]})
      })
    }

  }
</script>
