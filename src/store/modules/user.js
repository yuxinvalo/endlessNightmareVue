import { login, logout, getInfo, registryUser} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_PERSON: (state, person16) => {
    state.person16 = person16
  },
  SET_AGE: (state, age) => {
    state.age = age
  },
  SET_DREAM: (state, dream) => {
    state.dream = dream
  },
  SET_SEX: (state, sex) => {
    state.sex = sex
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, secret } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), secret: secret }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        console.log("get user info: ")
        console.log(response)
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        commit('SET_NAME', data['username'])
        commit('SET_AVATAR', data['avatar'])
        commit('SET_ROLE', data['role'])
        commit('SET_EMAIL', data['email'])
        commit('SET_PERSON', data['person16'])
        commit('SET_DREAM', data['dream'])
        commit('SET_AGE', data['age'])
        commit('SET_SEX', data['sex'])

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // registryUser({ commit }, newUserInfo) {
  //   return new Promise((resolve, reject) => {
  //     console.log(newUserInfo)
  //     const { email, username, secret } = newUserInfo
  //     registryUser({ email:email.trim(), username: username.trim(), secret: secret }).then(response => {
  //       const { data } = response
  //       console.log(response)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //
  //   })
  // },
  
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
