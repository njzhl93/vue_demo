<template>
  <div>
    <div class="select-item">
      <span>项目</span>
      <Select v-model="selectedProject" class="project-search-col search-col" @on-change="changeProject">
        <Option v-for="(project, index) in projects" :value="project" :key="index">{{ project }}</Option>
      </Select>
    </div>
    <div v-if="get_months" class="select-item">
      <span>月份</span>
      <Select v-model="selectedMonth" class="month-search-col search-col" @on-change="changeProject">
        <Option v-for="(month, index) in months" :value="month" :key="index">{{ month }}</Option>
      </Select>
    </div>
  </div>
</template>

<script>
  import './project-select-bar.less'
  export default {
    name: 'ProjectSelectBar',
    props: {
      projects: {
        type: Array,
        default () {
          return []
        }
      },
      months: {
        type: Array,
        default () {
          return []
        }
      },
      get_months: {
        type: Boolean,
        default: false
      },
    },
    data () {
      return {
        selectedProject: '',
        selectedMonth: ''
      }
    },
    methods: {
      changeProject () {
        this.$emit('projectChange', {'project': this.selectedProject, 'month': this.selectedMonth})
      }
    },
    watch: {
      months () {
        this.selectedMonth = this.months[0]
      }
    },
    mounted () {
      this.selectedProject = '立维'
    },
  }
</script>
