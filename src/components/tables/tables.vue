<template>
  <div>
    <div v-if="searchable && searchPlace === 'top'" class="search-con search-con-top">
      <Select v-model="searchKey" class="search-col">
        <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
      </Select>
      <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
      <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
    </div>
    <Table
      ref="tablesMain"
      :data="insideTableData"
      :columns="insideColumns"
      :stripe="stripe"
      :border="border"
      :width="width"
      :height="height"
      :loading="loading"
      :disabled-hover="disabledHover"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :size="size"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      @on-current-change="onCurrentChange"
    >

    </Table>
  </div>
</template>
<script>
  import './index.less'
  export default {
    name: 'Tables',
    props: {
      value: {
        type: Array,
        default () {
          return []
        }
      },
      columns: {
        type: Array,
        default () {
          return []
        }
      },
      size: String,
      width: {
        type: [Number, String]
      },
      height: {
        type: [Number, String]
      },
      stripe: {
        type: Boolean,
        default: false
      },
      border: {
        type: Boolean,
        default: false
      },
      highlightRow: {
        type: Boolean,
        default: false
      },
      rowClassName: {
        type: Function,
        default () {
          return ''
        }
      },
      context: {
        type: Object
      },
      noDataText: {
        type: String
      },
      noFilteredDataText: {
        type: String
      },
      disabledHover: {
        type: Boolean
      },
      loading: {
        type: Boolean,
        default: false
      },
      /**
       * @description 是否可搜索
       */
      searchable: {
        type: Boolean,
        default: false
      },
      /**
       * @description 搜索控件所在位置，'top' / 'bottom'
       */
      searchPlace: {
        type: String,
        default: 'top'
      }
    },
    data () {
      return {
        insideColumns: [],
        insideTableData: [],
        searchKey: '',
        searchValue: ''
      }
    },
    methods: {
      handleColumns (columns) {
        this.insideColumns = columns.map((item, index) => {
          let res = item
          return res
        })
      },
      handleTableData () {
        this.insideTableData = this.value.map((item, index) => {
          let res = item
          res.initRowIndex = index
          return res
        })
      },
      onCurrentChange (currentRow, oldCurrentRow) {
        this.$emit('on-current-change', currentRow, oldCurrentRow)
      },
      handleClear (e) {
        if (e.target.value === '') this.insideTableData = this.value
      },
      handleSearch () {
        this.insideTableData = this.value.filter(item => item[this.searchKey].indexOf(this.searchValue) > -1)
      },
    },
    watch: {
      columns (columns) {
        this.handleColumns(columns)
      },
      value (val) {
        this.handleTableData()
      }
    },
    mounted () {
      this.handleColumns(this.columns)
      this.handleTableData()
    }
  }
</script>
