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
