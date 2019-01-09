import axios from '@/libs/api.request'

export const getHostsIndexData = () => {
  return axios.request({
    url: '/v1/hosts_index',
    method: 'get'
  })
}

export const getHostsData = project => {
  return axios.request({
    url: '/v1/get_hosts',
    params: {'project': project},
    method: 'get'
  })
}

export const getWorkOrdersIndexData = () => {
  return axios.request({
    url: '/v1/work_orders_index',
    method: 'get'
  })
}

export const getWorkOrdersData = (project, month) => {
  return axios.request({
    url: '/v1/get_work_orders',
    params: {'project': project, 'month': month},
    method: 'get'
  })
}

export const getAlertsIndexData = () => {
  return axios.request({
    url: '/v1/alerts_index',
    method: 'get'
  })
}

export const getAlertsData = (project, month) => {
  return axios.request({
    url: '/v1/get_alerts',
    params: {'project': project, 'month': month},
    method: 'get'
  })
}

export const getDbInfoIndexData = () => {
  return axios.request({
    url: '/v1/db_info_index',
    method: 'get'
  })
}

export const getDbInfoData = (project, month, type) => {
  return axios.request({
    url: '/v1/get_db_info',
    params: {'project': project, 'month': month, 'type': type},
    method: 'get'
  })
}

export const getUtilizationIndexData = () => {
  return axios.request({
    url: '/v1/utilization_index',
    method: 'get'
  })
}

export const getUtilizationData = (project, month, type) => {
  return axios.request({
    url: '/v1/get_utilization',
    params: {'project': project, 'month': month, 'type': type},
    method: 'get'
  })
}

export const getSummaryIndexData = () => {
  return axios.request({
    url: '/v1/summary_index',
    method: 'get'
  })
}

export const getSummaryData = (project, month) => {
  return axios.request({
    url: '/v1/get_summary',
    params: {'project': project, 'month': month},
    method: 'get'
  })
}

export const updateSummaryData = data => {
  return axios.request({
    url: '/v1/update_summary',
    data: data,
    method: 'post'
  })
}
