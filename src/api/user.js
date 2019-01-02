import axios from '@/libs/api.request'

export const login = ({ email, password }) => {
    return axios.request({
        url: 'login',
        method: 'post',
        auth:{
            username: email,
            password: password
        }
    })
}

export const getUserInfo = (token) => {
    return axios.request({
      url: 'get_user_info',
      method: 'get'
    })
  }