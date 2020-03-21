import request from '@/utils/request'

export function getClassification() {
  return request({
    url: '/classification/api/v1/get_classification',
    method: 'get'
  })
}


export function updateClassification(data) {
  return request({
    url: '/classification/api/v1/update_classification',
    method: 'post',
    data
  })
}
