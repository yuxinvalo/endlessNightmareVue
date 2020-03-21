import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/api/v1/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/api/v1/get_user_info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/api/v1/logout',
    method: 'post'
  })
}

export function registryUser(data){
  return request({
    url: '/user/api/v1/create_user',
    method: 'post',
    data
  })
}

export function updateProfile(data){
  return request({
    url: '/user/api/v1/update_profile',
    method: 'post',
    data
  })
}

export function changePass(data){
  return request({
    url: '/user/api/v1/change_password',
    method: 'post',
    data
  })
}
