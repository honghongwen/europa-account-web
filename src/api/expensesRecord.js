import request from '@/utils/request'

export function addRecord(data) {
  return request({
    url: '/expenses/add',
    method: 'post',
    data
  })
}

export function editRecord(data) {
  return request({
    url: '/expenses/edit',
    method: 'post',
    data
  })
}


export function delRecord(data) {
  return request({
    url: '/expenses/del',
    method: 'post',
    data
  })
}


export function listRecord(data) {
  return request({
    url: '/expenses/list',
    method: 'post',
    data
  })
}
