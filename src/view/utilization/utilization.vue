<template>
  <div>
    <project-select-bar get_months :projects="projects" :months="months" @projectChange="changeChart"></project-select-bar>
    <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
      <Card shadow>
        <chart-line style="height: 300px;" id="cpu-chart" v-model="cpuData" hasDataZoom :legends="cpuLegend" :label="cpuLabel" text="CPU使用量"/>
      </Card>
      <Card shadow>
        <chart-line style="height: 300px;" id="men-chart" v-model="menData" hasDataZoom :legends="menLegend" :label="menLabel" text="内存使用量"/>
      </Card>
      <Card shadow>
        <chart-line style="height: 300px;" id="disk-chart" v-model="diskData" hasDataZoom :legends="diskLegend" :label="diskLabel" text="硬盘使用量"/>
      </Card>
      <Card shadow>
        <chart-line style="height: 300px;" id="net-out-chart" v-model="netoutData" hasDataZoom :legends="netoutLegend" :label="netoutLabel" text="流出宽带"/>
      </Card>
      <Card shadow>
        <chart-line style="height: 300px;" id="net-in-chart" v-model="netinData" hasDataZoom :legends="netinLegend" :label="netinLabel" text="流入宽带"/>
      </Card>
    </i-col>
  </div>
</template>
<script>
  import ProjectSelectBar from '_c/select-bar'
  import { ChartLine } from '_c/charts'
  import { getUtilizationIndexData, getUtilizationData } from '@/api/data'
  import { echartShowLoading } from '@/libs/util'
  export default {
    name: 'utilization_page',
    components: {
      ProjectSelectBar,
      ChartLine
    },
    data () {
      return {
        projects: [],
        months: [],
        cpuData: [],
        cpuLegend: [],
        cpuLabel: '',
        menData: [],
        menLegend: [],
        menLabel: '',
        diskData: [],
        diskLegend: [],
        diskLabel: '',
        netoutData: [],
        netoutLegend: [],
        netoutLabel: '',
        netinData: [],
        netinLegend: [],
        netinLabel: '',
      }
    },
    methods: {
      changeChart (data) {
        let types = ['CPU', 'men', 'disk', 'net_in', 'net_out']
        let doms = ['cpu-chart', 'men-chart', 'disk-chart', 'net-in-chart', 'net-out-chart']
        echartShowLoading(doms)
        let project = data.project
        let month = data.month
        let vm = this
        types.forEach((type, index) => {
          setTimeout(function() {
            vm.getUtilization(project, month, type)
          }, 0)
        })
      },
      getUtilization (project, month, type) {
        getUtilizationData(project, month, type).then(res => {
          let utilization = res.data.utilization
          let utilization_data = []
          let legend = []
          for(let hostname in utilization) {
            let data_row = {}
            data_row['name'] = hostname;
            data_row['type'] = 'line';
            data_row['data'] = utilization[hostname];
            data_row['symbol'] = 'none';
            utilization_data.push(data_row);
            legend.push(hostname)
          }
          if(type=='CPU'){
            this.cpuData = utilization_data
            this.cpuLegend = legend
            this.cpuLabel = ''
          }
          else if(type=='men'){
            this.menData = utilization_data
            this.menLegend = legend
            this.menLabel = ''
          }
          else if(type=='disk'){
            this.diskData = utilization_data
            this.diskLegend = legend
            this.diskLabel = ''
          }
          else if(type=='net_in'){
            this.netinData = utilization_data
            this.netinLegend = legend
            this.netinLabel = ''
          }
          else if (type=='net_out'){
            this.netoutData = utilization_data
            this.netoutLegend = legend
            this.netoutLabel = ''
          }
        })
      }
    },
    mounted () {
      getUtilizationIndexData({}).then(res => {
        this.projects = res.data.projects
        this.months = res.data.months
        this.changeChart({'project': '立维', 'month': this.months[0]})
      })
    }

  }
</script>
