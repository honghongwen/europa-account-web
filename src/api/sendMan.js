import request from '@/utils/request'

export function addSendMan(data) {
  return request({
    url: '/sendMan/add',
    method: 'post',
    data
  })
}

export function editSendMan(data) {
  return request({
    url: '/sendMan/edit',
    method: 'post',
    data
  })
}


export function delSendMan(data) {
  return request({
    url: '/sendMan/del',
    method: 'post',
    data
  })
}


export function listSendMan(data) {
  return request({
    url: '/sendMan/list',
    method: 'post',
    data
  })
}
