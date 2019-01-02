import {
    login,
    getUserInfo
} from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
        userName: '',
        userId: '',
        email: '',
        access: '',
        token: getToken()
    },
    mutations: {
        setUserId (state, id) {
            state.userId = id
        },
        setUserName (state, name) {
            state.userName = name
        },
        setAccess (state, access) {
            state.access = access
        },
        setEmail (state, email) {
            state.email = email
        },
        setToken (state, token) {
            state.token = token
            setToken(token)
        },
        setHasGetInfo (state, status) {
            state.hasGetInfo = status
        },
    },
    getters: {

    },
    actions: {
        // 登录
        handleLogin ({ commit }, {email, password}) {
            email = email.trim()
            return new Promise((resolve, reject) => {
                login({
                    email,
                    password
                }).then(res => {
                    const data = res.data
                    commit('setToken', data.token)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 获取用户相关信息
        getUserInfo ({ state, commit }) {
            return new Promise((resolve, reject) => {
                try {
                    getUserInfo(state.token).then(res => {
                    const data = res.data
                    commit('setUserName', data.name)
                    commit('setUserId', data.user_id)
                    commit('setEmail', data.email)
                    commit('setAccess', data.access)
                    commit('setHasGetInfo', true)
                    resolve(data)
                    }).catch(err => {
                    reject(err)
                    })
                } catch (error) {
                    reject(error)
                }
            })
        },
        // 退出登录
        handleLogOut ({ state, commit }) {
            return new Promise((resolve, reject) => {
              commit('setToken', '')
              commit('setAccess', [])
            })
        },
    }
}
