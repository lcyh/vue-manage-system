import { login, getInfo } from '@/api/login'
import { Message } from 'element-ui'

let list = [
  {
      type: 'game',
      name: '游戏标签',
      list: [
          {
              id: 10,
              label: 'paymentFrequency',
              title: '付费频次'
          },
          {
              id: 11,
              label: 'paymentAmount',
              title: '付费金额'
          },
          {
              id: 12,
              label: 'gameLoginDays',
              title: '游戏登录天数'
          }
      ]
  },
  {
      type: 'platform',
      name: '平台标签',
      list: [
          {
              id: 20,
              label: 'payOrNot',
              title: '是否付费用户',
              name:'',
              region:'',
              area:['hubei','jiangsu']

          },
          {
              id: 21,
              label: 'paymentAmountGrouping',
              title: '付费金额分组'
          }
      ]
  },
  {
      type: 'user',
      name: '用户属性标签',
      list: [
          {
              id: 30,
              label: 'userDecision',
              title: '用户决策'
          },
          {
              id: 31,
              label: 'resultsControl',
              title: '结果可控'
          }
      ]
  }
];

const state = {
  introduce: ''
}
const mutations = {
  SET_ROLES(state, payload) {
    state.roles = payload
  },
  SET_NAME(state, payload) {
    state.userName = payload
  },
  SET_INTRODUCE(state, payload) {
    state.introduce = payload
  }
}
const actions = {
  _getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(res => {
          if (res.code === 0) {
            const { name, roles, introduce } = res.data
            commit('SET_ROLES', roles)
            commit('SET_NAME', name)
            commit('SET_INTRODUCE', introduce)
          } else {
            Message.error(res.msg)
          }
          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
export default {
  state,
  mutations,
  actions
}
