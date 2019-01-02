<template>
  <div ref="dom" class="charts chart-line"></div>
</template>
<script>
  import echarts from 'echarts'
  import tdTheme from './theme.json'
  import { on, off } from '@/libs/tools'
  echarts.registerTheme('tdTheme', tdTheme)
  export default {
    name: 'ChartLine',
    props: {
      value: Array,
      legend: Array,
      text: String,
      subtext: String,
      label: String,
    },
    data () {
      return {
        dom: null
      }
    },
    methods: {
      resize () {
        this.dom.resize()
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        this.dom.showLoading()
        on(window, 'resize', this.resize)
      })
    },
    watch: {
      value (val) {
        this.dom.setOption({
          title: {
            text: this.text
          },
          tooltip: {},
          grid: {
            right: '25%'
          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 1
            },
            {
              type: 'slider',
              show: true,
              yAxisIndex: [0],
              right: '21%',
              start: 0
            },
            {
              type: 'inside',
              xAxisIndex: [0],
              start: 1
            },
            {
              type: 'inside',
              yAxisIndex: [0],
              start: 0,
            }
          ],
          xAxis: {
            type: 'time'
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} ' + this.label
            }
          },
          legend: {
            data: this.legend,
            type: 'scroll',
            orient: 'vertical',
            left: 'right',
            top: 20,
            bottom: 20
          },
          series: this.value
        }, true)
        this.dom.hideLoading()
      }
    },
    beforeDestroy () {
      off(window, 'resize', this.resize)
    }
  }
</script>
