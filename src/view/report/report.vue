<template>
  <div>
    <div>
      <button id="preview-pdf" class="pdf ivu-btn-info" @click="downloadPDF('preview')">预览pdf</button>
      <button id="download-pdf" class="pdf ivu-btn-primary" @click="downloadPDF('download')">下载pdf</button>
    </div>
    <div id="content" class="col-md-12" ref="printContent" v-bind:style="{ background: printBackground}" style="width: 1245px;">
      <div class="head col-md-12 text-center item" style="margin-top: 20px;  text-align: center;">
        <h1>{{this.project}}项目</h1>
        <h1>{{year}}年{{this.moon}}月 运维报告</h1>
      </div>
      <div class="assets col-md-8 col-md-offset-2">
        <h2>1、运维设备列表</h2>
        <div id="assets_head" class="row item">{{this.assetsHead}}</div>
        <tables id="hosttable" class="text-center" ref="tables" v-model="hostData" :columns="hostColumns"/>
        <div id="assets_tail" class="row item">{{this.assetsTail}}</div>
      </div>
      <div class="alert-count col-md-8 col-md-offset-2">
        <h2>2、事件报警概况</h2>
        <div id="alert_count_head" class="row item">{{this.alertCountHead}}</div>
        <div class="row item">
          <div class="col-sm-5">
            <tables ref="tables" v-model="alertTableData" :columns="alertColumns"/>
          </div>
          <chart-bar style="height: 300px;" v-model="alertBarData" text="报警数量"/>
        </div>
        <div id="alert_count_tail" class="row item">{{this.alertCountTail}}</div>
      </div>
      <div class="utilization col-md-8 col-md-offset-2">
        <h2>3、应用分析及服务器性能分析</h2>
        <div class="row">
          <div class="item">
            <h5>3.1 CPU</h5>
            <div id="cpu">{{this.cpu}}</div>
          </div>
          <chart-line class="item" style="height: 300px;" id="cpu-chart" v-model="cpuData" :legends="cpuLegend" :label="cpuLabel" text="CPU使用量"/>
          <div class="item">
            <h5>3.2 内存</h5>
            <div id="men">{{this.men}}</div>
          </div>
          <chart-line class="item" style="height: 300px;" id="men-chart" v-model="menData" :legends="menLegend" :label="menLabel" text="内存使用量"/>
          <div class="item">
            <h5>3.3 硬盘</h5>
            <div id="disk">{{this.disk}}</div>
          </div>
          <chart-line class="item" style="height: 300px;" id="disk-chart" v-model="diskData" :legends="diskLegend" :label="diskLabel" text="硬盘使用量"/>
          <div class="item">
            <h5>3.4 网络</h5>
            <div id="net">{{this.net}}</div>
          </div>
          <chart-line class="item" style="height: 300px;" id="net-out-chart" v-model="netoutData" :legends="netoutLegend" :label="netoutLabel" text="流出宽带"/>
          <chart-line class="item" style="height: 300px;" id="net-in-chart" v-model="netinData" :legends="netinLegend" :label="netinLabel" text="流入宽带"/>
        </div>
      </div>
      <div class="dbinfo col-md-8 col-md-offset-2">
        <h2 class="item">4、数据库巡检报告</h2>
        <div class="item">
          <h5>4.1数据库巡检目标</h5>
          <div id="dbinfo_head">{{this.dbinfoHead}}</div>
        </div>
        <div>
          <h5 class="item">4.2 图表</h5>
          <div class="item">
            <h5>4.2.1 慢查询数量</h5>
            <chart-line style="height: 300px;" id="slow-queries-chart" v-model="slowQueriesData" :legends="slowQueriesLegend" :label="slowQueriesLabel" text="慢查询数"/>
          </div>
          <div class="item">
            <h5>4.2.2 连接数</h5>
            <chart-line style="height: 300px;" id="threads-connected-chart" v-model="connectLineData" :legends="connectLegend" :label="connectLabel" text="连接数"/>
          </div>
          <div class="item">
            <h5>4.2.3 tps</h5>
            <chart-line style="height: 300px;" id="tps-chart" v-model="tpsData" :legends="tpsLegend" :label="tpsLabel" text="tps"/>
          </div>
          <div class="item">
            <h5>4.2.4 qps</h5>
            <chart-line style="height: 300px;" id="qps-chart" v-model="qpsData" :legends="qpsLegend" :label="qpsLabel" text="qps"/>
          </div>
        </div>
        <div class="item">
          <h5>4.3数据库巡检内容</h5>
          <div id="db_check_content" v-html="this.dbCheck"></div>
        </div>
        <div class="summary col-md-8 col-md-offset-2">
          <h3 class="item">5、本月报告汇总</h3>
          <div class="row item">
            <h5>5.1 概述</h5>
            <div id="overview">{{this.overview}}</div>
          </div>
          <div class="row item">
            <h5>5.2 其他事项和建议</h5>
            <div id="advise">{{this.advise}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import html2canvas from "html2canvas"
  import jsPDF from 'jspdf'
  import $ from 'jquery'
  import Tables from '_c/tables'
  import { getSummaryData, getHostsData, getAlertsData, getUtilizationData, getDbInfoData } from '@/api/data'
  import { ChartBar, ChartLine } from '_c/charts'
  import { echartShowLoading } from '@/libs/util'
  export default {
    name: 'report',
    components: {
      Tables,
      ChartBar,
      ChartLine
    },
    data () {
      return {
        project: '',
        month: '',
        moon: '',
        year: '',
        printBackground: '',
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
        hostColumns: [
          {title: '服务器名称', key: 'name', sortable: true},
        ],
        hostData: [],
        alertColumns: [
          {title: '警报级别', key: 'severity', sortable: true},
          {title: '警报次数', key: 'count', sortable: true}
        ],
        alertTableData: [],
        alertBarData: {},
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
        let utilization_types = ['CPU', 'men', 'disk', 'net_in', 'net_out']
        let db_types = ['slow_queries', 'threads_connected', 'tps', 'qps']
        let project = data.project
        let month = data.month
        let vm = this
        utilization_types.forEach((type, index) => {
          setTimeout(function() {
            vm.getUtilization(project, month, type)
          }, 0)
        })
        db_types.forEach((type, index) => {
          this.getDbData(project, month, type)
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
            this.connectLabel = ''
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
      },
      // 调整页面
      adjustment_page() {
        let items = $('.item');
        let width = $('#content').width() + 35;
        console.log(width)
        // 一页的高度
        let page_height = width / 592.28 * 841.89;
        let page = 1;
        $.each(items, function(key, value){
          let item = $(value);
          // 元素到顶部的距离
          let item_top = item.offset().top - $(window).scrollTop();
          // 元素的高
          let item_height = item.height();
          let spacing = item_top - page_height;
          while (spacing > 0) {
            spacing -= page_height;
          }
          spacing = -spacing;
          if (item_height > spacing - 40 && item_height < page_height) {
            item.css('margin-top', spacing + 100);
            page ++;
          }
        });
      },
      toDataURL(src, callback, outputFormat) {
        let img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
          let canvas = document.createElement('CANVAS');
          let ctx = canvas.getContext('2d');
          let dataURL;
          canvas.height = this.naturalHeight;
          canvas.width = this.naturalWidth;
          ctx.drawImage(this, 0, 0);
          dataURL = canvas.toDataURL(outputFormat);
          callback(dataURL);
        };
        img.src = src;
        if (img.complete || img.complete === undefined) {
          img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          img.src = src;
        }
      },
      setImages() {
        let images = $('img')
        let vm = this
        $.each(images, function(key, image){
          image.crossOrigin = 'Anonymous'
          vm.toDataURL(
            image.src,
            function(dataUrl) {
              console.log('RESULT:', dataUrl)
            }
          )
        })
      },
      downloadPDF(button_type) {
        this.adjustment_page()
        let print_content = this.$refs.printContent
        this.background = '#FFFFFF'
        let filename = this.project + this.year + '年' + this.moon + '月' + '运维报告.pdf';
        html2canvas(print_content,{
          useCORS: true,
        }).then(
          function (canvas) {
            let contentWidth = canvas.width;
            let contentHeight = canvas.height;
            //一页pdf显示html页面生成的canvas高度;
            let pageHeight = contentWidth / 592.28 * 841.89;
            //未生成pdf的html页面高度
            let leftHeight = contentHeight;
            //页面偏移
            let position = 0;
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            let imgWidth = 595.28;
            let imgHeight = 592.28 / contentWidth * contentHeight;

            let pageData = canvas.toDataURL('image/jpeg', 1.0);

            let pdf = new jsPDF('', 'pt', 'a4');

            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
              pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
            } else {
              while (leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight;
                position -= 841.89;
                //避免添加空白页
                if (leftHeight > 0) {
                  pdf.addPage();
                }
              }
            }
            if (button_type === 'preview') {
              window.open(pdf.output('bloburl'), '_blank');
            } else {
              pdf.save(filename);
            }

          }
        )
      }
    },
    mounted () {
      this.project = this.$route.query.project
      this.month = this.$route.query.month
      this.year = this.month.split('-')[0]
      this.moon = this.month.split('-')[1]
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
      })
      getHostsData(this.project).then(res => {
        this.hostData = res.data.hosts
      })
      getAlertsData(this.project, this.month).then(res => {
        this.alertTableData = res.data.alert_count
        let bar_data = {}
        res.data.alert_count.forEach((item, index) => {
          bar_data[item.severity] = item.count
        })
        this.alertBarData = bar_data
      })
      this.changeChart({'project': this.project, 'month': this.month})
    }
  }
</script>

<style lang="less">
  body {
    overflow: auto;
  }
</style>
